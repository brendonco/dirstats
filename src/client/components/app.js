import React, { Component } from "react";
import io from "socket.io-client";
import Dashboard from "./dashboard";
import Terminal from "./terminal";
import Project from "./project";
import { getRandomString } from "dfs-utils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      assetsSize: 0,
      progress: {},
      time: 0,
      assets: [],
      errors: [],
      warnings: [],
      modules: {
        cjs: [],
        esm: [],
        mixed: []
      },
      logs: [],
      performance: {},
      project: {},
      getRandomString,
    };

    const _params = new URLSearchParams(window.location.search);
    const port = _params.get("force_socket_port") || document.location.port;

    this.socket = io(document.location.hostname + ":" + port);
  }

  componentDidMount() {
    this.socket.on("project", report => {
      this.setState({ project: report });
    });
    
    this.socket.on("stats", report => {
      let logs = [];
      if (report.errors && report.errors.length > 0) {
        logs = report.errors;
      }
      if (report.warnings && report.warnings.length > 0) {
        logs = report.warnings;
      }
      if (report.success && report.success.length > 0) {
        logs = report.success;
      }
      this.setState({
        assets: report.assets || [],
        errors: report.errors || [],
        warnings: report.warnings || [],
        success: report.success || [],
        time: report.time / 1e3 || 0,
        modules: report.modules || [],
        performance: report.performance || {},
        assetsSize: report.assetsSize || "NaN",
        logs: logs
      });
    });
    
    this.socket.on("progress", data => {
      this.setState({ progress: data });
      if (data.message.toLowerCase() !== "idle") {
        this.setState({
          progress: data,
          logs: [
            `<p>${data.message}</p>`,
            `<p>${(data.percentage * 100).toFixed(2)}%</p>`
          ]
        });
      }
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { logs, project, assets } = this.state;

    return (
      <div>
        <div className="grid">
          <Project className="grid__column grid__column--one-half" project={project} uniqueStringGen={getRandomString} />
          <Terminal className="grid__column grid__column--one-half" logs={logs} uniqueStringGen={getRandomString} />
        </div>
        <Dashboard
          assets={assets}
          uniqueStringGen={getRandomString}
        />
      </div>
    );
  }
}

export default App;