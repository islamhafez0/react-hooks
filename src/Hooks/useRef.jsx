import { useEffect, useRef, useState } from "react"

export function App () {
  const [name, setName] = useState('');
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  })
  return (
    <div style={{padding: '30px'}}>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <p>My name is <span style={{fontWeight: 'bold'}}>{name}</span></p>
      <p>Render Count: {renderCount.current}</p>
    </div>
  )
}