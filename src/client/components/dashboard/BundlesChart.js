import React from "react";
import { DFSTable, utils } from "./common";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const BundlesChart = ({ assets: data, uniqueStringGen }) => {
  const headers = ["File", "Size"];
  const rows = data.map(file => [file.name, utils.readableBytes(file.size)]);
  const chartData = data.map(file => ({ name: file.name, size: file.size }));
  // const tickData = data.map(file => ({}))

  return [
    <DFSTable
      headers={headers}
      rows={rows}
      uniqueStringGen={uniqueStringGen}
      key={uniqueStringGen()}
    />,
    <LineChart
      key={uniqueStringGen()}
      width={600}
      height={300}
      data={chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis tickFormatter={tick => utils.readableBytes(tick)} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip
        formatter={(value, name) =>
          name === "size" ? utils.readableBytes(value) : value
        }
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="name"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="size" stroke="#82ca9d" />
    </LineChart>
  ];
};

export default BundlesChart;
