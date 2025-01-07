import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Images } from '@/constants/images'
import Wrapper from '../wrapper/wrapper'

const navLinks = [
    {
        id: 'contact',
        label: 'Contact Us',
        href: '/contact',
        type: "link"
    },
    {
        id: 'sign-in',
        label: 'Sign In',
        href: '/sign-in',
        type: "default"
    },
    {
        id: 'started',
        label: 'Get Started',
        href: '/started',
        type: "secondary"
    },
]

const NavBar = () => {

    return (
        <div className='border-b-[#E4E4EF] border-b'>
            <Wrapper>
                <nav className='flex justify-between items-center sticky top-0 h-24'>
                    <div>
                        <Image width={130} height={55} priority src={Images.Logo} alt="medeasy" />
                    </div>
                    <div className='flex gap-x-4'>
                        {navLinks.map(link => (
                            <Link key={link.id} href={link.href}>
                                <Button type='button' variant={link.type as keyof typeof buttonVariants}>{link.label}</Button>
                            </Link>
                        ))}
                    </div>
                </nav>
            </Wrapper>
        </div>
    )
}

export default NavBar
