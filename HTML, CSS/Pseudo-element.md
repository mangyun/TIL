### Pseudo-element
html 특정부분에 스타일링할 수 있다.
굳이 많이 쓰이지는 않지만, 아래의 shadow dom을 위해 ::사용법을 알아놓자.

```css
 .text::first-letter {
  color : red;
}

.text::first-line {
  color : red;
}

.text::after {
  content : '뻥이지롱';
  color : red;
}

.text::before {
  content : '뻥이지롱';
  color : red;
}
```
1. pseudo-element를 선택하려면 콜론 2개 :: 를 사용하면 된다. 

2. ::first-letter라고 붙이면 안에 있는 글자 중 첫 글자만 스타일을 줄 수 있다.
3. ::first-line이라고 붙이면 안에 있는 글자 중 첫 줄만 스타일을 줄 수 있다.

4. ::after라고 붙이면 내부의 맨 마지막 부분에 특정 글자같은걸 추가해줄 수 있다.

5. ::before라고 붙이면 내부의 맨 앞 부분에 특정 글자같은걸 추가해줄 수 있다.


<br>

#### Pseudo-element로 clear : both 박스 편하게 만들기
배치하려 float: left;등을 사용했다면,
```css
.box::after {
  content : '';
  display : block;
  clear : both;
}
```
<br>


### Shadow DOM
HTML 개발시 코드가 너무 복잡해지지 않기위해 숨겨놓은 요소들

#### 확인방법
1. 개발자 도구를 켜서 F1을 누른다.
2. Show user agent shadoe DOM을 체크한다

#### 활용방법
내가 전에는 할 수 없어던 요소를 커스터마이징할 수있다.
1. 예를 들어, html에  ``` <input type="text" placeholder="안녕하세요">```을 지정한다.
2. 해당 페이지에서 F12를 눌러, pseudo값을 가져온다.
3. 아래처럼 지정하면 된다.
```css
input::-webkit-input-placeholder {
  color : red; 
}
```
4. 보이지않았던 스크롤바, 드래그시 하이라이트되는 파란색 색상, 파일 업로드 버튼 등 많은걸 커스터마이징 가능하다.

<br>

### ```<progress> ```태그 스타일링해보기
```<progress value="0.4"> </progress>```  
모던 브라우저에선 진행상황을 알 수 있는 progress 바이다. 관리자옵션에서 pseudo를 가져온다.
```css
progress {
  /*기본 배경은 없애주는게 좋다*/
  -webkit-appearance: none;
  -moz-appearance : none;
  appearance: none;
  background: white;
/* IE10 호환성용 */
  color: red;
}
progress::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 2px;
}
progress::-webkit-progress-value {
  background-color: red;
  border-radius: 2px;
}

/*파이어폭스 호환성을 위해*/
progress::-moz-progress-bar {
  background-color: red;
  border-radius: 2px;
}
```