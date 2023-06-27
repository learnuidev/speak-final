import React, { useEffect, useRef, useState } from 'react'
import { PlayIcon, PauseIcon } from './Icons'

import { persist, createJSONStorage } from 'zustand/middleware'
import { create } from 'zustand'

// No
const useMusicStore = create((set: any, get: any) => ({
  play: false,
  setPlay: (f: any) =>
    typeof f === 'function' ? set({ play: f(get().play) }) : set({ play: f }),
  time: 0,
  setTime: (f: any) =>
    typeof f === 'function' ? set({ time: f(get().time) }) : set({ time: f }),
  results: {},
  setResults: (f: any) =>
    typeof f === 'function'
      ? set({ results: f(get().results) })
      : set({ results: f })
}))

export const useMusic = (props: { url: string; onAudioEnd: () => void }) => {
  const [play, setPlay] = useState(false)
  let audio = useRef() as any
  const [currentTime, setTime] = useState(0)
  // const play = useMusicStore((state: any) => state.play)
  // const setPlay = useMusicStore((state: any) => state.setPlay)
  // const currentTime = useMusicStore((state: any) => state.time)
  // const setTime = useMusicStore((state: any) => state.setTime)

  const togglePlay = () => {
    setPlay(play => !play)
  }

  useEffect(() => {
    audio?.current?.pause()
    // if (play) {
    //   audio?.current?.play()
    // }
    setPlay(false)
  }, [props.url])

  useEffect(() => {
    if (play) {
      audio.current?.play()
    } else {
      audio.current?.pause()
    }
  }, [play])

  const seek = (seekTime: any) => {
    if (!play) {
      audio.current?.play()
      audio.current.currentTime = seekTime
      setPlay(true)
    } else {
      // audio.current?.pause()
      audio.current.currentTime = seekTime
    }
  }
  const reset = () => {
    audio.current?.pause()
    audio.current.currentTime = 0
    setPlay(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(seconds => audio?.current?.currentTime)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    audio.current = new Audio(props.url)
    audio.current.onended = (event: any) => {
      props?.onAudioEnd && props?.onAudioEnd()
      // setPlay(false)
      setPlay(() => false)

      console.log('Audio stopped')
    }

    return () => {
      audio.current?.pause()
    }
  }, [props.url])

  return {
    seek,
    play,
    togglePlay,
    currentTime,
    reset
  }
}

export const Music = (props: {
  url: string

  className?: string
  onAudioEnd?: any
}) => {
  const { play, togglePlay } = useMusic(props as any)

  return (
    <button className={props?.className ?? ''} onClick={togglePlay}>
      {play ? <PauseIcon /> : <PlayIcon />}
    </button>
  )
}
