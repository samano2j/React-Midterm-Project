import React from 'react'
import { ImArrowLeft } from 'react-icons/im'

export default function AnimeProfile ({imgSrc, title, synopsis, onClick}) {
    return (
        <div className="items-center md:items-start flex flex-col md:flex-row px-10 md:px-36 gap-9">
            <img
                src={imgSrc}
                alt="anime-profile"
                className='h-auto w-3/4 md:h-[70vh] md:w-2/4'
            />
            <div className='flex flex-col gap-5'>
                <h1 className='text-3xl font-bold'>{title}</h1>
                <p className='text-left'>{synopsis}</p>
                <button onClick={onClick} className='flex justify-center md:w-1/6 bg-blue-500 p-2 md:p-5 md:self-end text-white font-bold'><ImArrowLeft className='text-4xl '/></button>
            </div>
        </div>
    )
}