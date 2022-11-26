import onMouseDown from './_CalculatorOnMouseDown.tsx'

const Action = ({ className, children }) => {
  return (
    <button
      {...{ className, children, onMouseDown }}
    />
  )
}

export default () => {
  return (
    <>
      <Action className="g">C</Action>
      <Action className="g">⌫</Action>
      <Action className="g">⏾</Action>
      <Action className="a">÷</Action>
      <Action className="n">7</Action>
      <Action className="n">8</Action>
      <Action className="n">9</Action>
      <Action className="a">+</Action>
      <Action className="n">4</Action>
      <Action className="n">5</Action>
      <Action className="n">6</Action>
      <Action className="a">-</Action>
      <Action className="n">1</Action>
      <Action className="n">2</Action>
      <Action className="n">3</Action>
      <Action className="a">×</Action>
      <Action className="n double">0</Action>
      <Action className="n">.</Action>
      <Action className="a">=</Action>
    </>
  )
}