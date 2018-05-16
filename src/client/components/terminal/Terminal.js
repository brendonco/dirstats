import React from "react";
import { Card } from "dfs-components";

const Terminal = ({ logs, uniqueStringGen, className }) => {
  return (
    <Card className={className}>
      {logs.map(log => (
        <div key={uniqueStringGen()} className="terminal-logs">
          <p>{`Hash: ${log.hash}`}</p>
          <p>{`Webpack version: ${log.webpackVersion}`}</p>
          <br />
          <p>{`Note: ${log.note}`}</p>
          <br />
          <p className="terminal-logs__footer--success">{log.successFooter}</p>
        </div>
      ))}
    </Card>
  );
};

export default Terminal;
