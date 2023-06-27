'use client'
import Link from 'next/link'
import '../styles/global.css'
import { useState, useEffect } from 'react'
import { MandarinoIcon, MicIcon } from 'ui'
import { usePathname } from 'next/navigation'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const [selectedId, setSelectedId] = useState(null)
  const [view, setView] = useState('props')
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)

  const pathName = usePathname()

  return (
    <html lang='en'>
      <body className='relative flex items-start dark:bg-black text-gray-700 dark:text-gray-200'>
        <div className='z-50 absolute px-2 pt-[14px] hidden sm:block dark:text-gray-500 flex flex-col justify-center items-center'>
          <Link
            href={'/'}
            className={`${
              pathName === '/' ? 'text-green-500' : 'dark:text-gray-600'
            } my-4 flex flex-col justify-center items-center hover:dark:text-white transition`}
          >
            <MandarinoIcon className='text-2xl' />
            <p className='text-[8px] p-0 m-0'>Home</p>
          </Link>

          <Link
            href={'/speak'}
            className={`${
              pathName === '/speak' ? 'dark:text-white' : 'dark:text-gray-600'
            } my-4 flex flex-col justify-center items-center hover:dark:text-white transition`}
          >
            <MicIcon className='text-2xl' />
            <p className='text-[8px] p-0 m-0'>Speak</p>
          </Link>
        </div>
        {children}
      </body>
    </html>
  )
}
