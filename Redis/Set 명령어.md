# Set

Set은 key:value 관계가 1:N인 Data Type이다.

15개의 명령어를 가지고 있고 성능은 O(1)이다.

명령어 시작이 S로 시작하며 대표적인 명령어로는 SADD, SMOVE, SUNION, SINTER, SDIFF 등이 있다.

### 특징

- 데이터 저장 순서가 없다
- 값 중복이 없다
- 데이터를 압축하지 않는다.

### SADD, SMEMBERS

SADD - Set에 데이터를 추가하는 명령어이다.

SMEMBERS - Set에 데이터를 조회하는 명령어이다.

SET KEY VALUE

```jsx
SADD a 1
SADD a 1

SADD b 2

SMBEMBERS a
1) "1"

SMBEMBERS b
1) "2"
```

SMOVE

set에 데이터를 다른 set으로 이동시키는 명령어이다.

```jsx
SMOVE a b 1

SMEMBERS a
(empty list or set)

SMEMBERS b
1) "1"
2) "2"
```

## SET 활용 예시

- 좋아요, 싫어요

  - 좋아요 클릭 :SADD good user-100
  - 좋아요 클릭했는지 확인 : SISMEMBER good user-100
    - 있으면 1 없으면 0 이 나온다.
  - 좋아요 취소 : SREM good user-100
  - 좋아요 클릭한 사용자 수 : SCARD good

- 상품을 본 사용자
  - 상품 클릭 : SADD prd-A user-100
  - 상품을 본 사용자 모두를 조회(합집합) : SUNION prd-A prd-B
  - A와 B상품을 본 사용자를 조회(교집합) : SINTER prd-A prd-B
  - A상품을 본 사용자 조회 : SMEMBERS prd-A
