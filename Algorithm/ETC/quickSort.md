# 퀵 정렬(Quick Sort)

버블, 선택, 삽입 정렬은 모두 시간 복잡도가 O(n^2)으로 일반적인 상황에서 사용하기 어려운 알고리즘이었다.

퀵 정렬은 대표적인 '분할 정복' 알고리즘으로 시간 복잡도가 (평균) O(n\*logN)이다. 최악은 O(n^2)

---

'특정한 값을 기준으로 큰 숫자와 작은 숫자를 나누면 어떨까?'

퀵 정렬에는 기준 값이 있다. 이를 피벗(Pivot)이라고 한다.

arr = [3,7,8,1,5,9,6,10,2,4]

퀵 정렬은 보통 가장 앞에있는 값을 피벗(Pivot)으로 설정한다.

피벗을 기준으로 다음 인덱스의 수를 비교해 피벗보다 큰 값을 찾고 마지막 인덱스에서 -1 씩 탐색 하면서 마지막 인덱스의 수 보다 작은 수를 찾는다.

[3,7,8,1,5,9,6,10,2,4] 3 보다 큰 7과 4보다 작은 2를 찾았다 (가까이 있는 수 중에서)

그 다은 해당되는 arr[8]인 7과 arr[1]인 2를 바꿔준다.

[3,2,8,1,5,9,6,10,7,4]

똑같이 피벗, 마지막 인덱스의 수를 비교해서 찾는다.

[3,2,8,1,5,9,6,10,7,4] 이번엔 arr[2]8과 arr[2] 1이 나왔다.

[3,2,1,8,5,9,6,10,7,4] 바꿔준다.

피벗, 마지막 인덱스의 수를 비교해서 찾는다.

[3,2,1,8,5,9,6,10,7,4] 이번엔 arr[3] 8과 arr[2]1이 나왔다.

하지만 이번에는 작은 값의 인덱스보다 큰 값의 인덱스가 더 작다 (엇갈렸다.)

이런 엇갈린 상황에서는 작은값과 pivot값을 바꿔준다.
Pivot 3 , 작은 값 1

[1,2,3,8,5,9,6,10,7,4] 이때 이전 pivot이었던 3은 정렬이 되었다.

3을 기준으로 했을 때 3보다 왼쪽에 있는 숫자들은 3보다 작고 오른쪽에 있는 숫자들은 3보다 크다.
이렇게 한 번 분할을 했을때 분할된 배열의 왼쪽은 기준점 보다 작고 오른쪽은 기준점 보다 크다.

이렇게 분할된 왼쪽 집합과 오른쪽 집합을 기준으로 반복적으로 앞서 했던 작업들을 반복적으로 수행한다.

3을 기준으로 나눠진 [1,2] [3] [8,5,9,6,10,7,4] 에서 수행하면

[1,2] 1을 피벗으로 비교한다. 1과 2 모두 엇갈린 상태 이므로 그대로 놔둔다 -> 피벗 1 작은 값 1, 피벗인 1은 정렬이 된 상태.

2를 피벗으로 비교한다. -> 비교할 값이 모두 정렬이 되어진 상태 -> 그대로 놔둔다.

[8,5,9,6,10,7,4] 피벗인 8 보다 큰 수 arr[2] 9 마지막 인덱스 4보다 작은 수 는 없다 (자기 자신) arr[6]

바꿔준다.

[8,5,4,6,10,7,9] 피벗인 8보다 큰 수 arr[4] 10 , 마지막 인덱스인 9보다 작은 수 7

바꿔준다.

[8,5,4,6,7,10,9] 피벗보다 큰 수 arr[5] 10, 마지막 인덱스인 9보다 작은 수 7 엇갈렸다.

피벗과 7을 바꿔준다.

[7,5,4,6,8,10,9] 피벗인 8을 기준으로 왼쪽 오른쪽 각각 정렬이 되어진 상태

왼쪽 배열을 정렬한다

[1,2,3] ->[7,5,4,6]<-

피벗인 7 마지막 인덱스 6 -> 피벗보다 큰 수 없다 마지막 인덱스 +1을 가르킨다. , 6보다 작은 수 4 arr[2] 엇갈렸다.

[1,2,3] [4,5,7,6] 피벗 기준 4,5 가 정렬되었다.

[7,6] 엇갈렸다. -

```jsx
var partition = function (array, left, right, pivotIndex) {
  debugger;
  // 정렬하는 부분
  var temp;
  var pivot = array[pivotIndex];
  while (left <= right) {
    // 왼쪽, 오른쪽 수를 규칙과 비교해 다음 수로 넘어갑니다.
    while (array[left] < pivot) left++;
    while (array[right] > pivot) right--;
    if (left <= right) {
      // 왼쪽이 기준보다 크고, 오른쪽이 기준보다 작으면
      temp = array[left];
      array[left] = array[right];
      array[right] = temp; // 서로 바꿔줍니다.
      left++;
      right--;
    }
  }
  temp = array[left];
  array[left] = array[pivotIndex];
  array[pivotIndex] = temp; // 마지막으로 기준과 만난 수를 바꿔줍니다. 기준의 위치는 이제 i입니다.
  debugger;
  return left;
};

var quickSort = function (array, left, right) {
  // 재귀하는 부분
  if (!left) left = 0;
  if (!right) right = array.length - 1;
  var pivotIndex = right; // 배열 가장 오른쪽의 수를 기준으로 뽑습니다.
  debugger;
  pivotIndex = partition(array, left, right - 1, pivotIndex); // right - 1을 하는 이유는 기준(현재 right)을 제외하고 정렬하기 위함입니다.
  debugger;
  if (left < pivotIndex - 1) quickSort(array, left, pivotIndex - 1); // 기준 왼쪽 부분 재귀
  debugger;
  if (pivotIndex + 1 < right) quickSort(array, pivotIndex + 1, right); // 기준 오른쪽 부분 재귀
  debugger;
  return array;
};
```
