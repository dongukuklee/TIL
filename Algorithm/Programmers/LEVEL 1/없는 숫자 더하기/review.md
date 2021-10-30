# 문제

0부터 9까지의 숫자 중 일부가 들어있는 배열 numbers가 매개변수로 주어집니다. numbers에서 찾을 수 없는 0부터 9까지의 숫자를 모두 찾아 더한 수를 return 하도록 solution 함수를
완성해주세요.

## 주의 사항

    - 1 ≤ numbers의 길이 ≤ 9
    - 0 ≤ numbers의 모든 수 ≤ 9
    - numbers의 모든 수는 서로 다릅니다.

## 입출력 예시

| numbers           | result |
| ----------------- | ------ |
| [1,2,3,4,6,7,8,0] | 14     |
| [5,8,4,0,6,7,9]   | 6      |

## 문제 풀이

```js
function solution(numbers) {
  var answer = 0;
  let numbersCandidate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  numbersCandidate.forEach((el) => {
    if (numbers.indexOf(el) === -1) answer += el;
  });
  return answer;
}
```

## 다른 문제 풀이

```jsx
function solution(numbers) {
  return 45 - numbers.reduce((cur, acc) => cur + acc, 0);
}
```

# 비고

max 값을 찾기위해 불필요하게 반복문들 돌았다
리팩토링 필요..
