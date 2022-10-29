interface MathProblem {
  num1 : number
  , num2 : number
  , act? : string
  , equals? : string
}

export const Problem = (props: MathProblem) => {

  const {
    num1 = 0, num2 = 0, act = "÷", equals = "="
  } = props;

  return (
    <div class="problem">
      <span class="num1">{num1}</span>
      <span class="act">{act}</span>
      <span class="num2">{num2}</span>
      <span class="equals">{equals}</span>
      <input type="number" name="answer1" />
    </div>
  );
};
