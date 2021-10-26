# 문제

함수 solution은 정수 n을 매개변수로 입력받습니다. n의 각 자릿수를 큰것부터 작은 순으로 정렬한 새로운 정수를 리턴해주세요. 예를들어 n이 118372면 873211을 리턴하면 됩니다.

## 입출력 예시

```jsx
console.log(solution(118372) //873211
```

## 문제 풀이

```jsx
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
```

1.  n값을 문자열로 변환
2.  한 글자씩 분리하여 배열로 만든다.
3.  배열을 내림차순으로 정렬한다.
4.  내림차순으로 정렬된 배열을 문자열로 합친다.
5.  문자열을 정수르 변환한다.

# 비고

쉬운 문제였다.
