function solution(n) {
  var answer = Number.parseInt(
    n
      .toString()
      .split("")
      .sort((a, b) => b - a)
      .join("")
  );

  return answer;
}
