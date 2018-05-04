import React from "react";
import { DFSTable } from "./common";

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

const BundlesChart = ({assets: data, uniqueStringGen}) => {
  const headers = ["File", "Size"];
  const rows = data.map(file => [file.name, file.size]);

  return (
    <DFSTable
      headers={headers}
      rows={rows}
      colors={COLORS}
      uniqueStringGen={uniqueStringGen}
    />
  );
}

export default BundlesChart;
