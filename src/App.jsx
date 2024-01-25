import { useState } from "react";
import { Nav, ExpressionEngineUI, Result } from "./components";

const App = () => {
  const [result, setResult] = useState({
    rules: [{}],
    combinator: "",
  });

  const newData = (data) => {
    setResult(data);
  };
  // console.log(result);

  return (
    <>
      <Nav />
      <ExpressionEngineUI newData={newData} />
      {result.combinator === "" ? (
        <div className="text-center" id="result">
          Enter Values to see the JSON
        </div>
      ) : (
        <Result Result={result} />
      )}
    </>
  );
};

export default App;
