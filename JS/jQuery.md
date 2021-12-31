### JS  
#### js의 목적  
팩트는 html 조작과 변경이다.
```html
<h3 id="hello">안녕하세요</h3>  
document.getElementById('hello').innerHTML = '바보';  
문서를,    id가 hello인 애를 읽어,  안의 html을 바보로 바꾼다.
```
#### defer
script는 html요소들보다 아래에 있어야 한다.

#### UI 만드는 법칙
1. HTML, CSS으로 미리 UI 디자인을 해놓는다.
2. UI를 평소엔 안보이게 숨겨놓는다.
3. 버튼을 누르거나할 경우 UI를 보여준다.

#### function
긴 코드를 깔끔하게 한 단어로 축약한다.
```js
function 알림창열기() {
            document.getElementById('alert').style.display = 'block';
        }
```

#### 파라미터
해당 function에 구멍같이 변수를 넣을 수 있다.
```html
<div class="alert-box" id="alert">
  <p id="title">Alert 박스</p>
  <button onclick="닫는기능"> X </button>
</div>
<button onclick="알림창1열기('아이디입력하셈')">버튼1</button>
<button onclick="알림창1열기('비번입력하셈')">버튼2</button>
```

#### 이벤트
HTML 문서에서 클릭, 스크롤, 키보드입력, 드래그등을 할 수 있다.  
https://developer.mozilla.org/en-US/docs/Web/Events
```js
document.getElementById('close').addEventListener('click', function(){
    document.getElementById('alert').style.display = 'none'
});
```

<br>

### jQuery
js코드를 짧게 쓸 수 있는 라이브러리
```js
<script
  src="https://code.jquery.com/jquery-3.5.1.min.js"
  integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
  crossorigin="anonymous"></script>
```

#### 쓰는이유
1. 코드가 매우 짧아진다.  
HTML 변경하는 문법, 이벤트리스너 문법이 매우 짧아진다.
2. 여러개의 요소를 짧고, 한번에 바꿀 수 있다.
```js
document.getElementsByClassName('greeting')[0].innerHTML = '안녕';
document.getElementsByClassName('greeting')[1].innerHTML = '안녕';
document.getElementsByClassName('greeting')[2].innerHTML = '안녕';
```
일반 js면 위에처럼 길어지지만, jQuery면 아래처럼 가능하다.
```js
$('.greeting').html('안녕') //class ="greeting"을 다 바꿔줌
$('.greeting').eq(0).html('안녕') //그 중 처음꺼만 바꿔줌
$('.btn').on('click', function(){ 버튼누르면 실행할 코드~~ } ); //리스너를 편하게 단다.
```

3. 몇몇 애니메이션을 쉽게 쓸 수 있다.  
css나 js로 여러줄로 구현할 것을, jQuery 한줄 컷이다.
```js
$('.greeting').hide() //사라지기
$('.greeting').fadeOut() //서서히 보이기
$('.greeting').slideUp() //접어올리기
$('#nav-sub-button').click(function(){ //on.('click)을 click만으로 대체가능
            $('.nav-sub').slideToggle(); // toggle은 버튼 누를때마다 전환
        });
```

<br>

### 설계 팁
무조건 한글로 먼저 설계하고, 코딩하자!
```js
//전송되는 이벤트일때,
//만약에 이메일에 빈칸이나 공백이라면,
//전송 막고, 안내문 띄움.
        $('form').on('submit', function(e) {
            if ($('#email').val() == '') {
                e.preventDefault();
                $('#email-alert').show();
            }
```

<br>

### input과 함께 자주 사용되는 이벤트
input, select, textarea 등에 사용할 수 있는 change, input 이벤트가 있다.
1. input - 값이 바뀔때마다 실행
```js
$('#email').on('input', function(e){ 
  실행할 코드
});
```

2. change - 포커스를 잃었을 때(커서가 다른곳에 찍힐 때) 실행
```js
$('#email').on('change', function(e){ 
  실행할 코드
});
```

<br>

### animate
js에서 css를 조정하면서 애니메이션을 줄 수 있다.
```js
$('#show-menu').click(function(){
           $('.left-menu').animate({marginLeft : '0px'});
        });
```

#### 애니메이션 개발순서
1. 시작/최종화면 만들기
2. 자바스크립트로 트리거
3. 요즘은 스무스하게 css로 만들기(js의 anmiate는 느리다.)

jQuery 함수를 순서대로 동작
```js
$('.black-background').show().animate({ marginTop : '0px' }); //메소드 chaining시킨다.
```

각기 다른 요소를 차례로 동작
```js
$('이 요소').animate({ width: '250px'}, 1000, function() { //세 번째 파라미터로 function(){}을 써준다.
  $('저 요소').animate({ height : '500px'}  });
});
```

### 애니메이션 개발팁
1. animate() 말고 CSS transition을 쓰자. - 빠르고, 훨씬 더 쉽기 때문이다.
2. margin 말고 transform 속성을 쓰자. - margin, width, left 이런 레이아웃 요소들은 렌더링시간이 오래 걸린다.
3. 최종화면으로 변하는건 class를 붙이는 방식으로 개발하자. - 수정도 쉽고, 재활용도 쉬워진다.
```js
$('#login').click(function() {
          $('.black-background').addClass('slide-down'); //addClass()하면, 따로 만들어놓은 slide-down 클래스가 추가된다.
        });
```