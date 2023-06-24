"use client"

// import Image from 'next/image'
import axios from 'axios';
import Navbar from '../../components/navbar'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([])
  let inputRef = null

  function sendMessage() {
    const message = inputRef.value.trim();
    if (message !== '') {
      // Send user message to the backend server
      axios.post('/api/chat', { message })
        .then((response) => {
          const reply = response.data.reply;
          setMessages(prevMessages => [...prevMessages, { sender: false, text: reply }]);
          inputRef.value = '';
        })
        .catch((error) => {
          if (error.response) {
            // The request was made, but the server responded with an error status
            console.error('Server Error:', error.response.status);
            // Handle the error condition, e.g., show an error message to the user
          } else if (error.request) {
            // The request was made, but no response was received
            console.error('No Response:', error.request);
            // Handle the error condition, e.g., show an error message to the user
          } else {
            // Something happened in setting up the request that triggered an error
            console.error('Request Error:', error.message);
            // Handle the error condition, e.g., show an error message to the user
          }
        });
    }
  }
  

  return (
    <div className="bg-gray-200 h-screen flex flex-col text-black">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col mb-4">
          <Navbar />
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



