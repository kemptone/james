export function divdeBigNumber (p : {
  num1? : number
  , num2? : number
  , isNum2DerivedFromNum1 : boolean
  , num1MultiplyBy? : number
  , num2MultiplyBy? : number
  , num1IsRandom? : boolean
}) : { num1 : number, num2 : number, answer : number } {

  const rand1 = Math.ceil(Math.random() * 10)
  const rand2 = Math.ceil(Math.random() * 10)

  const num1 = p.num1IsRandom ? Math.floor(rand1 * (p.num1MultiplyBy || 10)) : p.num1 || 1
  const num2 = p.isNum2DerivedFromNum1 ? num1 * Math.floor(rand2 * (p.num2MultiplyBy || 10)) : p.num2 || 1

  return { 
    num1 : num2
    , num2 : num1 
    , answer : (num2 / num1)
  }

}

export const initial = (num1MultiplyBy: number) => divdeBigNumber({
  isNum2DerivedFromNum1 : true
  , num1IsRandom : true
  , num1MultiplyBy
})