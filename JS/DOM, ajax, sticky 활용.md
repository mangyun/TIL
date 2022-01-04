### DOM
JS가 HTML에 대한 정보들 (id, class, name, style, innerHTML 등)을 Object 자료형으로 정리하는 개념이다.
따라서 DOM이 생성되기전에 JS를 호출하면 에러가 난다.

#### 1. jQuery의 ready 리스너
p가 나중에 생성되도 에러가 나지 않는다.
```html
<script>
  $(document).ready(function(){
    document.getElementById('test').innerHTML = '안녕'
  });
</script>
<p id="test">임시글자</p>
```

#### 2. load 리스너
이미지 등 로딩이 완료되면 뭔가 동작시켜주는 UI들을 만들 때 자주 쓰인다.
```js
$(document).on('load', function(){
  //이미지가 다 로드가 되었을 경우 실행할 코드 
});
```
참고로 $('').load(function(){})는 다른의미이며, Ajax용으로 쓰인다.

#### 3. 일반JS의 ready 리스너
```js
document.addEventListener('DOMContentLoaded', function() {
  //DOM생성이 완료되었을 때 실행할 코드 
});
```
<br>


### ajax
#### 서버
접속자가 요청을 하면 데이터를 가져다준다.

#### 요청 종류
GET - URL을 입력해서 요청한다. (주로 읽기)
POST - 숨겨서 정보를 전달하거나 요청한다.(주로 쓰기)

#### ajax
서버에다가 GET/POST 요청을 할 수 있게 도와주는데, 새로고침없이 요청한다.
보통 jQuery를 많이 사용한다.

<상품 보여주기 전>
![](https://images.velog.io/images/qk1890/post/041e7a5c-d20e-4df2-8fb6-bd967460088d/image.png)
<상품 보여주기 후>
![](https://images.velog.io/images/qk1890/post/2d142651-456e-49a1-8ff5-2ad60dce61b0/image.png)
```js
$('#ajax-btn').click(function() {
            $.ajax({
                url: 'https://mangyun.github.io/data.json',
                type: 'GET'
            }).done(function(data) { //요청에 성공하면, 실행
                $('.card-title').html(data.model);
                $('.card-text').html(data.price);
                $('.card-img-top').attr('src', data.img); //경로변경 attr 호출
            }).fail(function() {}) //요청에 실패하면, 실행
            }).always(function() {}) //항상 실행
```
done, fail, always 이외로 세부기능이 더 많다.
url을 어디로 요청하는지는 서버개발자에게 물어보자.




<br>

### sticky 활용하기
스크롤 높이에 따라 opacity와 size를 서서히 변하게 해보자.
<위로 스크롤 전>
![](https://images.velog.io/images/qk1890/post/429c7f09-aad7-47f2-811f-a90a44d4ec0f/image.png)
<위로 스크롤 후>
![](https://images.velog.io/images/qk1890/post/ef8f28aa-4dff-4599-bdab-6adbd84bd5b2/image.png)
#### 1. 일단 sticky 속성과 위치를 조정한다.
```css
.card-box {
    position: sticky;
    top: 400px;
    margin-top: 200px;
    transition: transform .2s;
}
```
#### 2. 높이에 따라 opacity와 scale 좌표를 생각해본다.
- 650px 쯤 스크롤하면 opacity를 1로, 1150px 쯤 스크롤하면 opacity를 0으로 설정한다.
- opacity 좌표 (650, 1), (1150, 0)인 2개가 나온다.
- 650px 쯤 scale 변수는 1로, 1150px 쯤 변수는 0.9로 설정한다.
- scale 좌표 (650, 1), (1150, 0.9)인 2개가 나온다

#### 3. 좌표로 1차 함수 계산해, 서서히 변하는 것을 각각 나타낸다.
```js
 $(window).scroll(function() {
            let height = $(window).scrollTop();
            
            let y = (-1 / 500) * height + (115 / 50); //좌표로 구한 opacity 함수
            $('.card-box').eq(0).css('opacity', y);
            
            let z = (-1 / 5000) * height + 565 / 500; //좌표로 구한 scale 함수
            $('.card-box').eq(0).css('transform', `scale(${z})`);
  });
```
