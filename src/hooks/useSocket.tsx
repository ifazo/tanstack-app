// 'use client'

import { useEffect, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

type Message = {
  sender: string
  text: string
}

export function useSocket(serverUrl: string) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const s = io(serverUrl, {
      transports: ['websocket'],
    })

    s.on('connect', () => {
      console.log('✅ Connected to socket server')
      setIsConnected(true)
    })

    s.on('disconnect', () => {
      console.log('❌ Disconnected from socket server')
      setIsConnected(false)
    })

    s.on('message', (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    })

    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [serverUrl])

  const sendMessage = useCallback(
    (msg: Message) => {
      if (socket) {
        socket.emit('message', msg)
        setMessages((prev) => [...prev, msg])
      }
    },
    [socket]
  )

  return { socket, isConnected, messages, sendMessage }
}
