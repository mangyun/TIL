// 구조 분해 할당
const user = {
  name: 'mangyun',
  age: 82,
  email: 'con1890@naver.com'
}

const { name: myName, age, email, address } = user // 유저의 속성들을 순서대로 할당해옴
//속성명을 변경하고싶다면 name: myName 처럼

console.log(`사용자의 이름은 ${myName}입니다.`)
console.log(`사용자의 나이는 ${age}입니다.`)
console.log(`사용자의 이메일은 ${email}입니다.`)
console.log(address) // 주소는 없기 때문에 undefined

//같은 논리로 배열에도 사용가능
const fruits = ['Apple', 'Banana', 'Cherry']
const [a, b, c, d] = fruits
console.log(a, b, c, d) //과일이 a, b, c까지만 순서대로 할당
// const [ , , c] = fruits //Cherry만 출력하게 할 수도 있음
// console.log(c)





//전개 연산자
const fruits = ['Apple', 'Banana', 'Cherry']
console.log(...fruits) // 모든 데이터 전개해서 출력

function toObject(a, b, ...c) { //인수에도 전개연산자 가능, c 에 나머지 원소들이 배열형태로 들어감
  return {
    a: a,
    b: b,
    c: c
  }
}

console.log(toObject(...fruits))






//데이터 불변성
//데이터는 값을 주목하는게 아니라, 그 값의 메모리 주소를 파악해야한다.

//원시 데이터: String, Number, Boolean, undefined, null
//원시데이터는 일반적으로 메모리주소보다는 직관적으로 값으로 생각해도 충분하다.
let a = 1
let b = 4
console.log(a, b, a===b) // 1 4 false
b = a
console.log(a, b, a===b) // 1 1 true
a = 7
console.log(a, b, a===b) // 7 1 false
let c = 1
console.log(b, c, b===c) // 1 1 true

//참조형 데이터: Object, Array, Function
//하지만 참조형은 값이 아니라 지극히 메모지주소로 생각해야 한다.
let a = { k: 1 }
let b = { k: 1 }
console.log(a, b, a===b) // {k: 1} {k: 1} false
a.k = 7 
b = a // b가 a와 같은 주소로 바뀐다.
console.log(a, b, a===b) // {k: 7} {k: 7} true
a.k = 2 //주의!!! 같은 메모리 주소를 갖기때문에, a만 바꿨지만, 의도치않게 b까지 함께 바뀐다.
console.log(a, b, a===b) // {k: 2} {k: 2} true
let c = b //c도 같은 주소를 가리키게 함
console.log(a, b, c, a===c) // {k: 2} {k: 2} {k: 2} true

//이런 의도치않은 문제들은 웹사이트를 구현할때 생길 수 있다.
//따라서 얕은 복사나 깊은 복사를 이용하자.






//얕은복사와 깊은복사
//1. 얕은 복사 - 겉표면 복사한다고 생각하면 된다.
const user = {
  name: 'mangyun',
  age: 82,
  email: 'con1890@naver.com'
}

const copyUser1 = Object.assign({}, user) // assign으로 복사할 수 있다.
const copyUser2 = {...user} // 전개연산자로도 복사할 수 있다.
console.log(copyUser1 === user) //false, 서로 다른 메모리주소를 가지기 때문에 다르다.
console.log(copyUser2 === user) //false, 서로 다른 메모리주소를 가지기 때문에 다르다.

user.emails.push('qk1890@naver.com')
console.log(user.emails == copyUser1.emails) // 배열인 email도 참조형이라, 똑같이 복사가 되는것을 볼 수 있다.

//2. 깊은 복사 - 내부까지 전부 복사한다고 생각하면 된다.
import _ from 'lodash' //손쉬운 깊은복사를 위한 lodash

const copyUser3 = _.cloneDeep(user) //반복실행으로 모든원소가 깊은복사된다.
console.log(copyUser3 === user) //false, 서로 다른 메모리주소를 가지기 때문에 다르다.
user.emails.push('qk1890@naver.com')
console.log(user.emails == copyUser3.emails) //false
//user는 qk1890도 있지만, copyUser3는 qk1890이 복사되지 않았다.

//결론
//객체나 배열처럼 참조형을 복사할 때, 내부에 속성으로 또 참조형 데이터가 존재한다면 깊은복사를 사용하는 것이 안전하다.
