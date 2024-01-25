import React from "react";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
export const Result = ({ Result }) => {
  return (
    <div id="result" className="m-5">
      <h1 className="text-center my-3">JSON Output:</h1>
      <JsonView
        data={Result}
        shouldExpandNode={allExpanded}
        style={darkStyles}
      />
    </div>
  );
};
