import React, { useState } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import "./style.css";

export const ExpressionEngineUI = ({ newData }) => {
  const [connectorType, setConnectorType] = useState("and");
  const [res, setRes] = useState({});
  const [expressions, setExpressions] = useState([
    {
      output: {
        key: "age",
        value: 60,
        operator: ">=",
        score: 50,
      },
    },
  ]);

  const handleConnectorTypeChange = (e) => {
    setConnectorType(e.target.value);
  };

  const handleExpressionChange = (index, field, value) => {
    setExpressions((prevExpressions) => {
      const updatedExpressions = [...prevExpressions];
      updatedExpressions[index] = {
        ...updatedExpressions[index],
        output: {
          ...updatedExpressions[index].output,
          [field]: value,
        },
      };
      return updatedExpressions;
    });
  };

  const handleAddExpression = () => {
    setExpressions((prevExpressions) => [
      ...prevExpressions,
      { output: { key: "age", value: 0, operator: ">=", score: 0 } },
    ]);
  };

  const handleDeleteExpression = (index) => {
    setExpressions((prevExpressions) => {
      const updatedExpressions = [...prevExpressions];
      updatedExpressions.splice(index, 1);
      return updatedExpressions;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const datas = expressions.map((el) => {
      const asArray = Object.entries(el.output);
      const filtered = asArray.filter(([key, value]) => key !== "key");
      const justStrings = Object.fromEntries(filtered);
      const info = {
        key: el.output.key,
        output: justStrings,
      };
      return info;
    });

    const data = {
      rules: datas.map(({ key, output }) => ({ key, output })),
      combinator: connectorType,
    };
    console.log(data);
    setRes(data);
    newData(data);
    // You can send the 'data' to the server or perform further actions here
  };

  return (
    <Container id="add" className="mt-5 w-[50%]">
      <h1 className="text-center">Expression Engine UI</h1>
      <Form>
        <Form.Group controlId="connectorType">
          <Form.Label>Connector Type</Form.Label>
          <Form.Control
            as="select"
            value={connectorType}
            onChange={handleConnectorTypeChange}
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </Form.Control>
        </Form.Group>
        {expressions.map((expression, index) => (
          <div className="mt-2" key={index}>
            <Form.Group controlId={`ruleType-${index}`}>
              <Form.Label>Rule Type</Form.Label>
              <Form.Control
                as="select"
                value={expression.output.key}
                onChange={(e) =>
                  handleExpressionChange(index, "key", e.target.value)
                }
              >
                <option value="age">Age</option>
                <option value="credit_score">Credit Score</option>
                <option value="account_balance">Account Balance</option>
              </Form.Control>
            </Form.Group>
            <Col>
              <Form.Group controlId={`value-${index}`}>
                <Form.Label>Value</Form.Label>
                <Form.Control
                  value={expression.output.value}
                  onChange={(e) =>
                    handleExpressionChange(
                      index,
                      "value",
                      Number(e.target.value)
                    )
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`operator-${index}`}>
                <Form.Label>Operator</Form.Label>
                <Form.Control
                  as="select"
                  value={expression.output.operator}
                  onChange={(e) =>
                    handleExpressionChange(index, "operator", e.target.value)
                  }
                >
                  <option value=">">{">"}</option>
                  <option value="<">{"<"}</option>
                  <option value=">=">{">="}</option>
                  <option value="<=">{"<="}</option>
                  <option value="=">{"="}</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId={`score-${index}`}>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  value={expression.output.score}
                  onChange={(e) =>
                    handleExpressionChange(
                      index,
                      "score",
                      Number(e.target.value)
                    )
                  }
                />
              </Form.Group>
            </Col>

            <Button
              className="mt-2 btn"
              variant="danger"
              onClick={() => handleDeleteExpression(index)}
            >
              Delete Expression
            </Button>
          </div>
        ))}
        <Button
          variant="primary"
          className="mt-1 btn"
          onClick={handleAddExpression}
        >
          Add Expression
        </Button>
        <Button variant="success" className="m-5 btn" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};
