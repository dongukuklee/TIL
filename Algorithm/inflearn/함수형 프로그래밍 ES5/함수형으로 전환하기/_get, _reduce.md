# \_get, \_reduce

## \_get

object에 있는 값을 안전하게 참조하는 함수 \_get을 만들어보자

```jsx
let user = [{ name: "DU" }];

function _get(obj, key) {
  return !!obj === false ? undefined : obj[key];
}
```

\_get은 object와 원하는 key를 받아 해당하는 값을 return 한다.

?? 그냥 obj에 key 값 받아오면 되는 거 아닌가?

```jsx
console.log(user[10].name);
//Cannot read property 'name' of undefined
```

위 코드는 에러가 난다.

하지만 \_get함수를 이용해 값을 참조하면 값이 없더라도 안정적으로 값을 받아올 수 있다.

```jsx
console.log(_get(user[10], "name"));
//undefined
```

\_get 함수와 이전에 만들었던 \_curryr 함수를 사용하여 작성했던 코드들을 더 간결하게 만들어보자

```jsx
let _get = _curryr(function (obj, key) {
  return !!obj === false ? undefined : obj[key];
});
```

\_curryr 함수로 객체에서 name을 수집하는 함수가 아닌 name값을 수집하는 함수를 만들 수 있다

```jsx
let getName = _get("name");
console.log(getName(users));
console.log(getName(users2));
```

서로 다른 객체를 넣어도 객체의 name 값을 출력한다.

```jsx
console.log(
	_map(
		_filter(users,function(user){return user.age>=30}),
			function(user){return user.age})))

console.log(
	_map(
		_filter(users,function(user){return user.age>=30}),
		_get('age'))))

```

이전에 구현했었던 \_filter 함수의 iteratee 함수로 위와 같이 적용할 수도 있다.

코드가 훨씬 안정적이고 간결해졌다

### \_reduce

\_reduce는 인자로 list (배열), iter (반복함수) , memo (시작 값) 이 들어간다.

```jsx
console.log(
  _reduce(
    [1, 2, 3],
    function (a, b) {
      return a + b;
    },
    0
  )
); // 6
```

동작 원리는 초깃값인 memo에 iter 함수를 적용시키는 방식

iter 함수의 이름을 add라고 가정하면

```jsx
memo = add(0, 1); // add(memo, list[0])
memo = add(1, 2); // add(memo, list[1])
memo = add(3, 3); // add(memo, list[2])
return memo; // 6
```

결과적으로 \_reduce는 add(add(add(0,1),2),3) 를 실행해 주는 함수이다

```jsx
function _reduce(list, iter, memo) {
  _each(list, function (val) {
    memo = iter(memo, val);
  });
  return memo;
}
```

\_reduce는 2 번째 인자로 받은 함수를 재귀적으로 호출 하면서 값을 만들어가는 함수이다.

\_reduce는 복잡하거나 어려운 로직을 단순하게 구현할 수 있도록 도와준다.

\_reduce는 '어떻게 memo를 축약해 나갈것인가'가 숨어져서 보여지지 않고(이미 구현이 되어 있기 때문) 선언적인 코드만 있기 때문에 코드가 직관적이게 된다.

\_reduce는 세 번째 인자를 생략할 수도 있다

```jsx
function _reduce(list,iter,memo){
	if(arguments.length===2){
	memo = list[0]
	let newList = list.slice(1)

}

	_each(newList,function(val){
		memo = iter(memo,val)
	}
}
```

위 코드를 보면 list.slice(1)라는 코드가 쓰였다.

list.slice를 쓰면 배열에 한해서만 적용할 수밖에 없기 때문에 \_rest라는 함수를 새로 만들어 주도록 하자. (Array-like Object에는 적용 불가)

Array.prototype.slice 를 새로운 변수에 할당하고 .call이라는 메소드를 사용하면 해당 변수에 할당한 객체의 메소드를 사용할 수 있다.

[call, apply](https://www.notion.so/call-apply-e9774756b28c418a91eec9d7545b6327)

```jsx
let slice = Array.prototype.slice;
slice.call(list, num); // list함수에서 num만큼 잘라서 return 한다.

let list = { 0: 1, 1: 20, 2: 30, length: 3 };

console.log(slice.call(list, 1)); //[20,30]
```

위와 같은 기법을 이용하면 slice가 아닌 다른 Array메소드도 Array-like Object에 적용시킬 수 있다

(내부적으로 숫자로 된 key와 length에 의존해서 동작하도록 구현되어 있어서 length 값이 존재해야한다.)

```jsx
let slice = Array.prototype.slice;

function _rest(list,num){
	return slice.call(list,num||1);
}

function _reduce(list,iter,memo){
	if(arguments.length===2){
	memo = list[0]
	let newList = _rest(list)
}

	_each(newList,function(val){
		memo = iter(memo,val)
	}

	return memo
}

```

최댓값 구하기

```jsx
let list = [2,4,7,70,100]
_reduce(list,function(a,b){
	return a>b?a:b
}
```

최솟값 구하기

```jsx
let list = [2,4,7,70,100]
_reduce(list,function(a,b){
	return a<b?a:b
}
```
