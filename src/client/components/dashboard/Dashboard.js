import React, { Component } from "react";
import BundlesChart from "./BundlesChart";
import {ResponsiveContainer} from "recharts";
import { Card } from "dfs-components";

const Dashboard = props => {
  const { uniqueStringGen } = props;

  return (
    <div className="grid">
      <Card>
        <BundlesChart
          assets={props.assets}
          uniqueStringGen={uniqueStringGen}
        />
      </Card>
    </div>
  );
}

export default Dashboard;
