# List

List는 key:value 관계가 1:N인 Data Type이다.

17개의 명령어를 가지고 있고 LRPUSH, LRPOP을 사용할 경우 성능은 O(1)이다.

명령어 시작이 L/R로 시작하며 대표적인 명령어로는 LPUSH, RPUSH, LPOP, RPOP, LRANGE 등이 있다.

### 특징

- 저장 순서를 유지한다
- 값 중복을 허용한다.
- 데이터 압축으로 메모리 절약이 가능하다.

### LPUSH,RPUSH

LPUSH, RPUSH 명령어로 데이터를 추가할 수 있다.

LPUSH KEY VALUE

```jsx
LPUSH user 'donguk'
LPUSH user 'dongukuk'
LPUSH user 'dongukukuk'

['dongukukuk','dongukuk''donguk']
// 0         ,  1      , 2
```

RPUSH KEY VALUE

```jsx
RPUSH user 'Rdonguk'

['dongukukuk','dongukuk''donguk','Rdonguk']
```

### LRANGE

LRANGE 명령어로 인덱스별로 데이터 조회가 가능하다

```jsx
LRANGE user 0 -1
/*
*LRANGE user 0 -1
*1) "dongukukuk"
*2) "dongukuk"
*3) "donguk"
*4) "Rdonguk'
*/
```

### LPOP, RPOP

LPOP, RPOP 명령어로 데이터를 뽑아낼 수 있다.

```jsx
LPOP user
//"dongukukuk"
RPOP user
//"Rdonguk"

LRANGE user 0 -1

/*
*LRANGE user 0 -1
*1) "dongukuk"
*2) "donguk"
/
```

LIST의 경우 중간에 있는 데이터를 처리하는 경우 성능이 떨어진다.

ex) LINDEX key 10 , LSET key 10 value

key값의 10 번째 인덱스를 가져오는 명령어와 key값의 10 번째 인덱스의 값을 value로 변경하는 명령어인데 이는 10번째 인덱스까지 순회를 해야하므로 시간복잡도가 O(N)이 된다.

따라서 중간에 있는 데이터를 가져와야 할 경우가 잦다면 LIST사용을 고려해봐야 한다.
