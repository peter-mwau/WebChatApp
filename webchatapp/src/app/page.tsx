"use client"

// import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  let inputRef = null

  function sendMessage() {
    const message = inputRef.value.trim()
    if (message !== "") {
      setMessages(prevMessages => [...prevMessages, { sender: true, text: message }])
      inputRef.value = ""
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
              className={`relative bg-${message.sender ? 'blue-300' : 'gray-300'} rounded-md h-auto shadow-md w-3/4 mt-2 ${message.sender ? 'self-end' : 'self-start'}`}
            >
              <div
                className={`w-4 h-4 bg-${message.sender ? 'blue-300' : 'gray-300'} absolute ${message.sender ? 'bottom-0 right-0' : 'bottom-0 left-0'} transform rotate-45`}
              />
              <div className="p-2">
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex">
          <input
            type="text"
            ref={ref => (inputRef = ref)}
            className="flex-grow rounded-sm shadow-md p-2 mr-2"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>
            <img src="/send.svg" alt="Send" className="h-10 hover:cursor-pointer hover:shadow-sm" />
          </button>
        </div>
      </div>
    </div>
  )
}



