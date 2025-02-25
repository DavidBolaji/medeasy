import React from 'react'

interface CardProps {
    ind: number;
    title: string;
    text: string;
}

const Card:React.FC<CardProps> = ({ind, title, text}) => {
  return (
    <div className='bg-white w-full lg:max-w-[328px] py-8 px-6 min-h-[282px] h-[282px] rounded-3xl shadow-2xl shadow-black/10 overflow-hidden'>
        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue text-white font-instrument font-bold text-2xl mb-4'>{ind + 1}</div>
        <h2 className='font-instrument text-black font-semibold text-xl mb-4'>{title}</h2>
        <p className='text-black-200 font-instrument text-base'>{text}</p>
    </div>
  )
}

export default Card
