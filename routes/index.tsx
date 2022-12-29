import NumberGame from '../islands/NumberGame.jsx'
import Menu from '../islands/Menu.jsx'

// ÷ × + -

export default function Home() {

  return (
    <>
      <NumberGame />
      <Menu is_deno={true} />
    </>
  );
}
