### this의 4가지 의미
#### this는 가장 가까운 function안에서 매번 바뀐다고 알아두자.  
1. window 그자체  
그냥 쓰거나 일반 함수안에서 쓰면 window  
왜냐하면 함수나 변수를 전역공간에서 만들면 js는 window라는 객체에 저장하기 때문이다.  
```js
function 함수() {
        console.log(this)
    }
    //둘은 같다.
    함수();
    window.함수();
```

2. 오브젝트 그자체
```js
let 오브젝트 = {
        data: 'kim',
        함수: function() { //오브젝트 안에, 함수도 넣을 수 있다.
            console.log(this) //메소드 안에서 this를 쓰면, 그 함수를 가지고 있는 오브젝트 그자체.
        }
    }
오브젝트.함수(); //사용하기 위해서, ()를 붙여야함.

1, 2를 종합하면 그 객체 자체이다.
```
3. 기계안에서 새로 생성되는 오브젝트이다.
```js
function 기계() {
     this.이름 = 'kim'
}
let 오브젝트 = new 기계();
```

4. 이벤트리스너에서의 this
```js
document.getElementById('버튼').addEventListener('click', function(e) {
        //셋은 같다.
        this;
        e.currentTarget;
        document.getElementById('버튼')
    });
```

### 참고
```js
'use strict'; //엄격하게 사용한다. 변수를 무조건 제대로 선언해야한다.
function 생략
  함수(){ // function을 생략하는 신문법
            console.log(this) //객체 그 자체 this
   }
```

### this 예시
this의 경우를 파악해보며 만든 예시다.
1. 콜백은 일반함수
```js
document.getElementById('버튼').addEventListener('click', function(e) {
        let 어레이 = [1, 2, 3];
        어레이.forEach(function(a) { //함수안에 들어간 함수 = 콜백함수
            console.log(this) //콜백인 일반함수에 안에서 쓰였으므로 window다.
        });
    });
```

2. this 구별
```js
let 오브젝트 = {
        이름들: ['김', '이', '박'],
        함수: function() {
            console.log(this)//객체 자체인 오브젝트 출력
            오브젝트.이름들.forEach(function() {
                console.log(this) //그냥 일반함수 이므로, window 출력
            })
        }
    }
```
3. 간단한 메소드 만들기
```js
let 사람 = {
            name: '손흥민',
            sayHi() { //function없이 표현할 수 있다.
                console.log(`안녕 나는 ${this.name}`)
            }
        }
        사람.sayHi(); //안녕 나는 손흥민
```
4. 오브젝트 내의 데이터를 전부 더해주는 메소드 만들기
```js
var 자료 = {
        data: [1, 2, 3, 4, 5]
    }
    자료.전부더하기 = function() {
        let sum = 0;
        this.data.forEach(function(a) { //여기서 this는 메소드 앞의 주인같은 느낌이다.
            sum += a;
        })
        console.log(sum)
    }
    자료.전부더하기();
```
5. setTimeout 이용해보기
```js
document.getElementById('btn').addEventListener('click', function() {
	console.log(this.innerHTML) //버튼입니다.
        setTimeout(() => {
            console.log(this.innerHTML) //위와 동일, arrow function이라 바깥의 가장 가까운 this, 아래 참고
        }, 1000)
    });
```

<br>


### arrow function
```js
let 오브젝트 = {
        이름들: ['김', '이', '박'],
        함수: function() {
            console.log(this)//객체 자체인 오브젝트 출력
            오브젝트.이름들.forEach(() => { //arrow function
                console.log(this) //arrow function은 바깥의 가까운 오브젝트를 그대로 사용
            })
        }
    }
```

### 참고
#### 함수 본연의 기능  
1. 코드들을 기능으로 묶고 싶을 때 사용  
2. 입출력 기계를 만들고 싶을 때 사용  

### arrow function의 장점
1. 입출력 기계 만들 때 보기 쉬움
```js
let 함수 = (a) => { return a + 10};
    함수(5);
```
2. 파라미터 1개면, 소괄호 생략가능
```js
 let 함수 = a => { return a + 10};
    함수(5);
```
3. return이 1개면, 중괄호도 생략가능
```js
 let 함수 = a => return a + 10 ;
    함수(5);
```


### arrow function 예시
1. forEach 콜백함수
```js
[1, 2, 3, 4].forEach(function(a) {
        console.log(a);
    })

위에 식이, 아래처럼 바뀐다.
```

```js
[1, 2, 3, 4].forEach(a => console.log(a));
```

2. 이벤트리스너
```js
document.getElementById('버튼').addEventListener('click', (e) => {
        this; //window다. arrow function이라, 바깥에 있던 this값을 내부에서 그대로 사용
    });
```

3. 오브젝트 안의 함수
```js
let 오브젝트 = {
        함수 : () => {
            this; //window다. 마찬가지로 바깥에 있던 window인 this를 그대로 사용한다. 
        }
    }
```
