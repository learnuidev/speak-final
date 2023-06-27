import { Header } from 'ui'
import { CloseIcon } from 'ui/Icons'
import React from 'react'

import { course3 } from '../data/pronunciation'
import { useViewModeStore } from '../state/useViewModeStore'
import { suggestions } from './data'

export const PronounciationSuggestions = ({
  lessonIndex
}: {
  lessonIndex: number
}) => {
  const setViewMode = useViewModeStore((state: any) => state.setViewMode)

  const lesson = course3.lessons[lessonIndex] || null

  const viewMode = useViewModeStore((state: any) => state.viewMode)

  const suggestion = suggestions?.[lesson?.hanzi]

  return (
    <div className='grow flex flex-col items-center min-h-screen overflow-y-auto'>
      <div className='absolute top-0 py-8 w-full px-8'>
        <div className='flex justify-between w-full grow'>
          <div />
          <Header className='text-black dark:text-white text-3xl font-extrabold'>
            {/* 分析 (analytics) */}
            {lesson?.hanzi} {lesson?.pinyin} ({lesson?.en})
          </Header>

          <div className=''>
            <button
              className={`${
                viewMode === 'analytics'
                  ? 'dark:text-gray-200 text-gray-800'
                  : 'dark:text-gray-600 text-gray-600'
              } text-4xl dark:hover:text-white shadow-md px-4 py-1 rounded-full shadow-md px-4 py-1 rounded-full`}
              onClick={() => {
                setViewMode('lesson')
                //
                console.log('SHOW ANALYTICS')
              }}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>

      {suggestion ? (
        <div className='pt-44 md:mx-32 space-y-4 md:text-lg'>
          {suggestion.map((item: any) => {
            return (
              <div>
                <div>{item.hanzi}</div>
                <div>{item.pinyin}</div>
                <div>{item.en}</div>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
