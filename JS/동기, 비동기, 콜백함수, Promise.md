
### 동기
1. 한번에 코드 한줄씩 차례차례 실행되는 방식
2. 그냥 거의 대부분의 프로그래밍 언어들은 이런 특징을 가지고 있다.

### 비동기
1. 실행이 오래걸리는 그런 코드들은 잠깐 대기실에 제쳐두고, 실행이 바로바로 가능한 코드들부터 처리하는 방식   
2. js 언어 자체의 기능이 아니라, js의 실행을 도와주는 웹 브라우저 덕분에 가능하다.

#### 예시)
```js
console.log(1);
setTimeout(function(){}, 1000);
console.log(2);
보통 프로그래밍언어 - 1과 2가 콘솔창에 동시에 출력
js - 이전에 있듯이, ajax 요청, 이벤트리스너, setTimeout 이런 코드는 제쳐두고 실행
```




### 콜백함수
별거없고 그냥 함수안에 들어가는 함수 

#### 문제) js에서 1초 후에 코드를 실행하고 싶으면 어떻게 할까?
```js
console.log(1);
setTimeout(function(){
  console.log(2);
}, 1000);
console.log(3);
// 1과 3이 먼저 빠르게 출력 후, 1초 후에 2 출력
```

#### 콜백함수 디자인하는 법
1. 이렇게 미리 만들어놓은 함수를 집어넣을 수도 있고
```js
function 첫째함수(콜백){
  console.log(1);
  콜백();
}

function 둘째함수(){
  console.log(2)
}

첫째함수(둘째함수);
```

2. 직접 함수선언문을 집어넣을 수도 있다.
```js
첫째함수(function(){
  console.log(2)
})
```

<br>

### Promise 디자인 패턴(ES6 신문법)
1. 그저 콜백이 여러개 사용된 코드의 길어지고 이쁘지 않은 문제를, 해결하는 디자인 문법
2. 쉽게 정의하자면, 성공&실패 판정기계이다.
```js
var 프로미스 = new Promise(function(성공, 실패){
  성공();//성공했음
});

프로미스.then(function(){ //성공한다면 실행

}).catch(function(){ //실패한다면 실행

});
```

예시1. 힘든 수학연산 성공 후에 특정 코드를 실행하려면?
```js
var 프로미스 = new Promise(function(성공, 실패){
  var 어려운연산 = 1 + 1; // 2
  성공(어려운연산); //성공한다면 2를 전해준다.
});

프로미스.then(function(결과){ //2를 가져와서
  console.log('연산이 성공했습니다 ' + 결과)// 연산이 성공했습니다 2 출력
}).catch(function(){
  console.log('실패했습니다')
});
```

예시2. 1초 대기 성공 후에 특정 코드를 실행하려면?
```js
var 프로미스 = new Promise(function(성공, 실패){
  setTimeout(function(){ //1초뒤에 성공
    성공();
  }, 1000);
});

프로미스.then(function(){
  console.log('1초 대기 성공했습니다') //1초뒤, 출력
}).catch(function(){
  console.log('실패했습니다')
});
```


### Promise 특징
1. 일단 new Promise()로 생성된 변수를 콘솔창에 출력해보면, 현재 상태를 알 수 있다.  
성공/실패 판정 전 - ```<pending> ```  
성공 후엔 - ```<resolved>```  
실패 후엔 -``` <rejected> ```  
이렇게 프로미스 오브젝트들은 3개 상태가 있다.  
참고로 성공을 실패나 대기상태로 다시 되돌릴 순 없다.   

2. Promise는 동기를 비동기로 만들어주는 코드가 아니다.   
Promise는 비동기적 실행과 전혀 상관이 없다.  
그냥 코딩을 예쁘게 할 수 있는 일종의 디자인 패턴이다.  
예를 들면, Promise 안에 10초 걸리는 어려운 연산을 시키면 10초동안 브라우저가 멈춘다.  
10초 걸리는 연산을 해결될 때까지 대기실에 제껴두고 그런거 아니다.   
(그냥 원래 js는 평상시엔 동기적으로 실행이 되며, 비동기 실행을 지원하는 특수한 함수들 덕분에 가끔 비동기적 실행이 될뿐이다.)   

#### 예시1. 이미지로딩 체크하는 Promise 만들기
```js
<body>
    <img id='test' src="https://mangyun.github.io/kona.jpg" alt="">
</body>

<script>
    var 이미지로딩 = new Promise(function(성공, 실패) { //promise 디자인
        var img = document.querySelector('#test'); //이미지를 받아와서
        img.addEventListener('load', function() { //로드가 된다면, 성공했어요
            성공();
        });
        img.addEventListener('error', function() { //로드가 실패하면, 실패했어요
            실패();
        });

    });

   //promise 처리
    이미지로딩.then(function() {
        console.log('성공했어요')
    }).catch(function() {
        console.log('실패했어요')
    })
</script>
```

#### 예시2. Ajax 요청/실패 알려주는 Promise 만들기(fetch는 호환성이 안좋음)
```js
var 인사말 = new Promise(function(성공, 실패) { //Promise 생성
        $.get('https://mangyun.github.io/hello.txt').done(function(결과) { //ajax 두번째 방식
            성공(결과); //결과 전달
        });
    });

    인사말.then(function(결과) { //결과를 그대로 받아서
        console.log(결과); //안녕하세요 반갑습니다. 출력
    })
```

### 참고 - ajax의 두가지 방식
```js
$.ajax({ //첫번째
  type : 'GET',
  url : 'URL 경로'
}).done(function(결과){
  console.log(결과);
});

$.get('URL 경로').done(function(결과){ //두번째
  console.log(결과)
});
```

#### 예시3. Promise 연결
then은 return new Promise()로 생성된 오브젝트에만 붙일 수 있다.
```js
var 인사말 = new Promise(function(성공, 실패) { //Promise 생성
        $.get('https://mangyun.github.io/hello.txt').done(function(결과) { //ajax 두번째 방식
            성공(결과); //결과 전달
        });
    });

    인사말.then(function(결과) { //결과를 그대로 받아서
        console.log(결과); //안녕하세요 반갑습니다. 출력
        return new Promise(function(성공, 실패) { //return new Promise()으로 연속으로 다른 파일을 출력할 수 있다.
            $.get('https://mangyun.github.io/hello2.txt').done(function(결과) {
                성공(결과);
            });
        });
    }).then(function(결과) {
        console.log(결과); //두번째 인사말입니다. 출력
    })
```

코드가 너무 보기 안좋아서, 함수를 만들자.
```js
 var 인사말 = ajax요청함수('https://mangyun.github.io/hello1.txt')

    인사말.then(function(결과) {
        console.log(결과); //안녕하세요 반갑습니다. 출력
        return ajax요청함수('https://mangyun.github.io/hello2.txt')
    }).then(function(결과) {
        console.log(결과); //두번째 인사말입니다. 출력
    })

    //ajax 요청함수 따로 만듦
    function ajax요청함수(url) {
        new Promise(function(성공, 실패) {
            $.get(url).done(function(결과) {
                성공(결과);
            });
        });
    }
```

    


<br>




### async / await
Promise가 어렵다면 그보다 쉽게 쓸 수 있는 ES8 문법
async function 더하기(){ // 그냥 간단하게 함수앞에 async만 붙이면 된다.
```js
  var 어려운연산 = new Promise((성공, 실패)=>{
    실패();
  });
  try {  var 결과 = await 어려운연산 } //await은 무조건 async 함수 내부에서 사용해야 한다.
  catch { 어려운연산 Promise가 실패할 경우 실행할 코드 } //실패할 경우를 대비해, catch문 이용
}
더하기() //함수 호출
  ```

예시1. async, await로 ```<button>```을 누르면 성공하는 Promise 만들기  
```js
<body>
<button id="test">버튼</button> 
</body>

<script>
  var 프로미스 = new Promise(function(성공, 실패){ //버튼을 클릭하면 성공으로
      document.getElementById('test').addEventListener('click', function(){
        성공('성공했어요');
      });
  })
  async function 버튼누르기(){ //함수에 async 사용
   try{
    var 결과 = await 프로미스; //프로미스로 넘어가서 await으로 기다려준다.
    console.log(결과); //성공했어요 출력
   } catch {  console.log('실패했어요'); } //실패했을 경우
 }

  버튼누르기(); //함수 호출
</script>```
