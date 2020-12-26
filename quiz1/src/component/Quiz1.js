import React, { useState, useEffect } from 'react';
import { Container, Form, Dropdown, DropdownButton } from 'react-bootstrap';

const Quiz1 = () => {
  const [number, setNumber] = useState();
  const [ddType, setDdType] = useState("isPrime");
  const [result, setResult] = useState("fill in number and press enter");

  useEffect(() => {
    if (number !== undefined) {
      var checkResult = calculate();
      setResult(checkResult)
    }
    else {
      setResult("fill in number and press enter");
    }
  }, [number, ddType, result])

  const submitSigninForm = (event) => {
    event.preventDefault();
    var num = event.target.elements.formNumber.value;

    //check empty input
    if (num === "") {
      setNumber(undefined);
    }
    else {
      num = Number(num);
      const checkSign = Math.sign(num);
      if (checkSign === -1) //negative 
        num = 1;
      else
        num = Math.round(num, checkSign);

      event.target.elements.formNumber.value = num;
      setNumber(num)
    }
  }

  const handleChangeMenu = (k) => {
    setDdType(k);
  }

  const calculate = () => {
    var checkResult;
    if (ddType === 'isPrime')
      checkResult = isPrime(number);
    else if (ddType === 'isFibanacci')
      checkResult = isFibanacci(number);

    return checkResult.toString();
  }

  const isPrime = (num) => {
    var result = true;
    if (num === 1 || num === 0)
      return result = false;

    for (var i = 2; i <= num - 1; i++) {
      if (num % i === 0) {
        result = false;
        break;
      }
    }
    return result;
  }

  const isFibanacci = (num) => {
    var result = false;
    const num1 = 5 * num * num + 4;
    const num2 = 5 * num * num - 4;
    const isSquare1 = isSquare(num1);
    const isSquare2 = isSquare(num2);

    if (isSquare1 || isSquare2)
      result = true

    return result
  }

  const isSquare = (num) => {
    const _isSquare = num > 0 && Math.sqrt(num) % 1 === 0;
    return _isSquare;
  }

  return (
    <>
      <Container fluid>
        <div className="scrolling-wrapper row flex-row flex-nowrap">
          <div>
            <div className="height fixed-col1 p-1">
              <Form onSubmit={(e) => submitSigninForm(e)} >
                <Form.Group controlId="formNumber">
                  <Form.Control size="sm" type="number" step="any" placeholder="number" />
                </Form.Group>
              </Form>
            </div>
          </div>

          <div className="height col p-1 expand-col2" style={{ minWidth: "100px" }}>
            <DropdownButton variant="light"
              size="sm"
              className="p-0"
              title={ddType}
              onSelect={(k) => handleChangeMenu(k)} >
              <Dropdown.Item eventKey="isPrime">isPrime</Dropdown.Item>
              <Dropdown.Item eventKey="isFibanacci">isFibanacci</Dropdown.Item>
            </DropdownButton>
          </div>

          <div>
            <div className="height fixed-col3 p-2">
              <p>{result}</p>
            </div>
          </div>
        </div>
      </Container>
      <div className="p-4">
        <h4>Note:</h4>
        <span>Press Enter after change number</span>
      </div>

    </>
  )
}

export default Quiz1
