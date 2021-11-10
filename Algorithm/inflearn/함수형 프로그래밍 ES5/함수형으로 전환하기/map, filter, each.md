# map, filter, each

# map, filter

```
let users = [
	{id:1, name:'GD',age:34},
	{id:2, name:'GH',age:29},
	{id:3, name:'HG',age:28},
	{id:4, name:'DU',age:27},
	{id:5, name:'FF',age:31},
	{id:6, name:'DD',age:34},
	{id:7, name:'AR',age:33},
	{id:8, name:'HM',age:29},
	{id:9, name:'BB',age:22},
	{id:10, name:'CC',age:90},
]

```

명령형 코드를 작성하고 함수형으로 리팩토링해보자

1. 30세 이상인 users를 거른다

```
let userOver30 =[]
for(let i =0;i<users.length;i++){
	if(user[i].age>=30){
		userOver30.push(user[i])
	}
}

```

1. 30세 이상인 users의 name을 수집한다.

   ```
   let nameOfUserOver30= []
   for(let i =0;i<userOver30.length;i++){
   	nameOfUserOver30.push(userOver30[i])
   }

   ```

1. 30세 미만의 users를 거른다.

   ```
   let userUnder30 =[]
   for(let i =0;i<users.length;i++){
   	if(user[i].age<30){
   		userUnder30.push(user[i])
   	}
   }

   ```

1. 30세 미만인 users의 age를 수집한다.

```
let ageOfUserUnder30= []
for(let i =0;i<userUnder30.length;i++){
	ageOfUserUnder30.push(userUnder30[i])
}

```

## \_filter, \_map으로 리팩토링

위 명령형 코드들을 함수형 코드로 리팩토링해보자

### \_filter

위 명령형 코드에서 30세 이상, 30세 미만을 걸러내는 코드는 나이를 비교하는 부분을 제외하면 동일하다.

if(user[i].age>=30) , if(user[i].age<30) << 요 부분

```
function _filter(list,predi){
	let new_list =[]
	for(let i =0;i<list.length;i++){
		if(predi(list[i])){
			new_list.push(user[i])
		}
	}
	return new_liset
}

```

함수형 프로그래밍에서는 if(user[i].age>=30) , if(user[i].age<30) 와 같은 중복을 제거하거나 어떤 부분을 추상화 할때 함수를 사용한다.

> 추상화의 단위가 객체, 메서드, 클래스가 아닌 함수를 이용해 프로그래밍을 하는것이 함수형 프로그래밍이다.

위 코드에서 어떤 조건일 때 if문 안에 들어올 것인가를 predi라는 함수에게 완전히 위임하게 한다.

\_filter()와 같은 함수를 응용형 함수라고 하는데, 응용형 함수는 함수가 함수를 받아서 원하는 시점에 해당하는 함수가 알고있는 인자를 적용하는 프로그래밍이다. 고차 함수라고도 한다.

```
_filter(users,function(user){
	return user.age>=30
}
//나이가 30 이상인 user배열을 리턴
_filter(users,function(user){
	return user.age<30
}
//나이가 30 미만인 user배열을 리턴
_filter([1,2,3,4],function(num) return !(num%2))
//짝수를 리턴

```

위와 같이 users가 아닌 다른 배열로도 응용이 가능하다.

### \_map

이번엔 이름과 나이를 수집하는 \_map함수를 만들어보자

```
function _map(list,mapper){
	let new_list = []
	for(let i =0;i<list.length;i++){
			new_list.push(mapper(list[i])
	}
	return new_list
}

```

\_filter, \_map 함수를 살펴보면 데이터 형이(동생 아님 ㅎ) 어떻게 생겼는지 하나도 보이지 않는다. 관심사가 완전히 분리되는 것

→ 재사용성이 극대화 된다.

```
let over30 = _filter(users,function(user){return user.age>=30}
//over30 변수에 나이가 30 이상인 user배열을 할당
let names = _map(over30 , function(user){ return user.name})
//names 변수에 over30를 인자로 받아 이름만 수집

let under30 = _filter(users,function(user){return user.age<30}
//under30 변수에 나이가 30 미만인 user배열을 할당
let names = _map(over30 , function(user){ return user.age})
//ages 변수에 under30를 인자로 받아 나이만 수집

let pow = _map([1,2,3],function(num){return num**2}
//users가 아닌 다른 배열로도 재사용 가능

```

### 대입문을 줄여 간결하게 만들기

함수형 프로그래밍은 값을 만들어 놓고 문장을 내려가면서 변형해 나가는게 아니라 함수를 통과해 나가면서 한번에 값을 만드는 방식으로 프로그래밍을 한다.

```
console.log(
	_map(
		_filter(users,function(user){return user.age>=30} ,
		function(user){ return user.name}
	)
)
//30세 이상의 user의 나이를 수집해 출력한다

```

코드를 고쳐줄 부분이 최소화가 되었고 보다 간결한 코드가 되었다.

그리고

```
let over30 = _filter(users,function(user){return user.age>=30}
over30.pop()

```

위와 같이 코드 중간에 변화를 줄 여지가 전혀 없기 때문에(부수효과) 보다 안정성 높고 테스트가 쉬운 코드가 완성할 수 있다.

## \_map, \_filter에 있는 중복 제거

... 뭐가 많다.

\_filter, \_map을 다시보자

```
function _filter(list,predi){
	let new_list =[]
	for(let i =0;i<list.length;i++){
		if(predi(list[i])){
			new_list.push(user[i])
		}
	}
	return new_liset
}

function _map(list,mapper){
	let new_list = []
	for(let i =0;i<list.length;i++){
			new_list.push(mapper(list[i])
	}
	return new_list
}

```

루프부분, list[i]를 확인하는 부분이 중복된다.

### \_each

```
function _each(list, iter){
	for(let i =0;i<list.length;i++){
			iter(list[i])
	}
	return list
}

```

for문을 돌면서 predi, mapper가 했던 일을 완전히 위임하는 함수이다.

\_map 리팩토링

```
function _map(list,mapper){
	let new_list = []
		_each(list, function(val){
		new_list.push(mapper(val));
	})

	return new_list
}

```

\_filter 리팩토링

```
function _filter(list,predi){
	let new_list =[]
	_each(list,function(val){
		if(predi(val) new_list.push(val
	})
	return new_liset
}

```

\_each를 사용함으로써 코드가 점점 간결해지고 for같은 명령적인 코드를 줄이고 보다 선언적인 코드 표현이 된다.

## 다형성

위 작성한 \_map, \_filter, \_each는 이미 Array에 메서드로 있는 함수들이다.

Array에 있는 map, filter, each는 함수가 아닌 메서드이다. 이 말은 순수 함수가 아니고 메서드는 객체 상태에 따라 결과가 달라지는 특징을 가지고있다.

방금 실습하면서 만든 언더스코어(\_map, \_filter ...) 와 같은 함수들과는 여러가지 면에서 차이가 있다.

메서드는 객체지향 프로그래밍이다. 메서드의 특징은 해당 클래스에 정의되기 때문에 해당 클래스의 인스턴스에서만 사용될 수 있는 특징이 있다.

```
const newArr = new Array(10).fill(1)
//newArr가 인스턴스

```

??? map, filter가 Array에서 사용하려고 만든 메서드인데 머선 말일까

JS에는 Array-llike Object(유사배열 객체)라는게 있다. 대표적으로 함수의 인자값들을 가져오는 arguments라는 예약어와 HTML에서 DOM을 다루기 위한 document.querySelector() 의 결과값이 유사배열 객체이다.

이런 유사배열 객체들은 map, filter와 같은 메서드를 사용할 수 없다.

객체지향의 특징인데 메서드는 해당하는 클래스에 준비되어있지 않은 메서드는 사용할 수 없다.

이러한 이유로 형을 다루기가 어렵다(다형성 지원이 어려울 수 있다)

```
function a() {
  console.log(arguments);
}

a(1, 2, 3);
//[Arguments] { '0': 1, '1': 2, '2': 3 }

function a() {
  console.log(arguments.map((el) => el ** 2));
}
a(1,2,3)
//arguments.map is not a function

```

하지만 함수가 기준이 되는 함수형 프로그래밍에서는 함수를 먼저 만들고 함수에 맞는 데이터를 적용하는 방식으로 프로그래밍을 하게 되는데, 이러한 작은 차이로 인해 높은 다형성을 만들 유연하고 실용적인 형태가 된다.

```
function _each(list, iter) {
  for (let i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

function _map(list, mapper) {
  let new_list = [];
  _each(list, function (val) {
    new_list.push(mapper(val));
  });

  return new_list;
}

function a() {
  console.log(
    _map(arguments, function (val) {
      return val ** 2;
    })
  );
}

a(1, 2, 3);
//[1,4,9]

```

\_map 함수를 수정하지 않고 arguments.map을 함수형으로 변경하기만 했는데 준비되어 있지 않은 arguments.map을 실용적으로 사용할 수 있게 되었다.

함수형 프로그래밍은 데이터가 있기 이전에 함수가 있지만 객체지향 프로그래밍은 데이터가 있어야 메서드가 있게된다.

함수형 프로그래밍은 평가 순서가 중요하지 않은 반면 객체지향 프로그래밍은 평가순서가 보다 중요하게 된다. 반드시 해당하는 객체가 생겨야 기능을 수행할 수 있기 때문이다.

반면 함수형 프로그래밍은 함수가 먼저 존재하기 때문에 데이터가 생기지 않더라도 평가 시점이 상대적으로 유연해진다. 그것을 이용해 조합성이 높은 코드를 만들 수 있다.
