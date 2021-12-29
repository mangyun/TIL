### SASS
CSS를 조금 더 프로그래밍스럽게 작성하는 전처리 방법이다.
1. 웹브라우저는 CSS밖에 실행하지 못한다.
2. 따라서 SCSS파일을 CSS파일로 컴파일 시켜줘야한다.
3. VSC의 SCSS compiler를 이용한다.

SCSS를 아래와 같이 작성하고, 밑에 watch sass를 누르면 변환해준다.

```css
$메인컬러: #2a4cb2;
$기본사이즈: 16px;

.background {
  background-color: $메인컬러;
  font-size: $기본사이즈 - 2px;
}

.box {
  background-color: $메인컬러;
  font-size: $기본사이즈 + 2px;
}  
```

#### 참고
1. SASS없이 그냥 CSS 파일에도 var() 이걸 이용해서 변수문법을 사용가능하다,
2. 그냥 CSS 파일에서도 calc() 라는 함수를 이용하면 사칙연산을 사용가능하다.

### 결론
CSS에서도 변수, 사칙연산등 가능하지만, SASS가 더 직관적이고 편하다.

### SASS 핵심문법
scss와 sass 파일 차이
sass에서는 중괄호가 없다

#### nesting
같은 클래스 묶는다. 오히려 더 복잡해질 수도 있어서 잘 쓰진 않는다.
```css
.navbar {
  ul {
    width : 100%;
  }
  li {
    color : black; 
  }
}
hover는 &:hover 식으로 사용한다.
```

#### @extend
하나의 클래스 자체를 변수처럼 복사한다.  
아래 mixin보다 쓰기 편하다.
```css
%div { //%는 임시클래스 기호이다.
  width: 200px;
  height: 200px;
  padding: 20px;
}

.div-green {
  @extend %div;
  background-color: green;
}
.div-red {
  @extend %div;
  background-color: red;
}
.div-blue {
  @extend %div;
  background-color: blue;
}
```

#### @mixin
@include를 사용해, 긴 코드 자체를 변수처럼 복사한다.  
@extend과 달리, 속성을 줄 수 있다.
```css
@mixin 버튼기본디자인($구멍) {
  font-size : 16px;
  padding : 10px;
  background : $구멍;
}

.btn-green {
  @include 버튼기본디자인(#229f72);
}
```

#### @use
@use 'reset.scss';  
이러면 reset.scss 파일을 해당 SCSS파일에 전부 복붙할 수 있다.  
파일이 다른 폴더 안에 있다면 '폴더명/reset.scss' 이런 식으로 경로를 잘 써주자.  
@use '_reset.scss';  
언더바 _기호를 파일명 맨앞에 사용하면, "이 파일은 CSS파일로 따로 컴파일하지 말아주세요" 라는 의미다.

다른 scss 불러와보기
```css
@use '_reset.scss';
reset.$변수명;  //다른 파일의 변수쓰는법
@include reset.mixin이름();  //다른 파일의 mixin쓰는법
```
이 경우엔 그냥 쓰는게 아니라 꼭 파일명을 앞에 붙여야한다.    
응용하면 다른 파일에서 자주 사용할법한 _button.scss _navbar.scss 이런 파일들을 미리 다 만들어놓고, 멋지게 첨부식으로 CSS를 개발할 수 있다.  
단, 파일 경로만 조심하자.



### video 다루기
```html
<video class="video-container" autoplay muted loop>
  <source src="img/bridge.mp4" type="video/mp4">
  <source src="img/bridge-m.webm" type="video/mp4">//위에꺼 안되면 이거 재생
</video>
```
muted는 음소거상태  
autoplay는 자동재생 (muted와 함께 넣어야 동작함)  
poster는 썸네일이미지  
preload는 영상을 먼저 다운을 받을지 말지를 선택가능(auto, metadata, none 사용가능)


### transform 애니메이션
```css
.box {
  transform : rotate(10deg); //회전
  transform : translate(10px, 20px); //좌표이동
  transform : scale(2); //확대축소
  transform : skew(30deg); //비틀기
 
  /*transform 두개 이상을 한꺼번에 쓰려면*/
  transform : rotate(10deg) translateX(30px);
}
```

### @keyframes
transtion이외로 복잡한 애니메이션을 구현할 수 있다.
1. 가장 먼저 @keyframes를 정의한다.
```css
@keyframes 움찔움찔{
  0% {
    transform : translateX(0px); /* 애니메이션이 0%만큼 동작시 */
  }
  50% {
    transform : translateX(-20px); /* 애니메이션이 50%만큼 동작시 */
  }
  100% {
    transform : translateX(20px); /* 애니메이션이 100%만큼 동작시 */
  }
}
```

2.keyframes를 원하는 곳에 첨부한다.
```css
.box:hover {
  animation-name : 움찔움찔; //꼭 필요한 name속성
  animation-duration : 1s; // 꼭 필요한 시간속성
  animation-timing-function : linear; //베지어 주기
  animation-delay : 1s; //시작 전 딜레이
  animation-iteration-count : 3; //몇회 반복할것인가
  animation-play-state : paused;  //애니메이션을 멈추고 싶은 경우 자바스크립트로 이거 조정
  animation-fill-mode: forwards;  //애니메이션 끝난 후에 원상복구 하지말고 정지
}
```

#### margin, width, left 말고 transform 쓰는 이유
브라우저에서 html css를 그래픽으로 바꿀 때, layout 잡기 -> 색칠하기 -> transform 적용하기 순서로 동작한다.   
layout이 바뀌면 layout부터 다시 렌더링해야하는데, transform이 바뀌면 transform 부분만 다시 렌더링하면 된다.   
그래서 뭔가 이동시키고 싶으면 margin 쓰는 것보다 transform 쓰는게 빠르게 동작한다.

### 성능개선방법
1. will-change
```css
.box {
  will-change: transform;
}
```
애니메이션을 주는 .box가 약간 느리게 동작한다면,  
will-change : 애니메이션줄속성;  
바뀔 내용을 미리 렌더링해주는 속성이라, 성능개선이 가능하다.  
이상하게 많이 쓰면 브라우저 자체가 더 느려질 수 있어서, 이상하게 버벅일때 사용해주자.  

2. 하드웨어 가속
```css
.box {
  trans
  form: translate3d(0, 0, 0);
}
```
애니메이션이 너무 많아 CPU만으로 전부 연산이 불가능하다면, GPU의 도움을 받을 수 있다.  
그래서 translate3d(0, 0, 0) 이런 식으로 아무데도 움직이지 않는 3D 이동명령을 주고, 뒤에 필요한 transform을 더 적용한다면, 
GPU를 이용해서 .box가 가진 transform 속성들을 연산할 수 있다.

