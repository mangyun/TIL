// JS 데이터실습
// 가져오기, 내보내기

//import - 가져올 때 사용한다.
//export default - 함수의 이름을 마음대로 설정할 수 있고 없애도 되지만, 하나만 가져올 수 있다. 
//export named - 함수의 이름을 지정하기때문에, 여러개를 가져올 수 있다.

1.export default
//getRandom.js
export  function () { //default기 때문에 함수 이름 없애도된다.
  return Math.floor(Math.random() * 10)
}

//getRandom.js에서 export default 함수 가져오기
import random from './getRandom'//export default 함수는 import시 이름을 없애도되고, 마음대로 이름을 지정해도 된다.
console.log(random(), random()) //함수를 하나만 가져올 수 있다.


2. export named
//getRandom.js
export  function random() { //일반 export이기 때문에 함수 이름지정한다. 대신 아래의 user도 내보낼 수 있다.
  return Math.floor(Math.random() * 10)
}
export const user = { //default였으면 하나만 내보낼 수 있다.
  name: 'mangyun',
  age: 86
}

//export named함수 가져오기
import { random, user as mangyun } from './getRandom'//export named 함수는 import시 {함수명}해야 한다.
//가져올때는 user로 가져오지만, 사용할때는 mangyun으로 가능하다.

import * as R from './getRandom' // default, named를 한꺼번에 전부 가져와서 이름을 R로 지정할 수 있다.

console.log(random(), random())
console.log(mangyun) // {name: 'mangyun', age: 86}
console.log(R) // {name: 'mangyun', age: 86}








Lodash의 자주 사용하는 메소드
1. _.uniqBy, _.unionBy - 중복제거(고유화 처리)
// uniqBy - 합쳐진 하나의 배열에서 특정한 속성 이름의 중복 제거
// unionBy - 여러개의 배열을 합칠 때, 특정한 속성 이름의 중복 제거

import _ from 'lodash'

const usersA = [
  { userId: '1', name: 'mangyun' },
  { userId: '2', name: 'neo' }
]

const usersB = [
  { userId: '1', name: 'mangyun' },
  { userId: '3', name: 'Amy' }
]

const usersC = usersA.concat(usersB)
console.log(usersC) 
// 0: {userId: '1', name: 'mangyun'}
// 1: {userId: '2', name: 'neo'}
// 2: {userId: '1', name: 'mangyun'}
// 3: {userId: '3', name: 'Amy'}

console.log(_.uniqBy(usersC, 'userId'))// usersC에서 userid속성인 중복 제거
// 0: {userId: '1', name: 'mangyun'}
// 1: {userId: '2', name: 'neo'}
// 2: {userId: '3', name: 'Amy'}

const usersD = _.unionBy(usersA, usersB, 'userId')// 두 개를 합칠때, userid속성인 중복 제거
console.log(usersD)
// 0: {userId: '1', name: 'mangyun'}
// 1: {userId: '2', name: 'neo'}
// 2: {userId: '3', name: 'Amy'}


2. _.find, _.findIndex, _.remove - 검색, 제거
// _.find - 속성에 해당 데이터를 가지고 있는 것을 찾는다.
// _.findIndex- 속성에 해당 데이터를 가지고 있는 것의 인덱스를 찾는다.
// _.remove- 속성에 해당 데이터를 가지고 있는 것을 제거한다.

import _ from 'lodash'

const users = [
  { userId: '1', name: 'mangyun' },
  { userId: '2', name: 'neo' },
  { userId: '3', name: 'amy' },
  { userId: '4', name: 'evan' },
  { userId: '5', name: 'lewis' }
]

const foundUser = _.find(users, { name: 'amy'}) //amy이 있는 객체 데이터 탐색
const foundUserIndex = _.findIndex(users, { name: 'amy'})// 그 객체데이터의 인덱스 탐색
console.log(foundUser) //{userId: '3', name: 'amy'}
console.log(foundUserIndex) //인덱스는 2다.

_.remove(users, {name: 'mangyun'})// mangyun이 있는 객체데이터 삭제
console.log(users)
// 0: {userId: '2', name: 'neo'}
// 1: {userId: '3', name: 'amy'}
// 2: {userId: '4', name: 'evan'}
// 3: {userId: '5', name: 'lewis'}




json
정확하게는 하나의 문자 데이터 - java script object notation
단순하게 하나의 큰 덩어리인 문자데이터를 관리할 때 사용한다.
문자열은 ""만 가능하다

//myData.json
{
  "string": "mangyun",
  "number": 123,
  "boolean": true,
  "null": null,
  "object": {},
  "array": []
}


//stringify - js의 객체데이터를 하나의 json화 시킬 때 사용한다.
//parse - json데이터를 다시 객체데이터로 되돌릴 때 사용한다.

const user = {
  name: 'mangyun',
  age: 85,
  emails: [
    'qk1890@naver.com',
    'mangyun1890@naver.com'
  ]
}

const str = JSON.stringify(user) //객체데이터를 속성이 ""이 된 json데이터로 바꾼다.
console.log(str)
// {
//   "name": "mangyun",
//   "age": 85,
//   "emails": ["qk1890@naver.com", "mangyun1890@naver.com"]
// }

const obj = JSON.parse(str) //그 데이터를 다시 일반 객체데이터로 바꾼다.
console.log(obj)
//{name: 'mangyun', age: 85, emails: Array(2)}



storage
localStorage - 데이터를 반영구적으로 사용할 수 있다. 일반적으로 사용한다.
sessionStorage - 페이지를 닫으면 데이터가 사라진다.

const user = {
  name: 'mangyun',
  age: 85,
  emails: [
    'qk1890@naver.com',
    'mangyun1890@naver.com'
  ]
}

localStorage.setItem('user', JSON.stringify(user))//localStorage의 value는 문자데이터만 가능하므로, json화 시킨다.
console.log(JSON.parse(localStorage.getItem('user')))//다시 그 값을 가져올 때, 객체데이터로 바꿔준다.
localStorage.removeItem('user')//user라는 데이터를 local에서 삭제

storage 값 변경방법
const str = localStorage.getItem('user')//local의 user를 가져온다.
const obj = JSON.parse(str)//객체 데이터로 바꿔주고
obj.age = 22// 값을 변경한다.
localStorage.setItem('user', JSON.stringify(obj))//다시 json화 시켜, local에 등록한다.
//원시적이지만, 기본적인 방법이다. lodash를 이용해 간편화하자.







OMDb API
실제로 영화 데이터를 요청해서 출력을 해보자
apikey는 https://www.omdbapi.com/ 에서 받을 수 있다.

Query String(문자를 검색한다고 생각하자)
주소?속성=값&속성=값&속성=값

axios - 비동기식으로 요청을 js파일로 불러오기 패키지이다.
import axios from 'axios'

function fetchMovies() {
  axios
    .get('https://www.omdbapi.com/?apikey=7035c60c&s=frozen') //기본적으로 요청하려면 보안문제상 https로 요청하자
    .then(res => { //해당주소를 얻어서 res로 반환되어 이용
      console.log(res)
      // data:
        // Response: "True"
        // Search: Array(10)
          // 0: {Title: 'Frozen', Year: '2013', imdbID: 'tt2294629', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg'}
          // 1: {Title: 'Frozen II', Year: '2019', i 등 더 많다.
      const h1El = document.querySelector('h1')
      const imgEL = document.querySelector('img')
      h1El.textContent = res.data.Search[0].Title //제목과
      imgEL.src = res.data.Search[0].Poster //포스터만 출력해본다.
    })
}
fetchMovies()