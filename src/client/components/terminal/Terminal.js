import React from "react";
import { Card } from "dfs-components";

const Terminal = ({logs, uniqueStringGen, className}) => {
  return (
    <Card className={className}>
      {
        logs.map(log => 
          <div key={uniqueStringGen()}>
            <div>{`Hash: ${log.hash}`}</div>
            <div>{`Webpack version: ${log.webpackVersion}`}</div>
            <div>{`Note: ${log.note}`}</div>
          </div>)
      }
    </Card>
  );
}

export default Terminal;
