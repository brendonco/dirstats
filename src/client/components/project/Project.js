import React, { Component } from "react";
import { Card } from "dfs-components";

const Project = props => {
  const {
    className,
    project: {
      makers = {},
      name,
      version
    } = {}
  } = props;

  return (
    <Card className={className}>
      <div>Project: {name}</div>
      <div>version: {version}</div>
      <div>Name: {makers.name}</div>
      <div>Email: {makers.email}</div>
      <div>Url: {makers.url}</div>
    </Card>
  );
}

export default Project;
