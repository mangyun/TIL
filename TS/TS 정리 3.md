# interface
외부적으로 만들어내는 객체의 타입 방식

## optional property
? option
```ts
interface Person {
  name: string;
  age?: number; //객체의 값이 없을수도 있고 있을수도 있을 때, 물음표를 사용한다.
 }
 function hello(person: Person): void {
  console.log(`안녕하세요! ${person.name} 입니다.`);
 }
 const p1: Person = {
  name: 'Mark',
  age: 35
 };
 const p2: Person = {
  name: 'Anna'
 };
 hello(p1); // 안녕하세요! Mark 입니다.
 hello(p2); // 안녕하세요! Anna 입니다.
```


[index: type] option
```ts
interface Person {
 name: string;
 age?: number;
 [props: string]: any; //아무이름으로 설정하고 싶다면, 이렇게 설정한다.

 function hello(person: Person): void {
 console.log(`안녕하세요! ${person.name} 입니다.`);
}
const p1: Person = {
 name: 'Mark',
 age: 35,
};
const p2: Person = {
 name: 'Anna',
 systers: [
 'Sung',
 'Chan'
 ]
};
const p3: Person = {
 name: 'Bokdaengi',
 father: p1,
 mother: p2
};
hello(p1); // 안녕하세요! Mark 입니다.
hello(p2); // 안녕하세요! Anna 입니다.
hello(p3); // 안녕하세요! Bokdaengi 입니다.
```


## function in interface 
```ts
interface Person {
 name: string;
 age: number;
 hello(): void;
}
const p1: Person = {
 name: 'Mark',
 age: 35,
 hello: function (): void { // 정석 방식
 console.log(this);
 console.log(`안녕하세요! ${this.name} 입니다.`);
 }
};
const p2: Person = {
 name: 'Mark',
 age: 35,
 hello(): void { // 생략 방식
 console.log(this);
 console.log(`안녕하세요! ${this.name} 입니다.`);
 }
};
// const p3: Person = {
//  name: 'Mark',
//  age: 35,
//  hello: (): void => { //타입 스크립트에서 화살표 함수는 this를 사용할 수 없다.
//  console.log(`안녕하세요! ${this.name} 입니다.`); //this가 선언범위 안에서 지정되기 때문이다.
//  }
// };
p1.hello(); // 안녕하세요! Mark 입니다.
p2.hello(); // 안녕하세요! Mark 입니다.
```


## interface class
interface는 js로 컴파일되면 사라지고, class는 남는다.
```ts
interface IPerson {
 name: string;
 age?: number;
 hello(): void;
}

//implements로 interface를 바탕으로 class를 만들어낸다.
class Person implements IPerson {
 name: string;
 constructor(name: string) { //contructor를 이용해 name 초기화
 this.name = name;
 }

 hello(): void {
 console.log(`안녕하세요! ${this.name} 입니다.`);
 }
}
const person = new Person('Mark');
person.hello(); // 안녕하세요! Mark 입니다.
```


## interface extends
```ts
interface Person {
 name: string;
 age?: number;
}
interface Korean extends Person { // 그대로 상속받고, city를 추가한다.
 city: string;
}
const k: Korean = {
 name: '이웅재',
 city: '서울'
};
```


## function interface
```ts
interface HelloPerson {
 (name: string, age?: number): void;
}
let helloPerson: HelloPerson = function (name: string) {
 console.log(`안녕하세요! ${name} 입니다.`);
};

//함수의 타입 체크는 위의 interface를 사용할때만 한다는 점을 명심하자.
helloPerson('Mark'); // 안녕하세요! Mark 입니다.
```

## readonly interface
```ts
interface Person {
 name: string;
 age?: number;
 readonly gender: string // readonly는 바뀌지 않는 값에 사용한다.
}

const p: Person = {
 name: 'Mark',
 gender: 'male',
};

//p.gender = 'female' //readonly라서 못 바꾸기 때문에, 에러이다.
```

## type alias vs interface
편하게 type은 어떤 타입의 이름을 지정하는 것이고, interface는 새 타입을 만드는 것이라고 생각하자.

function
```ts
// type alias
type EatType = (food: string) => void;
// interface
interface IEat {
 (food: string): void;
```

array
```ts
// type alias
type PersonList = string[];
// interface
interface IPersonList {
 [index: number]: string;
}
```

intersection
```ts
interface ErrorHandling {
 success: boolean;
 error?: { message: string };
}
interface ArtistsData {
 artists: { name: string }[];
}
// type alias
type ArtistsResponseType = ArtistsData & ErrorHandling;
// interface
interface IArtistsResponse extends ArtistsData, ErrorHandling {}
let art: ArtistsResponseType;
let iar: IArtistsResponse;
```

union types
```ts
interface Bird {
 fly(): void;
 layEggs(): void;
}
interface Fish {
 swim(): void;
 layEggs(): void;
}
type PetType = Bird | Fish;

interface IPet extends PetType {} //union 타입을 상속과 class화는 에러가 난다.
class Pet implements PetType {} //위와 돋일
```

interface merge
type은 merge가 안된다.
```ts
interface MergingInterface {
 a: string;
}
interface MergingInterface {
 b: string;
}
let mi: MergingInterface;
mi. // a, b 둘 다 속해있다.
```
