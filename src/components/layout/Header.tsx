import Image from 'next/image'
import Link from 'next/link'
import pokemonLogo from '../../../public/images/pokemon-logo.png'
import HeaderNavItem from '@/components/ui/HeaderNavItem'

const Header = () => {
    return (
        <header className="p-4 bg-primary flex justify-between items-center text-white text-sm w-screen">
            <Link href="/">
                <Image
                src={pokemonLogo}
                alt='Pokemon logo'
                className='max-w-[100px]'
                draggable={false}
                />
            </Link>
            <nav className='flex justify-end items-center gap-2'>
              <HeaderNavItem text='Home' href='/'/>
              <HeaderNavItem text='Pokemon' href='/pokemon'/>
              <HeaderNavItem text='Pocket' href='/pokemon/owned'/>
            </nav>
        </header>
    )
}

export default Header;