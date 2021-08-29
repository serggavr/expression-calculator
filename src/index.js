function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let seps = [" ","-","+","*","/","(",")"];
    let equation = expr
    for (let i = 0; i < seps.length; i++) {
        equation = equation.split(seps[i]);
        equation = equation.join(`${seps[i]}`);
    }
    equation = equation.split(" ");
    function calcPlusMinus(eq) {
        let calc = 0;
        for (let i = 0; i < eq.length ; i++) {
            if (eq[i] === "+") {
                calc = Number(eq[i - 1]) + Number(eq[i + 1])
                eq.splice(i - 1 , 3, calc);
                i--;
                }
            if (eq[i] === "-") {
                calc = Number(eq[i - 1]) - Number(eq[i + 1])
                eq.splice(i - 1 , 3, calc);
                i--;
                }
            }
        return eq[0];
    }

    function delEmptyElements(equation) {
        equation = equation.filter(simbols => simbols !== "");
    return equation;
    }


    function checkPairedBrackets(equation) {
        let x = equation.filter(x => x==")");
        let y = equation.filter(x => x=="(");
        if (x.length !== y.length) {throw new Error("ExpressionError: Brackets must be paired")};
    }

    function calcDivisionMultiplication(equation) {
        let x;
        for (let i = 0; i < equation.length ; i++) {
            // if (equation[i] === "") {equation.splice(i,1)};
            if (equation[i] === "*" && equation[i + 1] !== "(" && equation[i - 1] !== ")") {
                x = equation[i - 1] * equation[i + 1];
                if (x === Infinity) { throw new TypeError("TypeError: Division by zero.")};
                equation.splice(i - 1, 3, x);
                i--;
                }
            if (equation[i] === "/" && equation[i + 1] !== "(" && equation[i - 1] !== ")") {
                x = equation[i - 1] / equation[i + 1];
                if (x === Infinity) { throw new TypeError("TypeError: Division by zero.")};
                equation.splice(i - 1, 3, x);
                i--;
                }
        }
        return equation;
    }

    equation = delEmptyElements(equation);
    checkPairedBrackets(equation);
    // equation = calcDivisionMultiplication(equation);

    while (equation.lastIndexOf("(") !== -1) {
        let splitedEquationStart = equation.lastIndexOf("(");
        let splitedEquationEnd = equation.indexOf(")", splitedEquationStart);
        let splitedEquation = equation.slice(splitedEquationStart + 1, splitedEquationEnd);
        let lengthSplitedEquation = splitedEquation.length + 2;
        splitedEquation = calcDivisionMultiplication(splitedEquation);
        splitedEquation = calcPlusMinus(splitedEquation);
        equation.splice(splitedEquationStart, lengthSplitedEquation, splitedEquation);
    }

    equation = calcPlusMinus(calcDivisionMultiplication(equation));

    return Number(equation);
}


module.exports = {
    expressionCalculator
}