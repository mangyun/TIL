### 이벤트 버블링
어떤 HTML 태그에 이벤트가 발생하면, 그의 모든 상위요소까지 이벤트가 실행되는 현상이다.  
ex) black-background만 눌렀을 때, 창 닫히게 하기
```html
 <div class="black-background ">
        <div class="white-background">
            <p>로그인하세요</p>
                 <input type="text">                 
 <script>
        $('.black-background').click(function(e) {
            if (e.target == this) //이 target을 지정하는 부분이 없다면, p나 input을 눌러도 창이 닫힌다.
                $('.black-background').hide();
        });
 </script>
 ```
생각치도 못한 오류가 생기는 것이니, 주의하자!!

### 참고
```js
 if (e.target == this) //js문법 == js 문법이 와야한다.
e.target은 js문법이고, $를 한다면 jQuery문법이기 때문에, $(this) 이렇게하면 실행이 안된다.
$('.black-background').click(function(e){
  e.target; //지금 실제 클릭한 요소
  e.currentTarget; //this와 같다. 현재 이벤트리스너가 달린 곳
  e.preventDefault(); //기본동작을 아예 막아버릴때 사용
  e.stopPropagation(); //내 상위요소로의 이벤트 버블링을 중단할때 사용
});
```

<br>

### 이벤트 버블링 응용
버블링을 응용해서, 상위요소에 이벤트 리스너를 단다.  
그러면 코드양이 줄고, 반복문 안쓸 수도 있고, 컴퓨터의 자원인 램을 덜 사용할 수 있다.
![](https://images.velog.io/images/qk1890/post/b9f0300b-69aa-4c37-b9bd-2c6bd8f372eb/image.png)
![](https://images.velog.io/images/qk1890/post/48ad6f8c-91b5-43dd-9f34-92020d44d9d2/image.png)
#### 1. 일단 tap기능을 함수로 만들자.
```js
function openTap(number) {
            $('.tab-button').removeClass('active'); //일단 위에 주황색 선을 다 없앤다
            $('.tab-content').removeClass('show'); //일단 tab 내용이 다 안보이게 설정한다.
            $('.tab-button').eq(number).addClass('active'); //해당 tab을 누르면 위에 주황색 선 설정한다.
            $('.tab-content').eq(number).addClass('show'); //해당 tab을 누르면 내용이 보이도록 설정한다.
        }
        ```

#### 2. 현재 클릭한 자바 문법 e.target에 document.querySelectorAll로 비교한다.
```js
$('.list').click(function(e) {
           if(e.target == document.querySelectorAll('.tab-button')[0]){
               openTap(0);
           }
	if(e.target == document.querySelectorAll('.tab-button')[1]){
               openTap(1);
           }
	if(e.target == document.querySelectorAll('.tab-button')[1]){
               openTap(1);
           }
  ```
#### 그런데 dataset을 이용하면, 더 쉽게 개발이 가능하다.

<br>

### dataset 이용
html 요소에 몰래 정보를 저장해두는 dataset 문법을 이용하자.
#### 1. 일단 html 요소에 data-id="정보"로 정보를 저장한다.
```js
<ul class="list">
            <li class="tab-button " data-id="0">Products</li>
            <li class="tab-button active" data-id="1">Information</li>
            <li class="tab-button " data-id="2">Shipping</li>
        </ul>
```
#### 2. 그리고 현재 e.target의 dataset.id가 파라미터가 된다.
```js
$('.list').click(function(e){ 
  openTap(e.target.dataset.id) 
});
```
따라서 잘 활용한다면, 반복문이나 조건문이 필요가 없어진다.
