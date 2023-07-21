import TimelineList from './components/TimelineList/TimelineList'
import { useState } from 'react'

import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <TimelineList></TimelineList>

    </>
  )
}

export default App
