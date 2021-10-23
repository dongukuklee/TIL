# var, let, const, hoisting, TDZ

상태: JavaScript

선언은 호이스팅 되지만 할당은 호이스팅 되지 않는다.

## var의 특징

- 함수레벨 스코프를 가지고 있다.
- `var` 키워드는 생략이 가능하다.
  - 생략이 가능하기 때문에, 함수가 선언한 환경의 `this`에 영향을 받는다.
- 중복 선언이 가능하다.
  ```jsx
  var name = "hello";
  var name = "hi";
  console.log(name); // hi
  ```
- 호이스팅이 적용된다.

## let의 특징

- 블룩레벨 스코프를 가지고 있다.
  ```jsx
  {
    {
      var name = "동욱";
    }
  }
  console.log(name); //동욱

  {
    {
      let name = "동욱";
    }
  }
  console.log(name);
  // ReferenceError: name is not defined
  ```
- 키워드 생략이 불가능하다
  - 키워드를 생략하면 `var`처럼 작동하게 된다.
- 중복선언이 불가능하다.
  ```jsx
  let name = "Mike";
  console.log(name); //Mike

  let name = "Jane"; //error!
  console.log(name);
  ```
- 호이스팅이 적용된다.

  - TDZ(Temporary Dead Zone)에서 자세히..

- `cosnt`는 초기화와 동시에 선언이 **이루어져야한다**
  ```jsx
  let hello
  hello = 'hello'

  const hi
  //SyntaxError: Missing initializer in const declaration
  hi= hi
  ```
- `const`자체가 값을 불변으로 만드는 것은 아니다
  - 객체, 배열과같은 참조 자료형의 데이터 값은 변경이 가능하다

## hoisting 이란?

**스코프 내부 어디서든 변수 선언은 최상위에 선언된 것 처럼 행동하는 것**을 말한다

JS 인터프리터가 코드를 해석할 때 함수의 선언, 할당, 실행을 모두 나눠서 처리하기 때문.

```jsx
console.log(name) //undefined
var name = 'hello'

-------------------
var name
console.log(name)
name = 'hello'
```

위 처럼 선언은 호이스팅 되지만 할당은 호이스팅 되지않음.

name이란 변수만 올려지고 할당은 그대로 있음 (아래코드)

같은 상황에서 `let`,`const` 는 에러가 발생한다.

그럼 `let`,`const` 는 호이스팅 되지 않는 것일까?

그렇지 않다.

다시 호이스팅의 정의를 살펴보면

> **스코프 내부 어디서든 변수 선언은 최상위에 선언된 것 처럼 행동하는 것**

변수 선언인 `var`, `let`, `const` 모두 동일하게 적용한다.

그렇다면 왜 `let`, `const`는 에러가 발생할까

그 이유는 바로 TDZ(Temporal Dead Zone)때문이다.

### 변수 선언의 3단계

JS에서의 변수는 위의 사진처럼 선언, 초기화, 할당이라는 3가지의 단계를 걸쳐서 생성이 된다.

1. 선언 단계(Declaration phase) : 변수를 실행컨텍스트의 변수 객체에 등록하는 단계를 의미한다. 이 변수 객체는 스코프가 참조하는 대상이 된다.
2. 초기화 단계(Initialization phase) : 실행 컨텍스트에 존재 하는 변수 객체에 선언 단계의 변수를 위한 메모리를 만드는 단계이다.
   이 단계에서 할당된 메모리에는 undefined로 초기화 된다.
3. 할당 단계(Assignment phase) : 사용자가 undefined로 초기화된 메모리의 다른 값을 할당하는 단계이다.

`var`와 `let`/`const`의 차이는 이 3가지 단계의 순서에 차이가 존재한다.

먼저 `var`변수의 라이프 사이클이다.

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcpN7ly%2FbtqFMImMjbi%2FXax5yU47pHIffGGf6BYetk%2Fimg.jpg](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcpN7ly%2FbtqFMImMjbi%2FXax5yU47pHIffGGf6BYetk%2Fimg.jpg)

위 사진은 `var` 키워드 변수의 라이프 사이클이다.

`var`는 변수 선언전에 선언 단계와 초기화 단계를 동시에 진행한다.

그래서 JS는 실행 컨텍스트 변수 객체의 변수를 등록하고 메모리를 undefined로 만들어 버린다.

그렇기 때문에 변수를 선언하기 전에 호출해도 undefined로 호출이 되는 호이스팅이 발생하는 것이다.

다음은 let/const 의 라이프 사이클이다.

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbrfyzo%2FbtqFMHahg20%2FO4al3vnYiNideb03m6xB60%2Fimg.jpg](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbrfyzo%2FbtqFMHahg20%2FO4al3vnYiNideb03m6xB60%2Fimg.jpg)

`let`으로 선언된 변수는 `var` 키워드와는 다르게 선언단계와 초기화 단계가 분리돼어 진행이 된다.

그렇기 때문에 실행 컨텍스트에 변수를 등록했지만, 메모라기 할당이 되질 않아 접근할 수 없어 참조 에러가 발생하는 것 이고

이것을 보고 '호이스팅이 되질 않는다.' 라고 착각 하는 것 이다.

다시 정리 해보면 TDZ는 스코프의 시작 지점부터 초기화 시작 지점까지의 구간을 말한다.

이 TDZ구간에 의해 메모리가 할당이 되질 않아 참조 에러가 발생하는 것.

참고로 function 키워드는 변수 선언 3단계를 동시에 진행해 버린다.

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FL4IXl%2FbtqFNPydemy%2FWqwtWgxdhHKZZ3xylTcJpK%2Fimg.webp](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FL4IXl%2FbtqFNPydemy%2FWqwtWgxdhHKZZ3xylTcJpK%2Fimg.webp)
