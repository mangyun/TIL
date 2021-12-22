# 타입
## TypeScript 의의
다수의 인원이 프로젝트 협업시에 좋다. 변경사항들을 의견충돌없이 의도대로 올바르게 변경할 수 있다.  
내가 만든 코드가 아니더라도, 어느 파일에 있는지 모르는 코드더라도, 점만 딱 찍으면 서제스트 해주고,
필요한 매개변수와 타입을 괄호만 치면 주르륵 나열해주는 편리함을 느낄 수 있다. 

## boolean
let isDone: boolean = false
   
## number
```ts
let decimal: number = 6
```
이외에도 16, 8, 2진수 및 NaN, 1_000_000같이 표현가능하다.

## string
js와 동일하게 `$`사용한다.
```ts
let sentence: string = `my name : ${fullName}.  ${age + 1} years old.`
```

## symbol
고유하고 수정불가능한 값이라, 주로 접근을 제어하는데 사용한다.
```ts
const sym = Symbol()
const obj = {
  [sym]: 'value'
}
obj[sym]
```

## undefined & null
값을 각각 undefinde, null만 가진다.  
typeof의 값은 undefinde, object이다.
 - null : 무언가는 있는데, 사용할 준비가 덜 된 상태
 - undefined : 무언가가 아예 준비도 안된 상태
```ts
let n: null = null 
console.log(n) // null

let u: undefined = undefined 
console.log(u) // undefined
```

## object
primitive type이 아닌 것을 나타내고 싶을 때 사용한다.
```ts
number, string, boolean, bigint, symbol, null or undefined
let obj: object = {}
declare function create(o: object | null) : void // primitive type이면 에러가 나오게끔
```
## array
| 인 union 표현을 주로 사용한다는 것을 기억해두자.
```ts
let list1: number[] = [1, 2, 3] //충돌때문에, 아래보다는 이 방식을 더 선호
let list2: Array<number> = [1, 2, 3] 
let list3: (number | string)[] = [1, 2, 3, '4'] // 숫자와 문자가 동시에 있을때도 가끔 사용
```

## tuple
대괄호 주로 앞뒤에 다른 타입을 넣는다.
```ts
let x: [string, number]
x = ['hello', 38]
x = [32, 'hi'] // 자리가 바뀌어 에러가 나온다.
const person: [string, number] = ['mark', 35]
const [first, second, third] = person//person에 해당 인덱스가 없다
```

## any
어떤타입이어도 상관없다.  
TS의 목적인 타입 안전성을 잃기 때문에, 이걸 최대한 쓰지 않는게 핵심이다.
```ts
function returnAny(message: any): any {//메세지에 제약이 없어서 any로 정함.
  console.log(message)
}
const any1 = returnAny('리턴은 아무거나')
any1.toString()//타입이 any이라 무엇이든 할 수있다.

let looselyTyped: any = {}
const d = looselyTyped.a.b.c.d // any는 객체를 통해 전파한다.

function leakingAny(obj: any) {//any의 처리를 number로 바꾼다.
  const a: number = obj.num //any가 number
  const b = a + 1 //b도 number가 됨
}
```

## unknown
모르는 변수 타입에 사용한다.   
any는 다음 코드들에 영향을 크게 주기 때문에, 주로 unknown을 사용한다.
```ts
declare const maybe: unknown

if(maybe === 1){//maybe가 숫자로 명시되서
const aNumber: number = maybe // number 전달
}

if (maybe === true) {// maybe가 true라 명시되서
   const aBoolean: boolean =  maybe
   const aString: string = maybe//true는 string으로 전달안됨.
}
```

## never
잘못된 타입을 넣는 실수를 막고자 할때 사용한다.  
모든타입에 사용할 수 있고, never에는 어떤 어떤것도 사용할 수 없다.
```ts
let a: string = 'hello' 
if ( typeof a !== 'string'){
    a //a는 string인데 string이 아니라하면 never가 된다.
}

declare const  b: string | number
if ( typeof b !== 'string'){
    b //b는 string을 제외하고 number가 된다.
}
```

## void
return에서 아무것도 하지 않는다는 표현이다.  
주로 undefined를 사용하기 때문에, 활용성이 적다.
```ts
function returnVoid(message: string) {
  return undefined//유일하게 undefined만 할당 가능하다.
}
returnVoid('리턴이 없다.')
```
