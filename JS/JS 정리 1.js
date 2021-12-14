// 비교연산자
// js에서는 ===가 일치연산자
// ==는 자동형변환일어남

//삼항 연산자
let a = 1 < 2
console.log(a ? '참' : '거짓')

//스위치
switch (a) {
  case 0:
    console.log
    break
  case 2:
    console.log
    break
  default:
}

//반복문
let ulEl = document.querySelector('ul')
for (let i = 0; i < 10; i += 1) {
  let li = document.createElement('li')
  li.textContent = `list-${i+1}`
  if (i % 2) {
    li.addEventListener('click', function () {
      console.log(li.textContent)
    })
  }
  ulEl.appendChild(li)
}

//var는 함수안에서 전역이라 잘 안씀

//Truthy(참 같은 값)
true, {}, [], 1, 2, 'false', -12, '3.14'

//Falsy(거짓 같은 값)
false, '', null, undefined, 0, NaN

//인수가 너무 많으면 arguments도 이용가능
function sum() {
  return arguments[0] + arguments[1]
}
console.log(sum(7, 3))


//화살표 함수
const doubleArrow = x => x * 2 //간단한 실행문
console.log('doubleArrow', doubleArrow(7))


//즉시실행함수
const a = 7
function double() {
  console.log(a*2)
}
double();
(function () {// 즉시실행함수
  console.log(a*2)
}())


//호이스팅
//함수 선언부가 최상단으로 끌어올려지는 현상
const a = 7
double()
function double() { //호이스팅
  console.log(a * 2)
}


//타이머함수
const timer = setTimeout(() => {
  console.log('abc')
}, 3000) //3초뒤에 실행 
const h1El = document.querySelector('h1')
h1El.addEventListener('click', () => {
  clearTimeout(timer) // 클릭하면 타이머 종료
})

const timer = setInterval(() => {
  console.log('abc')
}, 3000) //3초마다실행 
const h1El = document.querySelector('h1')
h1El.addEventListener('click', () => {
  clearTimeout(timer) // 클릭하면 타이머 종료
})


//콜백함수
//함수의 인수로 사용되는 함수, 여기서는 cb
function timeout(cb) { //인수로 cb
  setTimeout(() => {
    console.log('abc')
    cb()//실행위치를 보장하는 용도로 활용
  }, 3000)
}

timeout(() => {
  console.log('done')
})



//생성자함수
function User(first, last) { //암묵적으로 생성자 함수는 대문자시작
  this.firstName = first
  this.LastName = last
}

User.prototype.getFullName = function () { //다양한 prototype을 사용해서 new와 함께 사용
  return `${this.firstName} ${this.LastName}`
}

const my = new User('mangyun', 'Lee') //하나의 객체 데이터가 생긴다
const amy = new User('amy', 'clarke')
const neo = new User('neo', 'smith')

console.log(my.getFullName())
console.log(amy.getFullName())
console.log(neo.getFullName())


//this
//일반 함수는 호출 위치에 따라 this 정의
//화살표 함수는 자신이 선언된 함수에서 this 정의
const timer = {
  name: 'my',
  timeout: function () {
    setTimeout(()=> {// 여기서는 콜백처리르 안하기 위해, 화살표 함수 이용
      console.log(this.name)
    }, 2000)
  }
}
timer.timeout()


// 간단한 ES6 표현법 - class 사용
// 생성자함수의
function User(first, last) { //암묵적으로 생성자 함수는 대문자시작
  this.firstName = first
  this.LastName = last
}

User.prototype.getFullName = function () { //다양한 prototype을 사용해서 new와 함께 사용
  return `${this.firstName} ${this.LastName}`
}

//class, constructor를 사용해 밑처럼 바꿀수 있음
 class User {
  constructor(first, last) { //constructor 사용
    this.firstName = first
    this.LastName = last
  }

  getFullName() { //prototype을 생략할 수 있게됨.
    return `${this.firstName} ${this.LastName}`
  }
}


//상속
class Vehicle {
  constructor(name, wheel) {
    this.name = name
    this.wheel = wheel
  }
}
const myVehicle = new Vehicle('운송수단', 2)

class Car extends Vehicle {
  constructor(name, wheel, license) {
    super(name, wheel)
    this.license = license
  }
}
const myCar = new Car('벤츠', 4, true)

console.log(myVehicle)
console.log(myCar)