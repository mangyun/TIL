# 타입 시스템
- 타입을 명시적으로 지정할 수 있다.
- 타입을 명시적으로 지정하지 않으면, 타입스크립트 컴파일러가 자동으로 타입을 추론한다.

## 자동 추론
a 의 타입을 명시적으로 지정하지 않은 경우이기 때문에 a 는 any 로 추론된다.  
함수의 리턴 타입은 number 로 추론된다. (NaN 도 number 의 하나이다.)
```ts
function f3(a) {
 return a * 38;
}
console.log(f3(10)) // 380
console.log(f3('Mark') + 5) // NaN
```

## noImplicitAny 옵션
타입을 명시적으로 지정하지 않은 경우, 타입스크립트가 추론 중 `any` 라고 판단하게 되면, 컴파일 에러를 발생시켜 명시적으로 지정하도록 유도한다.
```ts
// error TS7006: Parameter 'a' implicitly has an 'any' type.
function f3(a) {
 return a * 38
}
console.log(f3(10))
console.log(f3('Mark') + 5)
```

## strictNullChecks 옵션
모든 타입에 자동으로 포함되어 있는 `null` 과 `undefined` 를 제거해준다.
```ts
// 명시적으로 지정하지 않은 함수의 리턴 타입은 number | undefined 로 추론된다.
function f4(a: number) {
 if (a > 0) {
 return a * 38
 }
}
console.log(f4(5))
console.log(f4(-5) + 5) // error TS2532: Object is possibly 'undefined'.
```

## noImplicitReturns 옵션
함수 내에서 모든 코드가 값을 리턴하지 않으면, 컴파일 에러를 발생시킨다.
```ts
// if 가 아닌 경우 return 을 직접 하지 않고 코드가 종료된다.
// error TS7030: Not all code paths return a value.
function f5(a: number) {
 if (a > 0) {
 return a * 38
 }
}
```



# 타입 호환성
## 공변
같거나 서브타입인 경우, 할당이 가능하다.
```ts
// primitive type
let sub7: string = ''
let sup7: string | number = sub7

// object - 각각의 프로퍼티가 대응하는 프로퍼티와 같거나 서브타입이어야 한다.
let sub8: { a: string; b: number } = { a: '', b: 1 }
let sup8: { a: string | number; b: number } = sub8

// array - object 와 마찬가지이다.
let sub9: Array<{ a: string; b: number }> = [{ a: '', b: 1 }]
let sup9: Array<{ a: string | number; b: number }> = sub8
```

## 반병
함수의 매개변수 타입만 같거나 슈퍼타입인 경우, 할당이 가능하다.
```ts
class Person {}
class Developer extends Person {
 coding() {}
}
class StartupDeveloper extends Developer {
 burning() {}
}
function tellme(f: (d: Developer) => Developer) {}

// Developer => Developer 에다가 Developer => Developer 를 할당하는 경우
tellme(function dToD(d: Developer): Developer {
 return new Developer()
})

// Developer => Developer 에다가 Person => Developer 를 할당하는 경우
tellme(function pToD(d: Person): Developer {
 return new Developer()
})

// Developer => Developer 에다가 StartipDeveloper => Developer 를 할당하는 경우
tellme(function sToD(d: StartupDeveloper): Developer {
 return new Developer()
})
```


# 타입 별칭
Union Type, Tuple, Function 등 기타 직접 작성해야하는 타입을 다른 이름으로 지정할 수 있다.

## Union Type
유니온 타입은 A도 가능하고 B도 가능한 타입이다.
길게 쓰는걸 짧게 해준다.
```ts
let person: string | number = 0;
person = 'Mark';
type StringOrNumber = string | number; //별칭
let another: StringOrNumber = 0;
another = 'Anna';
```

## Tuple
튜플 타입에 별칭을 줘서 여러군데서 사용할 수 있게 한다.
```ts
let person: [string, number] = ['Mark', 35];
type PersonTuple = [string, number]; //별칭
let another: PersonTuple = ['Anna', 24];
```

## Function
매개변수로 사용될 수 있는, 함수를 별칭화한다.
```ts
type EatType = (food: string) => void;//별칭
```