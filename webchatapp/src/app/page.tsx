"use client"

// import Image from 'next/image'
import { useState, useRef } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const inputRef = useRef(null)

  function sendMessage() {
    const message = inputRef.current.value.trim()
    if (message !== "") {
      setMessages(prevMessages => [...prevMessages, { sender: true, text: message }])
      inputRef.current.value = ""
    }
  }

  return (
    <div className="bg-gray-200 h-screen flex flex-col text-black">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col mb-4">
          <div className="bg-blue-300 text-black font-serif font-bold text-xl py-2 px-4 mx-auto w-full items-center justify-center flex">
            Welcome
          </div>
        </div>
        <div className="flex flex-col mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`bg-${message.sender ? 'blue-300' : 'transparent'} rounded-sm h-auto shadow-md p-2 w-3/4 mt-2 ${message.sender ? 'self-end' : 'self-start'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex">
          <input
            type="text"
            ref={inputRef}
            className="flex-grow rounded-sm shadow-md p-2 mr-2"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>
            <img src="send.svg" alt="Send" className="h-10 w-10  hover:cursor-pointer hover:shadow-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}
