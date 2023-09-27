import React, { useCallback, useEffect, useState } from "react";
import CalculatorKey from "../components/CalculatorKey";
import toast from "react-hot-toast";
import NavigationButton from "../components/NavigationButton";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [total, setTotal] = useState();

  const updateExpression = useCallback((value) => {
    setExpression((expression) => `${expression}${value}`);
  }, []);

  const clearExpression = useCallback(() => {
    setExpression("");
    setTotal();
  }, []);

  const calculate = useCallback(() => {
    try {
      const answer = eval(expression);
      setTotal(answer);
    } catch (error) {
      toast.error(error?.message || "Calculation error!");
    }
  }, [expression]);

  return (
    <div className="m-auto flex flex-col w-full items-center gap-y-5">
      <div className="overflow-hidden shadow-lg bg-purple-900 shadow-lg border rounded-lg lg:w-2/6 md:w-3/6 sm:w-4/6 h-min">
        <div>
          <div className="p-5 text-white text-center text-3xl bg-purple-900">
            <span className="text-orange-500">Calculator</span>
          </div>
          <div className="pt-16 p-5 pb-0 text-white text-right text-3xl bg-purple-800">
            {expression || "Select something!"}
          </div>
          <div className="p-5 text-white text-right text-3xl bg-purple-800">
            {total !== undefined ? "= " : ""}
            <span className="text-orange-500">{total}</span>
          </div>

          <div className="flex items-stretch bg-purple-900 h-24">
            <CalculatorKey text={"/"} onClick={updateExpression} />
            <CalculatorKey text={"*"} onClick={updateExpression} />
            <CalculatorKey text={"+"} onClick={updateExpression} />
            <CalculatorKey text={"-"} onClick={updateExpression} />
          </div>

          <div className="flex items-stretch bg-purple-900 h-24">
            <CalculatorKey text={"7"} onClick={updateExpression} />
            <CalculatorKey text={"8"} onClick={updateExpression} />
            <CalculatorKey text={"9"} onClick={updateExpression} />
            <CalculatorKey text={"AC"} onClick={clearExpression} />
          </div>

          <div className="flex items-stretch bg-purple-900 h-24">
            <CalculatorKey text={"4"} onClick={updateExpression} />
            <CalculatorKey text={"5"} onClick={updateExpression} />
            <CalculatorKey text={"6"} onClick={updateExpression} />
            <CalculatorKey text={"0"} onClick={updateExpression} />
          </div>

          <div className="flex items-stretch bg-purple-900 h-24">
            <CalculatorKey text={"1"} onClick={updateExpression} />
            <CalculatorKey text={"2"} onClick={updateExpression} />
            <CalculatorKey text={"3"} onClick={updateExpression} />
            <CalculatorKey text={"="} onClick={calculate} isCta />
          </div>
        </div>
      </div>
      <NavigationButton />
    </div>
  );
};

export default Calculator;
