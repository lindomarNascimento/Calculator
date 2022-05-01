const calculateTwoNumber = (numbers) => {
  const map = {
    "+": (n1, n2) => n1 + n2,
    "-": (n1, n2) => n1 - n2,
    "/": (n1, n2) => n1 / n2,
    "*": (n1, n2) => n1 * n2,
  };
  const numbersSplit = numbers.split(" ");
  const number1 = Number(numbersSplit[0]);
  const number2 = Number(numbersSplit[2]);

  const result = map[numbersSplit[1]](number1, number2);

  return result;
};

const sendNumbers = (textAccount) => {
  const regTimesOrBy = /-?[0-9]\d*(\.\d+)* [\/|\*] -?[0-9]\d*(\.\d+)*/g;
  const regSumOrSub = /-?[0-9]\d*(\.\d+)* \D -?[0-9]\d*(\.\d+)*/g;

  const operationTimesOrBy = textAccount.match(regTimesOrBy)?.[0];
  const operationSumOrSub = textAccount.match(regSumOrSub)?.[0];

  if (!operationTimesOrBy && !operationSumOrSub) return textAccount;

  const numbers = operationTimesOrBy || operationSumOrSub;
  const result = calculateTwoNumber(numbers);
  const newTextAccount = textAccount.replace(numbers, result);
  return sendNumbers(newTextAccount);
};

const calculateWithParentheses = (textAccount) => {
  const regGetParentheses = /\(([^()]+)\)/g;

  const operationBetweenParentheses = textAccount.match(regGetParentheses)?.[0];

  const operationWithoutParentheses = operationBetweenParentheses
    ?.replace("(", "")
    ?.replace(")", "");

  if (!operationBetweenParentheses) return sendNumbers(textAccount);

  const result = sendNumbers(operationWithoutParentheses);

  const newTextAccount = textAccount.replace(
    operationBetweenParentheses,
    result
  );

  return calculateWithParentheses(newTextAccount);
};

console.log(calculateWithParentheses("10 * 5 * 50 - (-2 + 6) / 4 - (10 - (9 * 6 - (10 + 2)))"));
// console.log(sendNumbers("1 + 2 / 4 + 2 * 1"));
