# Common

레디스 전체에 적용되는 공통의 명령어이다.

- 명령어 개수: 22
- 성능은 O(1)
- 대표적인 명령어
  - DEL - 키 삭제
    - DEL KEY
  - RENAME - 키 이름 변경
    - RENAME KEY NEW_KEY
  - EXPIRE - 키의 만료시간 지정
    - EXPIRE KEY 시간
  - TTL - 키의 만료시간 확인
    - TTL KEY
  - KEYS - 키 검색
    - KEYS \* - 모든 키 검색
    - KEYS user\* - user로 시작되는 KEY검색
    - KEYS \* TYPE - 해당되는 타입의 모든 KEYS를 검색
    - KEYS user\* TYPE user로 시작하는 모든 타입의 KEYS를 검색.
    - KEYS user\* string value memory table - 원하는 데이터의 value와 memory를 table형식으로 보여준다.
    - KEYS명령어는 운영서버에는 사용하지 않는 것이 좋다.
  - UNLINK
    - 만약 Set에 1백만개의 데이터가 있을 때 DEL로 데이터를 지우게 되면 약 44,217 ms가 소요된다.
    - UNLINK를 사용하면 SET데이터를 비동기적으로 처리하여 삭제하는데 약 25 ms가 소요된다.
    - 멤버수가 많으면 키 삭제 시간이 오래걸려 성능에 문제가 있을 수 있다.
