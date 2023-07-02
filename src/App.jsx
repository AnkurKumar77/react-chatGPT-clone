import { useState } from 'react'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

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
                  <input type="text" />
                  <div id="submit">➢</div>
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
