import React from 'react'

export default function AnimeItem ({onClick, imgSrc, title, alt}) {
    return (
        <div>
           <img 
            onClick={onClick}
            src={imgSrc}
            alt={alt}
            className='cursor-pointer transition ease-in-out hover:scale-110'
           />
           <div className='text-xl'>
            {title}
           </div>
        </div>
    )
}
