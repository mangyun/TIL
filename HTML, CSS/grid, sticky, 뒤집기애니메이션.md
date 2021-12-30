### grid 레이아웃  
전체보다는, 규칙적이고 작은부분의 레이아웃을 잡을때 유용하다.

<br>

#### 만드는 방법
1. 자식 div 높이와 폭을 조정하기
선으로 기준을 나누어주면 된다.
```html
<div class="grid-container">
    <div class="grid-nav">헤더</div>
    <div class="grid-sidebar">사이드바</div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```

```css
.grid-nav {
  grid-column : 1 / 4; //세로선 1부터 4까지 차지하라는 말이다.    
  grid-row : 2 / 4; //가로선 2부터 4까지 차지하라는 말이다.
}
```

<br>

2. 자식에게 이름쓰고 부모가 배치하기  
직관적으로 이름을 지정해서, 배치해주면 된다.

```html
<div class="grid-container">
    <div class="grid-nav">헤더</div>
    <div class="grid-sidebar">사이드바</div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```

```css
.grid-nav {
  grid-area: 헤더;
}

.grid-sidebar {
  grid-area: 사이드;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 100px 100px 100px;
  grid-gap: 10px;
  grid-template-areas: 
    "헤더 헤더 헤더 헤더" //직관적으로 헤더를 지정한다.
    "사이드 사이드 . ." //사이드를 지정한다.
    "사이드 사이드 . ."
}
```

 <br>

### sticky
position: fixed와 유사하게, 고정시켜주는 대신, 요소가 화면에 나오면 고정시킨다.
1. 스크롤이 되어서 이미지가 보이는 순간
2. viewport의 맨 위에서부터 100px 위치에서 고정이 된다.
3. 그리고 부모 박스를 넘어서 스크롤 되면 이미지도 같이 사라진다.
```html
<body style="background : grey; height : 3000px">

<div class="grey">
  <div class="image">
    <img src="appletv.jpg" width="100%">
  </div>

  <div style="clear : both"></div>
  <div class="text">Meet the first Triple Camera System</div>
    
</div>

</body>
```

```css
.grey {
  background: lightgrey;
  height: 2000px;
  margin-top: 500px;
}
.text {
  float: left;
  width : 300px;
}
.image {
  float: right;
  width : 400px;
  position: sticky;
  top: 100px;
}
```

#### 주의점
1. 스크롤을 할 만한 부모 박스가 있어야한다.
2. top 등 좌표속성과 함께 써야 제대로 보인다.

<br>

### 뒤집는 애니메이션
rotateY를 사용하자.
1. 앞면과 뒷면 레이아웃을 각각 만든다.
```html
<div class="flip-outer">
    <div class="flip-inner">
      <img src="profile.png" class="front">
      <div class="back">
        <h4>개발자 이명윤</h4>
        <p>Frontend Developer</p>
      </div>
    </div>
 </div>
```

#### 중요한 점
앞,뒷면을 한꺼번에 싸매는 박스를 하나 만들어준다.
- 마우스를 올려 앞뒤를 각각 회전시키기보다는, 저 박스 전체를 회전시키면 편리하다.
- 앞뒤는 position : absolute로 띄워야 앞뒤로 배치가 가능해서, position : relative를 어딘가에 줘야하는데 그걸 싸매는 박스에 주면 편리하다.

2. 마우스를 올렸을 때, Y축으로 180도 회전하라고 애니메이션을 준다.
```css
.flip-outer {
  width: 300px;
  height: 300px;
}

.flip-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 1s;
  transform-style: preserve-3d; //이 속성이 있어야, 어떤 요소를 회전시킬 때 우리가 평소에 생각하는 3d 사물처럼 동작한다.
}

.flip-inner:hover {
  transform: rotateY(180deg);
}

.front {
  width: 100%;
  position: absolute;
  backface-visibility: hidden; //원래 어떤 HTML 요소를 뒤집으면 뒷면이 보이는데, 그걸 안보이게 해준다.
}

.back {
  width: 100%;
  position: absolute;
  transform: rotateY(180deg);
}
```
