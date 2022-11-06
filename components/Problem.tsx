interface MathProblem {
  num1 : number
  , num2 : number
  , answer : number
  , act? : string
  , equals? : string
  , onSubmit : Function
  , step : number
}

export const Problem = (props: MathProblem) => {

  const {
    num1 = 0
    , num2 = 0
    , answer = 0
    , act = "÷"
    , equals = "="
    , onSubmit
    , step
  } = props;

  const f = new Function()

  return (
    <form key={ step } class="problem" onSubmit={ e => {
      e.preventDefault()
      onSubmit(e)
    } }>
      <span class="num1">{num1}</span>
      <span class="act">{act}</span>
      <span class="num2">{num2}</span>
      <span class="equals">{equals}</span>
      <input 
        type="text" 
        name="answer" 
        // placeholder={ `${ answer }` }
        pattern={ `${ answer }` }
        inputMode="numeric"
        onInvalid={ e => {
          e.currentTarget?.setCustomValidity(
            `What does ${ num1 } ${ act } ${ num2 } ${ equals }`
          )
        }}
        required 
        autoFocus
        autoComplete="off"
        autoCorrect="off"
      />
      <button type="submit">answer</button>
    </form>
  );
};
