"use client";
import { ROUTES } from "../routes"
import Link from 'next/link'


export const NavLinks = () => {
    return <nav>
        <ul>
            {ROUTES.map((link) => {
                return (<li key={link.path}>
                    <Link href={link.path} className="nav-link">{link.name}</Link>
                </li>)
            })}
        </ul>
    </nav>
}