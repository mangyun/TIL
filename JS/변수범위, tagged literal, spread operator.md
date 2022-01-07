### 변수 총 정리
- var 재선언, 재할당 둘다 가능, 범위는 함수
- let 재할당만 가능, 범위는 중괄호
- const 둘다 안됨, 범위는 중괄호 - 하지만 object일때, 내부 값은 변경해도 괜찮다.

#### 참고
Object.freeze(오브젝트); //오브젝트를 내부까지 아예 수정 불가능하게

### Hoisting
변수나 함수의 선언부분만 맨위로 끌고오는 현상(js 언어 자체가 그럼)
```js
//let age; - 호이스팅되어 let age;가 먼저 맨위에 생긴다.
console.log(age); //undefined
let age = 30; //호이스팅되어 age = 30;이 된다.
console.log(age); //30
```

### 전역변수 만들 때 팁
1. 그냥 변수나 함수를 맨 위에서 선언한다.
2. window를 붙인다. 개발할 때, 직관적이라 주로 권장한다. //window.변수, window.함수 = function (){} 같이 


### 변수 예시
1. const, let은 엄격
```js
함수();
function 함수() {
  //let 안녕; - 호이스팅
  console.log(안녕); //에러, 선언과 할당 사이에 시간차가 있기 때문에, var와 달리 자동으로 undefined가 할당안됨
  let 안녕 = 'Hello!';
} 
```

2. 함수의 선언부분
```js
//var 함수; - 호이스팅
함수();// 함수가 아닌것에 소괄호를 치면 에러이다.
var 함수 = function() {
  console.log(안녕); //에러, 함수의 선언부분인 var 함수;만 호이스팅된다.
  var 안녕 = 'Hello!';
} 
```

3. 참조
```js
let a = 1;
var b = 2;
window.a = 3; //let은 global 전역변수 window보다는, 더 범위가 작고 가까운 1을 참조한다.
window.b = 4; //var는 그대로 재할당한다고 생각하자.
console.log(a + b); //5
```

4. 반복문
```js
//var i =5; - 반복문이 다 실행되고 전역변수로 남아있다.
for (var i = 0; i < 5; i++) { 
  setTimeout(function() { console.log(i); }, i*1000 ); // 5 다섯번, 반복문은 이미 1초미만으로 끝났다.
}
따라서 let i로 선언한다면,
for (let i = 0; i < 5; i++) { 
  //let i = 0; - 반목문이 실행될 때, 변수가 지역변수로 생긴다.
  setTimeout(function() { console.log(i); }, i*1000 ); // 0 1 2 3 4, 지역변수 i를 정상적으로 가져온다.
}
```


<br>





### tagged literal
쉽게 문장을 해체해서 활용, 대체할 수 있다.
1.\`\`백틱을 이용한다.  
2. 함수를 정의하고, 함수 \`문장\`으로 구현한다.  

ex) 문장 해체분석기
```js
var 변수 = '손흥민';
function 해체분석기(문자들, 변수들){
  //문자들[0] = 안녕하세요
  //문자들[1] = 입니다
  //변수들 = 손흥민
  console.log(문자들[1] + 변수들 + 문자들[0]); 
}
해체분석기`안녕하세요 ${변수} 입니다`; //입니다손흥민안녕하세요 - 순서대로 조합했다. 
```


<br>



### spread operator
- 괄호를 제거해주며, deep copy할때 주로 사용한다.
- 대, 중, 소괄호 안에서만 사용가능하다.

#### 참고
deep copy - 배열끼리 값 공유 안되게 새 주소에 복사
shallow copy - 배열끼리 값이 공유되는 기존 주소에 복사

1. array에 붙이면 대괄호를 제거해준다.
```js
var 어레이 = ['hello', 'world'];
console.log(...어레이); //hello world
```

2. 문자에 붙이면, 역시 대괄호를 제거해준다.
```js
var 문자 = 'hello';
console.log(...문자); //h e l l o, 문자는 array와 비슷한 형식이다.
```


### 자주 쓰는 활용
1. array를 합치기 / 복사
```js
var a = [1, 2, 3];
var b = [3, 4, 5];
var c = [...a]; //[1, 2, 3] - 배열끼리 값 공유안되게 deep copy 해준다.
var d = [...a, ...b]; //[1, 2, 3, 3, 4, 5] - array는 중복가능
```

2. object 합치기 / 복사
```js
var o1 = { a : 1, b : 2};
var o2 = { a : 3, ...o1 };
console.log(o2); // { a : 1, b : 2 } - 기존 a : 3은 중복이라, 1로 교체된다.
```

3. 함수 파라미터 넣을 때
```js
function sum(a,b,c){
   console.log(a + b + c)
}
var array= [10, 20, 30];
sum(...array);  //요즘방식, 함수를 호출할 때, 원소를 편하게 넣는다.
sum.apply(undefined, array); //옛날방식, apply를 이용한다. 밑에 참고
//비워두면 문제가 생겨서, 아무곳에도 적용하지 않는 undefined에 넣는다. 
```

### 중요
#### apply와 call
예로, person메소드를 실행하는데, 저기 person2에다가 적용해서 실행해준다.
```js
var person = {
    인사 : function(){
      console.log(this.name + '안녕')
    }
}
var person2 = {
    name : '손흥민'
}

//둘다 손흥민안녕
person.인사.apply(person2, [1,2,3]); //apply는 파라미터로 array를 넣는다.
person.인사.call(person2, 1,2,3); //call은 파라미터로 데이터 자체를 넣는다.
```
