import React from 'react'

const Footer_Button = ({text}) => {
    return (
        <div className='group cursor-pointer'>
            <p className='font-semibold tracking-wider'>{text}</p>
            <div className='h-[1px] bg-white opacity-0 group-hover:opacity-100' />
        </div>
    )
}

export default Footer_Button