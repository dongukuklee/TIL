function solution(left, right) {
  let answer = 0;
  for (let i = left; i <= right; i++) {
    if (aux(i)) {
      answer -= i;
    } else {
      answer += i;
    }
  }
  return answer;
}

function aux(num) {
  //제곱수 인지 아닌지 판별하는 함수.
  return Math.sqrt(num) % 1 === 0;
}
