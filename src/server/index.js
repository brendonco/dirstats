const webpack = require("webpack");
const authors = require("parse-authors");
const importFrom = require("import-from"); // used to get the users project details form their working dir
const reporter = require("./utils"); // webpack stats formatters & helpers
const server = require("./server"); // client server
const fs = require("fs");

class Dirstats {
  constructor(opts = {}) {
    const currentWorkingDirectory = process.cwd();
    const PORT = 1338;
    opts.host = opts.host || "localhost";
    opts.port = parseInt(opts.port || PORT, 10);
    opts.keepAlive = !!opts.keepAlive;
    opts.packageJsonPath = opts.packageJsonPath || currentWorkingDirectory;
    opts.watchOnly = opts.watchOnly !== false;

    if (opts.port && isNaN(opts.port)) {
      console.error(
        `[DIRSTATS] error: the specified port (${
          opts.port
        }) is invalid. Reverting to ${PORT}`
      );
      opts.port = PORT;
    }

    if (opts.packageJsonPath && !fs.existsSync(opts.packageJsonPath)) {
      console.warn(
        `[DIRSTATS] warning: the specified path (${
          opts.packageJsonPath
        }) does not exist. Falling back to ${currentWorkingDirectory}`
      ); //Fallback to cwd and warn
      opts.packageJsonPath = currentWorkingDirectory;
    }

    this.options = opts;

    let dirstatsEnv = "production";
    if (process.env.DIRSTATS_ENV && process.env.DIRSTATS_ENV === "development") {
      dirstatsEnv = "development";
    }
    this.env = {
      dirstatsEnv: dirstatsEnv,
      clientEnv: "development",
      running: false, // indicator if our express server + sockets are running
      watching: false
    };

    this.reports = {
      stats: {},
      progress: {},
      project: {}
    };

    this.pkg = importFrom(this.options.packageJsonPath, "./package.json");
  }
  apply(compiler) {
    const { name, version, author: makers } = this.pkg;
    const normalizedAuthor = parseAuthor(makers);

    this.reports.project = { name, version, makers: normalizedAuthor };

    // check if the current build is production, via defined plugin
    const definePlugin = compiler.options.plugins.find(
      fn => fn.constructor.name === "DefinePlugin"
    );

    if (definePlugin) {
      const pluginNodeEnv = definePlugin["definitions"]["process.env.NODE_ENV"];
      if (pluginNodeEnv === "production") {
        this.env.clientEnv === "production";
      }
    }

    let dirstats;
    let dirstatsBooting;
    let { port, host } = this.options;

    const bootDirstats = () => {
      if (dirstats || dirstatsBooting) return;

      dirstatsBooting = true;
      dirstats = this.server = server.init(
        compiler,
        this.env.dirstatsEnv === "development"
      );
      dirstats.http.listen(port, host, _ => {
        console.log(`[DIRSTATS] Starting dashboard on: http://${host}:${port}`);
        this.env.running = true;
        dirstatsBooting = false;
        // if a new client is connected push current bundle info
        dirstats.io.on("connection", socket => {
          socket.emit("project", this.reports.project);
          socket.emit("progress", this.reports.progress);
          socket.emit("stats", this.reports.stats);
        });
      });
    };

    if (!this.options.watchOnly && !this.env.running) {
      bootDirstats();
    }

    compiler.plugin("watch-run", (c, done) => {
      if (this.options.watchOnly) {
        bootDirstats();
      }
      this.env.watching = true;
      done();
    });

    compiler.plugin("run", (c, done) => {
      this.env.watching = false;
      done();
    });

    // report the webpack compiler progress
    compiler.apply(
      new webpack.ProgressPlugin((percentage, message) => {
        this.reports.progress = { percentage, message };
        if (this.env.running) {
          dirstats.io.emit("progress", { percentage, message });
        }
      })
    );

    // extract the final reports from the stats!
    compiler.plugin("done", stats => {
      if (!this.env.running) return;

      const jsonStats = stats.toJson({ chunkModules: true });
      jsonStats.isDev = this.env.clientEnv === "development";
      this.reports.stats = reporter.statsReporter(jsonStats);
      dirstats.io.emit("stats", this.reports.stats);
    });
  }
}

function parseAuthor(author) {
  if (author && author.name) return author;

  if (typeof author === "string") {
    const authorsArray = authors(author);
    if (authorsArray.length > 0) {
      return authorsArray[0];
    }
  }

  return { name: "", email: "", url: "" };
}

module.exports = Dirstats;
