import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/ping/")
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Frontend React</h1>
      <p>Backend says: {data}</p>
    </div>
  )
}

export default App
