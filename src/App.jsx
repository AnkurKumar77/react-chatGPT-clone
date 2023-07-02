import { useState , useEffect } from 'react'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [value,setValue] = useState('')
  const [message, setMessage] = useState(null)

  const getMessages = async ()=> {
    // console.log('he')
    const options = {
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        message: value
      })
    }

    try {
      console.log(value)

      const response = await fetch('http://localhost:8000/completions',options)
      const data = await response.json()
      setMessage(data.choices[0].message)

    }catch (err) {
      console.error(err)
    }
  }
  console.log(message)
  return (
    <div className='app'>
      <section className = 'side-bar'>
          <button>+ New Chat</button>
          <ul className='history'>
              <li>Hello</li>
          </ul>
          <nav>
              <p>DEMO</p>
          </nav>
      </section>
      <section className='main'>
          <h1>ChatGPT Clone</h1>
          <ul className='feed'>

          </ul>
          <div className='bottom-section'>
              <div className="input-container">
                  <input type="text" value = {value} onChange={(e)=>setValue(e.target.value)}/>
                  <div id="submit" onClick={getMessages}>➢</div>
              </div>
              <p className='info'>
                  free preview
              </p>
          </div>
      </section>
    </div>
  )
}

export default App
