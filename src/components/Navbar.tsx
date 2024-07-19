"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BsCircleHalf, BsBag } from "react-icons/bs";
import { Shadows_Into_Light } from "next/font/google";
import { VscMenu, VscChromeClose } from "react-icons/vsc";
import { useAppSelector } from "@/redux/store";
import { totalCartItemSelector } from "@/redux/features/cartSlice";

import styles from "../styles/Navbar.module.scss";

const shadowsIntoLight = Shadows_Into_Light({
    subsets: ['latin'],
    weight: '400',
});

const Navbar = () => {
    const totalItemsCount = useAppSelector(totalCartItemSelector);
    const [open, setOpen] = useState(true);
    const [details, setDetails] = useState(false);

    useEffect(() => {
        const header = document.getElementById('header') as HTMLElement;

        window.addEventListener('scroll', function() {
            if (this.window.scrollY > 0) {
                header.style.background = '#FFFFFF';
                header.style.boxShadow = 'rgba(149, 157, 165, 0.2) 0px 8px 24px';
            } else {
                header.style.background = 'transparent';
                header.style.boxShadow = '';
            };
        });
    }, []);

    const toggleNavbar = () => {
        const navbar = document.getElementById('navbar') as HTMLElement;

        if (window.innerWidth <= 750) {
            setOpen(!open);
            open ? navbar.style.right = '0' : navbar.style.right = '-100%';
        };
    };

    return (
        <div>
            <section className={styles.header} id="header">
                <div style={{ fontSize: 40 }} className={shadowsIntoLight.className}>VibrantWear</div>

                {/* <div className={styles.logo}>
                    <Image 
                        src="/images/logo.png"
                        width={120}
                        height={0}
                        style={{ maxWidth: '120px', height: 'auto' }}
                        priority={true}
                        alt="Logo" />
                </div> */}

                <ul className={styles.navbar} id="navbar">
                    <li>
                        <Link href="/" 
                            prefetch={true} 
                            onClick={toggleNavbar}>Home</Link>
                    </li>
                    <li>
                        <Link href="/store" 
                            prefetch={true} 
                            onClick={toggleNavbar}>Store</Link>
                    </li>
                    <li>
                        <Link href="/contact"
                            prefetch={true} 
                            onClick={toggleNavbar}>Contact</Link>
                    </li>
                </ul>

                <div className={styles.iconContainer}>
                    <Link href="/cart"
                        prefetch={true} 
                        style={{ verticalAlign: 'baseline' }}>
                        <BsBag className={styles.icon} />
                    </Link>
                    <div style={{ marginRight: '20px' }}>({totalItemsCount})</div>
                    { open ? 
                        <VscMenu onClick={toggleNavbar} className={styles.icon} id="navIcon" /> :
                        <VscChromeClose onClick={toggleNavbar} className={styles.icon} id="navIcon" /> }  
                </div>
            </section>

            {/* { details && <Checkout /> } */}
        </div>
    );
};

export default Navbar;