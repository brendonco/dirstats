import React from "react";

const DFSTable = ({
  headers = [],
  rows = [],
  uniqueStringGen,
}) => {
  const headRows = headers.map(head => <th key={uniqueStringGen()}>{head}</th>);
  const bodyRows = rows.map(row =>
    <tr key={uniqueStringGen()}>
      {
        row.map(col => <td key={uniqueStringGen()}>{col}</td>)
      }
    </tr>);

  return (
    <table className="dfs-data-table">
      <thead>
        <tr>{headRows}</tr>
      </thead>
      <tbody>{bodyRows}</tbody>
    </table>);
}

export default DFSTable;
