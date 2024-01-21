import { useEffect, useMemo, useState } from 'react'

function App() {
  const [number, setNumber] = useState(0)
  console.log(number)
  const handleChange = (e) => {
    const target = e.target
    setNumber(parseInt(target.value))
  }
  const [dark, setDark] = useState(false)
  const themeStyle = useMemo(() =>  {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black',
      padding: '10px',
      marginTop: '10px'
    }
  }, [])
  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number])
  useEffect(() => {
    console.log('theme changed')
  }, [dark])
  return (
    <div style={{padding: '40px 30px'}}>
      <input type="number" name="number" value={number} onChange={handleChange} />
      <button onClick={() => setDark((prev) => !prev)}>ChangeTheme</button>
      <div style={themeStyle}>{doubleNumber}</div>
    </div>
  )
}

export default App

function slowFunction(num) {
  console.log('calling slow function')
  // for(let i = 0; i <= 100000000; i++) {}
  return num * 2
}

