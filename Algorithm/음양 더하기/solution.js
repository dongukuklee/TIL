function solution(absolutes, signs) {
  let answer = 0;
  absolutes.forEach((el, idx) => {
    if (signs[idx]) {
      answer += el;
    } else {
      answer -= el;
    }
  });

  return answer;

  //absolutes, signs 는 같은 길이를 가진 배열이다.
  //absolutes의 인덱스와 signs 의 인덱스를 비교하여
  //signs의 인덱스가 false이면 answer - absolutes
  //signs의 인덱스가 true이면 answer + absolutes
}
