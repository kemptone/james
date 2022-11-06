interface MathProblem {
  num1 : number
  , num2 : number
  , act? : string
  , equals? : string
}

export const Problem = (props: MathProblem) => {

  const {
    num1 = 0
    , num2 = 0
    , act = "÷"
    , equals = "="
  } = props;

  return (
    <form class="problem" action={ `/` }>
      <span class="num1">{num1}</span>
      <span class="act">{act}</span>
      <span class="num2">{num2}</span>
      <span class="equals">{equals}</span>
      <input 
        type="text" 
        name="answer" 
        pattern="541" 
        inputMode="numeric"
        onInvalid={ e => {
          e.currentTarget?.setCustomValidity(
            `What does ${ num1 } ${ act } ${ num2 } ${ equals }`
          )
        }}
        required 
      />
      <button type="submit">answer</button>
    </form>
  );
};
