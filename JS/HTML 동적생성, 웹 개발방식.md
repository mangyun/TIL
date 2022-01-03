### JS로 HTML 만들기(동적 생성)
append() 함수는 내부에 특정 HTML을 추가한다.  
html() 함수는 아예 HTML을 교체한다고 생각하자.

#### 참고
#### input, select, textarea 등에 사용할 수 있는 change, input 이벤트가 있다.
1. input - 값이 바뀔때마다 실행
2. change - 포커스를 잃었을 때(커서가 다른곳에 찍힐 때) 실행

```js
let size = [26, 28, 30, 32, 34, 36] //바지 사이즈
        $('#option1').on('change', function() { //여기서는 옵션을 선택하고 포커스를 잃을 때라서, change를 사용했다.

            $('#option2').html(''); //빈 공간으로 초기화
            if ($('#option1').val() == '셔츠') {
                let temp = //JS로 HTML요소를 추가한다.
                    `<option>95</option> // `` 백틱은 문장을 공백이 있어도 그대로 쓸 수 있다.
                     <option>100</option>
                     <option>105</option>`;
                $('#option2').append(temp);
            } else if ($('#option1').val() == '바지') {
                size.forEach(function(i) { //자바 신 문법중에서 forEach를 사용했다. 
                    let temp = `<option>${i}</option>`; //단, 인덱스가 아니라 데이터가 들어간다.
                    $('#option2').append(temp);
                });
	
	   // 물론, 아래처럼도 할 수 있다.
	   // for (let i = 0; i < 6; i++) { //일반적인 반복문을 이용했다.
               //     let temp = `<option>${size[i]}</option>`; //대신 인덱스가 들어간다.
               //    $('#option2').append(temp);
               // }
            }
        });
```
![](https://images.velog.io/images/qk1890/post/3e8ae4ea-a1c8-4e29-8e3d-b0a8222836c7/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(4).png)
![](https://images.velog.io/images/qk1890/post/a59b19e1-9fe8-4ec8-8f79-4161d3dce242/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(7).png)




### 웹서비스 개발방식
1. 서버에서 HTML 파일을 미리 다 완성해서 보내주기
2. 서버에서 텅빈 HTML 파일 + 상품데이터만 보내고 HTML을 완성하는건 프론트엔드에서 자바스크립트로 시키기 
일단 2번째로 해보았다.

**데이터를 HTML에 꽂아넣어보자.  
데이터는 var products 라는 변수 안에 저장이 되어있다. 일단 서버가 보낸 데이터라고 생각하자.  
실제 개발현장에서도 자바스크립트 변수 이런데에 저장되어있다.**

### sort
#### 정렬할때 사용, 신 문법은 아니고 기존 array를 변형한다.
양수(+)를 return 하면 a를 오른쪽 b를 왼쪽으로 보냄
음수(-)를 return 하면 a를 왼쪽 b를 오른쪽으로 보냄
```js
	//가격순 정렬
        $('#sort-price').click(function() {
            newProducts.sort(function(a, b) {
                return a.price - b.price; //양수면 a가 더 크므로, b보다 오른쪽
            });
            priceResult(newProducts);
        });
```
![](https://images.velog.io/images/qk1890/post/7e5a7074-b43c-4b43-9cee-c08a9319ce16/image.png)

```js
        //가나다순 정렬
        $('#abc').click(function() {
            newProducts.sort(function(a, b) {
                if (a.title < b.title) // ㄱ < ㄴ이므로, 빠른 글자가 왼쪽으로 감
                    return -1;
                else
                    return 1;
            });
            priceResult(newProducts);
        });
```
![](https://images.velog.io/images/qk1890/post/898d251b-6f15-45b0-be8c-3158ccbb482f/image.png)

### map
#### array자료에 전부 무언가를 해주고 싶을때(ex. 쇼핑몰 원화를 달러로 바꾸는 기능)
```js
var array = [7, 3, 5, 2, 40];
var newArray = array.map(function(a) {
       return a * 2
})
```

### filter
#### array자료에 필터를 주고싶을 때 (ex. 쇼핑몰 원하는 가격범위만 보여주는 기능)
기존 array를 변형하지 않는 신 문법이라, **새로운 변수**에 담아서 사용해야한다.
```js
	//필터 금액 조건
        $('#filter-price').on('change', function() { //input 조건을 입력한 뒤에
            newProducts = products.filter(function(a) { //새로운 변수에 담음
                return a.price <= $('#filter-price').val(); //범위 필터
            });
            priceResult(newProducts);
        });
```
![](https://images.velog.io/images/qk1890/post/b23f134d-7169-4fdf-9971-0d1e78b06a49/image.png)
