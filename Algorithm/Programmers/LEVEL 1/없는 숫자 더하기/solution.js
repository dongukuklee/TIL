function solution(numbers) {
  var answer = 0;
  let numbersCandidate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  numbersCandidate.forEach((el) => {
    if (numbers.indexOf(el) === -1) answer += el;
  });
  return answer;
}
