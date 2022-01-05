### Hammer.js
터치이벤트를 호환성이 좋게 개발할 수 있는 라이브러리  
Carousel같이 그냥 가져다 쓸 수도 있지만, 라이브러리를 통해 개발해보자.
```js
<!-- Hammer.js  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js" integrity="sha256-eVNjHw5UeU0jUqPPpZHAkU1z4U+QFBBY488WvueTm88=" crossorigin="anonymous"></script>
```

#### 원래는 일반 js로 구현하려면 아래와 같은 과정이 필요하며, 호환성도 좋지 않다. 
1. 이미지에다가 touchstart, touchmove, touchend 라는 이벤트리스너를 각각 만들어준다. 각각 터치시작, 터치중, 터치끝에 발동되는 이벤트리스너이다.  
2. 각각 이벤트리스너가 동작할 때, 유저가 화면 터치시의 X축 좌표(clientX 라고 씀)를 출력하거나 저장해놓는다.  
3. touchstart의 X축 좌표와 touchend의 X축 좌표를 빼서 양수가 나오면, 오른쪽으로 슬라이드했구나~! 라고 판단한다.  
4. 따라서 터치중일 때, (touchmove 발동시) 유저가 X축 좌표를 움직인 만큼, 똑같이 이미지를 우측으로 움직이게 만들어준다. (CSS transform 속성 등 사용)  
5. 터치를 놓으면, (touchend 발동시) 이미지가 완전히 다음 이미지로 변경되게 만들어준다. 때에 따라 CSS transition을 추가해준다.    

따라서 Hammer.js를 써보았다.  

<커서로 드래그 시>
![](https://images.velog.io/images/qk1890/post/f4eb9e50-c0dd-4da2-98f6-94d89ef03a7e/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(10).png)

```js
let image0 = document.querySelectorAll('.slide-box img')[0]//첫 번째 이미지 선택
        let manager0 = new Hammer.Manager(image0);
        manager0.add(new Hammer.Pan({ //Pan은 Hammer.js에서 제공하는 '터치 후 슬라이드 했을때'를 체크해주는 이벤트
            threshold: 0 //이벤트가 발동되기까지의 역치값, 0이라서 바로 실행
        }));

        manager0.on('pan', function(e) { //왼쪽이나 오른쪽으로 드래그하면, 
            if (e.deltaX < 0) //e.deltaX는 x축 드래그한 거리를 알려준다.
                $('.slide-container').css('transform', 'translateX(' + e.deltaX + 'px)');

            if (e.isFinal) { //e.isFinal은 마우스를 놓으면, 터치 이벤트가 끝이라는 뜻

                $('.slide-container').addClass('transforming'); //터치가 딱 끝났을 때만, transform 실행하기 위해서, 이때만 잠깐 클래스 추가
                $('.slide-container').css('transform', 'translateX(-100vw)');

                //setTimeout을 이용해, 0.5초 후에 클래스 다시 제거
                setTimeout(function() {
                    $('.slide-container').removeClass('transforming');
                }, 500);
            }
        });
```



<br>


### TypeWriting 애니메이션
심플하게 버튼을 누르면, 한글자씩 더해지는 애니메이션을 만들어보자.

<2초 뒤>  
![](https://images.velog.io/images/qk1890/post/542e817c-1ec8-4e42-b539-e6a2af7a5805/image.png)




<9초 뒤>  
![](https://images.velog.io/images/qk1890/post/429021c4-2ffc-4640-b979-ba749703d933/image.png)

```js
<button class='btn btn-danger text-btn'>버튼</button>
<h1 id="text">안녕하세요~ 감사해요~ 잘있어요~ 다시만나요~</h1>//만약 (ㅇ ㅏ ㄴ) 같이 자음, 모음을 한 개씩 더하게 하려면, 한글 typing 애니메이션같은 라이브러리를 이용해보자.

<script>
       let tag = document.querySelector('h1'); //h1 태그 
       let origin = document.querySelector('h1').innerHTML; //h1 태그 원래글씨

        $('.text-btn').click(function() { //버튼을 누르면
            animation(tag, origin); //함수 실행
        });

        function animation(태그, 원래글씨) { //변수들을 파라미터로 입력한다고 정의해주는게, 좋은 관습이다.
            태그.innerHTML = ''; //빈 글씨로 만들기, $('#text').html('');와 같다.

            for (let i = 0; i < origin.length; i++) { //글자수만큼 반복
                setTimeout(function() { //0.5초마다 글자가 나오게하기
                    태그.innerHTML = 태그.innerHTML + 원래글씨[i]; // 원래글씨의 한글자씩 태그에다가 더해서 저장
                }, 500 * (i + 1)); //0.5초, 1초, 1.5초, ...
            }
        }
</script>
```

<br>

### 참고
#### 반복문 변수를 let으로 해야하는 이유
1. 만약 var이라면, setTimeout같이 i값을 늦게 참조해서 쓰는 코드들은 의도대로 구현되지않는다.
2. i값을 쓰려고 봤더니, 반복문이 0.001초만에 다 돌고 난 후 i값은 6이 되어있기 때문이다.
3. let으로 바꿔주면 for 반복문 안에서 참조해서 쓸 수 있는 i 변수가 생성되기 때문에, 제대로 구현된다.
