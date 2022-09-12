
interface ButtonProps {
  title: string;
}

function Button({ title }: ButtonProps) {
  return (
    <button>
      {title}
    </button>
  )
}

function App() {
  return (
    <>
      <Button title='sendo 1' />
      <Button title='sendo 2' />
      <Button title='sendo 3' />
    </>
  )
}

export default App
