# \_pipe, \_go

## \_pipe

\_pipe는 함수들을 인자로 받아서 연속적으로 실행해 주는 함수이다. 들어온 함수들을 앞으로 연속 실행할 준비가 된 함수를 리턴하는 함수이다.

함수형 프로그래밍에서는 함수를 다루는 함수를 많이 사용한다.

\_pipe보다 추상화 된 개념이 reduce이다. \_pipe는 '함수들'이라는 배열을 통해 인자를 연속적으로 적용한 축약된 값을 return 하는 함수이다.

```jsx
function _pipe() {
  let fncs = arguments;
  return function (arg) {
    return _reduce(
      fns,
      function (arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

let f1 = _pipe(
  function (a) {
    return a + 1;
  },
  function (a) {
    return a * 2;
  }
);

console.log(f1(1)); // 4
```

위 코드에서 f1의 인자값은 1이다. fns에서 첫 번째 함수인

```jsx
function(a) {return a+1}
function(1) {return 1+1} //2
```

의 return 값이 2 가 되고 두 번째 함수의 인자로 들어가게 된다.

```jsx
function(a){return a*2}
function(2){return 2*2} //4
```

## \_go

\_go는 \_pipe함수인데 즉시 실행되는 \_pipe 함수라고 생각하면 된다.

```jsx
function _go(arg) {
  let fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
  //return _pipe(...fns)(arg)도 동일한 결과가 나온다.
}
```

[call, apply](https://www.notion.so/call-apply-e9774756b28c418a91eec9d7545b6327)

이전에 만들었던 코드에 \_go를 적용시켜보자

```jsx
console.log(
	_map(
		_filter(users,function(user){return user.age>=30}),
		_get('age'))))

//나이가 30이상인 user의 나이만 수집한다.
```

위 코드는 코드 표현 안쪽에서 출발해서 바깥으로 전개해 나가는 방식이라 사람이 읽기 불편한 점이 있다.

```jsx
_go(users,
	function(users){
	return _filter(users,function(user){
		return user.age >=30
	}},
	function(users){
		return _map(users,_get('age'))
	},
	console.log
);
```

위에 사용된 \_filter, \_map 함수에 \_curryr 함수와 화살표 함수를 적용시켜보자

\_curryr은 인자가 들어오는 순서를 오른쪽 부터 적용하게 만들어주는 함수였다.

```jsx
_filter = _curryr(_filter);
_map = curryr(_map);

//사용 방식이
_map([1, 2, 3], function (val) {
  return val * 2;
});
_map(function (val) {
  return val * 2;
})([1, 2, 3]);

//이렇게 바뀌게 된다.
```

그러면

```jsx
_go(
  users,
  _filter(function (user) {
    return user.age >= 30;
  }),
  _map(_get("age")),
  console.log
);

//화살표 함수를 적용시키면
_go(
  users,
  _filter((user) => user.age >= 30),
  _map(_get("age")),
  console.log
);
```

go라는 함수는 첫 번째로 들어온 인자값을 그 뒤에 인자 값으로 들어오는 함수들의 매개변수로 적용시켜 나가는 코드이다.

\_filter라는 함수를 만들 때 \_curryr을 통해 만들어 \_filter를 실행할 때 인자가 1개인 경우 인자가 오른쪽에서부터 적용된 또 다른 함수를 return 하게 되고, \_go라는 함수는 함수들을 받아서 함수들을 연속적으로 실행하면서 인자들을 받아서 다음 함수에 적용하는 방식으로 함수가 함수를 실행하고, 함수가 함수를 리턴하는 식으로 프로그래밍을 하는 것이 함수형 프로그래밍이다.

그때 함수의 평가 시점이나 함수가 적용해 나가는 과정에서 **하나하나의 함수들이 부수효과가 없고 순수 함수들로 구성될 때** 이러한 조합성을 만들 수 있다.
