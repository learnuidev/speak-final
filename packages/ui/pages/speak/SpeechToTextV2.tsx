import { useCallback, useEffect, useRef, useState } from 'react'
import { Header } from 'ui'
import {
  AnalyticsIcon,
  CheckIcon,
  CloseIcon,
  MicIcon,
  ThoughtIcon
} from 'ui/Icons'
// import { useSpeechRecognition } from 'react-speech-recognition'

// State
import { useHistoryStore } from './useHistory'
import { useSpeechRecognition } from './useSpeechRecognition'

// const startListening = () = F
// setText.'

export const SpeechToText = ({
  onClear,
  handleSuggestion,
  play,
  togglePlay
}: {
  onClear: () => void
  handleSuggestion?: () => void
  play: any
  togglePlay: any
}) => {
  const {
    transcript,
    transcripts,
    listening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    lang: ''
  })

  const history = useHistoryStore((state: any) => state.history)
  const clearHistory = useHistoryStore((state: any) => state.clearHistory)

  console.log('TRANSCRTIPT', transcript)

  if (browserSupportsSpeechRecognition) {
    return (
      <div className='flex absolute bottom-40 items-center mt-16 space-x-8 dark:text-gray-500 font-light'>
        <button
          className='text-4xl dark:hover:text-gray-200 transition'
          onClick={() => {
            // onClear
            stopListening()
          }}
        >
          <CloseIcon />
        </button>
        <button
          className={`text-3xl bg-white dark:bg-black p-2 w-16 h-16 ring-1 ${
            listening
              ? `ring-slate-900/5 dark:ring-slate-600`
              : 'ring-slate-900/5 dark:ring-slate-800'
          } shadow-lg rounded-full flex items-center justify-center dark:hover:ring-slate-600 transition`}
          onClick={listening ? stopListening : startListening}
        >
          {listening ? (
            <CheckIcon className='transition dark:text-white text-green-500' />
          ) : (
            <MicIcon className='transition' />
          )}
        </button>
        <button className='text-4xl' onClick={handleSuggestion}>
          <ThoughtIcon />
        </button>

        {/* <button
          className={
            'text-4xl dark:text-gray-500 dark:hover:text-gray-400 hover:text-gray-900'
          }
          onClick={togglePlay}
        >
          {play ? <PauseIcon /> : <PlayIcon />}
        </button> */}

        {/* <p> {transcript}</p>

        <div className={'dark:text-white mt-4'}>
          {JSON.stringify(transcripts)}
        </div> */}

        {/* {transcripts.length ? (
          <div className={'dark:text-white mt-4'}>
            {JSON.stringify(transcripts)}
          </div>
        ) : null} */}

        {/* {true ? (
          <div className='my-8'>
            <div className='flex justify-center items-center space-x-4 mb-2'>
              <h1 className='text-center font-bold text-xl'>History</h1>
              <button onClick={clearHistory}>
                <CloseIcon />
              </button>
            </div>

            <div className={'dark:text-white flex flex-col text-xs space-y-2'}>
              {(history || []).map(item => {
                return (
                  <div className={'dark:text-white'}>
                    {JSON.stringify(item)}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null} */}
      </div>
    )
  }
  return (
    <div className='grow ml-4 md:ml-16 flex flex-col items-center min-h-screen overflow-y-auto'>
      <Header className='my-2 md:my-16 text-black dark:text-white text-3xl font-extrabold'>
        xiǎo húlí
      </Header>
    </div>
  )
}
