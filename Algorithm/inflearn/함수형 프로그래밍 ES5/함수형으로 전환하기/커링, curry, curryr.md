# 커링, curry, curryr

## 커링이란?

함수에 인자를 하나씩 적용해 나가다가 필요한 인자가 모두 채워지면 함수를 실행하는 기법이다.

자바스크립트는 커링을 지원하지 않지만 일급 함수가 지원되고 평가 시점을 마음대로 다룰 수 있기 때문에 커링과 같은 기법을 얼마든지 구현할 수 있다.

## \_curry 함수

```jsx
function _curry(fn) {
  return function (a) {
    return function (b) {
      return fn(a, b);
    };
  };
}
```

\_curry(fn) 함수는 인자로 a를 받는 익명함수를 return 하고 이 익명 함수는 b를 인자로 받는 익명 함수를 return한다 그리고 이 익명함수는 \_curry함수에서 인자로 받은 함수를 실행한다.

일반적인 add함수

```jsx
let add = function (a, b) {
  return a + b;
};

console.log(add(10, 5)); // 15
```

\_curry로 구현한 add함수

```jsx
let add = _curry(function(a,b){return a+b}}
let add10 = add(10)
let add5 = add(5)
console.log(add10(5)) // 15
console.log(add5(10)) //15

console.log(add(10)(5)) //15
```

이전에 만들었던 add_maker와 유사하다.

이와 같이 커링 기법은 본체와 같은 함수인

```jsx
function(a,b){
	return a+b
}
```

위 함수를 원하는 시점까지 미뤄뒀다가 평가하는 함수이다.

```jsx
function _curry(fn) {
  return function (a, b) {
    if (arguments.length === 2) {
      return fn(a, b);
    }
    return function (b) {
      return fn(a, b);
    };
  };
}

function _curry(fn) {
  return function (a, b) {
    return arguments.length === 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b);
        };
  };
}
//3항연산자로 더 깔끔하게 표현이 가능하다.
```

커링 함수의 인자값이 여러개가 들어올 때 위 코드처럼 처리할 수 있다.

```jsx
let sub = _curry(function (a, b) {
  return a - b;
});
console.log(sub(10, 5)); // 5

let sub10 = sub(10);
console.log(sub10(5)); //5
```

이런식으로 유연한 다형성을 적용할 수 있다.

근데 위 코드를 살펴보면 sub(10,5)는 10에서 5를 뺀다는 것을 알 수 있지만 sub10(5)은 5에서 10을 빼야할 거 같다.

\_curry같은 경우는 왼쪽부터 a, b순서대로 인자를 적용 하는데, 인자를 오른쪽부터 적용하는 \_curryr이라는 함수를 만들어보자

```jsx
function _curryr(fn){
	return function(a,b){
		return arguments.length===2?fn(a,b):function(b){return fn(b,a}
	}
}
//인자가 2개 들어올 때는 그대로 fn에 적용하고
//인자가 1개씩 들어올 때는 거꾸로 fn에 적용한다
let sub = _curryr(function(a,b){return a-b}}
let sub10 = _curryr(10)
console.log(sub(10,5))//5
console.log(sub10(5)) // -5
```

\_curryr 함수로 sub10은 들어오는 인자에 10을 뺴는 함수가 되었다.
