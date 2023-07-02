import { useState , useEffect } from 'react'

import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [value,setValue] = useState('')
  const [message, setMessage] = useState(null)
  const [previousChat , setPreviousChat] = useState([])
  const [currentTitle,setCurrentTitle] = useState('')

  const createNewChat = () => {
    setMessage(null)
    setValue('')
    setCurrentTitle('')
  }

  const handleClick = (uniqueTitle)=> {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue('')
  }

  const getMessages = async ()=> {
    
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
      

      const response = await fetch('http://localhost:8000/completions',options)
      const data = await response.json()
      setMessage(data.choices[0].message)

    }catch (err) {
      console.error(err)
    }
  }
  useEffect(()=> {
    // console.log(currentTitle,value,message)
    if (!currentTitle && value && message) 
    {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPreviousChat(prevChat =>{
        
        return ([...prevChat,
          {
            title:currentTitle,
            role:'user',
            content:value
            },
          {
            title:currentTitle,
            role:message.role,
            content:message.content
          }
        ])})
        }
  },[message,currentTitle])

  // console.log(previousChat)

  const currentChat = previousChat.filter(previousChat=>previousChat.title==currentTitle)
  const uniqueTitles = Array.from(new Set(previousChat.map(previousChat=>previousChat.title)))
  // console.log(uniqueTitles)
  return (
    <div className='app'>
      <section className = 'side-bar'>
          <button onClick={createNewChat}>+ New Chat</button>
          <ul className='history'>
              {uniqueTitles?.map((uniqueTitle,index)=><li key={index} onClick={()=>handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
          </ul>
          <nav>
              <p>DEMO</p>
          </nav>
      </section>
      <section className='main'>
          {!currentTitle && <h1>ChatGPT Clone</h1>}
          <ul className='feed'>
              {currentChat?.map((chatMessage,index)=><li key={index} >
                <p className='role'>{chatMessage.role}</p>
                <p>{chatMessage.content}</p>
                
                </li>)}
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
