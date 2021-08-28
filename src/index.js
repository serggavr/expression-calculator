function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let equation = expr.split(" ");

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

    function calcDivisionMultiplication(equation) {
        let x;
        for (let i = 0; i < equation.length ; i++) {
            if (equation[i] === "") {equation.splice(i,1)};
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

    equation = calcDivisionMultiplication(equation);

    while (equation.lastIndexOf("(") !== -1) {
        let splitedEquation = []
        let splitedEquationStart = equation.lastIndexOf("(");
        let splitedEquationEnd = equation.indexOf(")");
        splitedEquation = equation.slice(splitedEquationStart + 1, splitedEquationEnd);
        let lengthSplitedEquation = splitedEquation.length + 2;
        splitedEquation = calcDivisionMultiplication(splitedEquation);
        splitedEquation = calcPlusMinus(splitedEquation);
        equation.splice(splitedEquationStart, lengthSplitedEquation, splitedEquation);
    }

    equation = calcPlusMinus(calcDivisionMultiplication(equation));

    if (Number.isInteger(equation)) {
        return Number(equation);
    }
    if (equation !== equation.toFixed(4)) {
        return Number(equation.toFixed(4));
    }
}


module.exports = {
    expressionCalculator
}