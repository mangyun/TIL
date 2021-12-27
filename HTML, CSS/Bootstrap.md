## Bootstrap
웹페이지에 필요한 버튼, 메뉴, 탭, 모달, 카드 등 필수 요소들을 모아놓은 일종의 CSS 파일  

<br>


## 간단 설치방법 

https://getbootstrap.com/docs/5.1/getting-started/introduction/#starter-template   
방문 후 Starter Template 이라고 써있는 예제 코드를 새로운 HTML 파일에 복붙하면 끝

<br>

## Utility Class 
```html
<div class="container">이쁜 여백가진 박스</div>
<div class="mt-5">margin-top 쉽게 주기</div>
<div class="pb-5">padding-bottom 쉽게 주기</div>
<div class="fs-3">font-size 쉽게 주기</div>
<div class="text-center">text-align 쉽게 주기</div>
<div class="fw-bold">font-weight 쉽게 주기</div>
 
padding-left 는 ps-5 (start의 약자)
padding-right 는 pe-5 (end의 약자)
등 수백개가 있어서 더 찾고 싶으면 Bootstrap 홈페이지의 Utility class 메뉴로
```

## row, col
#### 반응형만들기 훨씬 수월해진다.
1. 같은 div 여러개의 col 클래스명을 넣어도 전혀 상관없다
2. Bootstrap을 사용하려면 PC말고 모바일 레이아웃부터 만드는게 훨씬 쉽다.
3. 전체 12등분인 이유는, 균일하게 6등분, 4등분, 3등분, 2등분하기 매우 쉽기때문이다.
```html
<div class="row">
  <div class="col-md-4"> 안녕 </div>
  <div class="col-md-4"> 안녕 </div>
  <div class="col-md-4"> 안녕 </div> 
</div>
```
col-4 중간에 md를 붙여주면된다. 이건 일종의 조건문인데
**"md 사이즈 혹은 그 이상에서만 4컬럼을 차지하게 해주십쇼"**라는 뜻이다.
md는 768px인 모바일사이즈이다. 홈페이지를 참고하자.  

<br>

## 좋은 코드의 원칙 2가지
1. 내가 짠 코드가 나중에 수정이 쉽고 관리가 쉬워지면 좋은 코드이다.

2. class활용이 용이한, 확장성이 좋으면 좋은 코드이다.

3. 양이 적으면 좋다. (선택사항)
 
 <br>

## Bootstrap 구축 팁
- 많은 부트스트랩 요소들은 사이즈가 em 으로 선언되었다.
fontsize로 한번에 div 박스를 알맞은 비율로 설정할 수 있다.

- ```<hr>``` 이라는 태그는 가로 선을 생성해준다.
```<div class="vr"></div>``` 이렇게 쓰면 세로선을 생성해주고, height 설정 가능하다.

- Bootstrap 홈페이지에 있는 ```<svg>``` 이런 식으로 정의된 아이콘은 용량을 훨씬 줄일 수 있다.

<br>

## 결론
#### Bootstrap을 사용하면 CSS 작성할 수고를 덜으니, 뭐든 빠르게 만들 수 있다.
