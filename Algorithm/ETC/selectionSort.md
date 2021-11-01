# 선택 정렬

선택 정렬은 '가장 작은것을 앞으로 보내는것이 어떨까?'라는 발상

1 10 5 8 7 6 4 3 2 9 라는 숫자를 선택 정렬 한다면

0번쨰 인덱스 부터 마지막 까지 가장 작은 숫자를 0번으로 보낸다

1 10 5 8 7 6 4 3 2 9

1번째 인덱스 부터 마지막 까지 가장 작은 숫자를 1번 인덱스와 바꿔준다

1 2 5 8 7 6 4 3 10 9

2번째 인덱스 부터 마지막 까지 가장 작은 숫자를 2번 인덱스와 바꿔준다

1 2 3 8 7 6 4 5 10 9

...

```jsx
const selectionSort = (nums) => {
  for (let i = 0; i < nums.length; i++) {
    let tmp = i;
    let MIN = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < MIN) {
        tmp = j;
        MIN = nums[j];
      }
    }
    nums[tmp] = nums[i];

    nums[i] = MIN;
  }
  return nums;
};
```
