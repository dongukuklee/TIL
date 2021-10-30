function solution(s) {
  let answer = s;

  let idx = 0;
  while (isNaN(answer)) {
    if (!isNaN(answer[idx])) {
      idx += 1;
      continue;
    }
    answer = aux(answer[idx], idx, answer);
  }
  return Number.parseInt(answer);
}

const aux = (char, idx, answer) => {
  switch (char) {
    case "z":
      answer = answer.replace("zero", "0");
      idx += 4;
      break;
    case "o":
      answer = answer.replace("one", "1");

      idx += 3;
      break;
    case "t":
      if (answer[idx + 1] === "w") {
        answer = answer.replace("two", "2");
        idx += 3;
      } else {
        answer = answer.replace("three", "3");
        idx += 5;
      }
      break;
    case "f":
      if (answer[idx + 1] === "o") {
        answer = answer.replace("four", "4");
        idx += 4;
      } else {
        answer = answer.replace("five", "5");
        idx += 4;
      }
      break;
    case "s":
      if (answer[idx + 1] === "i") {
        answer = answer.replace("six", "6");
        idx += 3;
      } else {
        answer = answer.replace("seven", "7");
        idx += 5;
      }
      break;
    case "e":
      answer = answer.replace("eight", "8");
      idx += 5;
      break;
    case "n":
      answer = answer.replace("nine", "9");
      idx += 4;
      break;
    default:
      break;
  }
  return answer;
};
