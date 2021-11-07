# String

String은 key:value 관계가 1:1인 Data Type이다.

24개의 명령어를 가지고 있고 성능은 O(1)이다.

대표적인 명령어로는 SET, GET, INCR, APPEND, SETBIT 가 있고 최대 Value 사이즈는 512MB이다.

### 명령어 사용

SET으로 Data를 설정할 수 있다.

SET key value

```jsx
SET name 'DongUk'
```

SQL 에서는 INSERT, UPDATE가 분리되어 있지만 Redis는 INSERT, UPDATE가 통합 되어있다.

```jsx
SET name 'DongUkUk'
```

name이 덮어씌어진다.

※ SET 주의사항

- SET key value 명령 후 다른 Collection Type의 setter명령을 사용하면 에러가 발생한다.
- 하지만 반대로 Collection Type의 setter명령 후 SET명령을 사용하면 덮어쓰기가 된다.

GET으로 Data를 가져올 수 있다.

```jsx
GET name //'DongUkUk'
```

INCR, DECR 명령어로 NUMBER data를 관리할 수 있다.

```jsx
SET age '27'
INCR age
GET age '28'

DECR age
get age '27'
```

APPEND 명령어로 데이터 붙여넣기가 가능하다.

SET보다 메모리 사용량이 많다. APPEND 명령을 실행하면 추후에 실행될지 모를 APPEN를 위해 메모리를 추가로 확보하기 때문.

```jsx
SET name 'lee'
GET name //'lee'

APPEND name 'donguk'

GET name //'leedonguk
```
