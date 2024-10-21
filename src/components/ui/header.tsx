import React from 'react';
import { H1, H2 } from '../tags/textTags';
import { Link } from 'react-router-dom';

interface HeaderProps {
    className?: string;
}

const headerMenu = [
    {
        label: "home",
        path: "/"
    },
    {
        label: "top",
        path: "/top"
    },
    {
        label: "ask",
        path: "/ask"
    },
    {
        label: "showcase",
        path: "/showcase"
    },
]

const Header: React.FC<HeaderProps> = ({ className = "" }) => {

    return (
        <header className={`header ${className}`}>
            <div className="logo">
                <Link to="/"><H2 text="Hacker News" className="header-title" /></Link>
            </div>
            <nav>
                <ul className="header-nav">
                    {headerMenu.map((header, index) => (
                        <li key={index}>
                            <a href={header.path}>{header.label}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
