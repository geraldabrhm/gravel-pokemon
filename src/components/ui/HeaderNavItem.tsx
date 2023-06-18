import { Fragment } from "react"
import Link from 'next/link'

const HeaderNavItem = ({text, href}: {text: string, href: string}) => {
    return (
        <Fragment>
            <Link href={href} className='border-2 hover:border-white border-primary rounded-full px-3 py-1'>{text}</Link>
        </Fragment>
    )
}

export default HeaderNavItem;