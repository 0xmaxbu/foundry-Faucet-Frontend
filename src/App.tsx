import { useState } from 'react'
import Button from '@mui/material/Button';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Foundry-Facuet</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Button variant="contained">Hello world</Button>
      </div>
    </>
  )
}

export default App
