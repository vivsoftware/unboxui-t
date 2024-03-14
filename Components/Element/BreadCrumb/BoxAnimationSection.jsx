import React from 'react'
import Image from 'next/image'
import { color } from '@mui/system'
const BoxAnimationSection = () => {
    return (
        <ul className="circles">
            <li><Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
            <li><Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
            <li><Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
            <li> <Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
            <li><Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
            <li> <Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
            <li><Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
            <li> <Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
            <li><Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
            <li><Image src="/Box.ico" alt="unboxLogo" height={50} width={50} /></li>
        </ul>
    )
}

export default BoxAnimationSection