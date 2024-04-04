import { useState } from "react"

import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return <>{<h1>Count: {count}</h1>}</>
}

export default App
