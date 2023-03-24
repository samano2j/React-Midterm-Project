import React from 'react'

export default function AnimeSuggestion({onClick, imgSrc, title, alt}) {
  return (
    <div onClick={onClick} className='flex p-2 gap-2 cursor-pointer hover:bg-[#0f172a] hover:text-white'>
        <img
            src={imgSrc}
            alt={alt}
            className='h-24 pointer-events-none'
        />
        <h1 className='text-xl font-bold pointer-events-none'>{title}</h1>
    </div>
  )
}
