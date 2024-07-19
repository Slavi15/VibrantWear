"use client"

import { useEffect } from "react";
import Link from "next/link";
import useLocalStorage from "../hooks/LocalStorage";
import styles from "@/styles/elements/CookieBanner.module.scss"

const CookieBanner = () => {
    const [value, setValue] = useLocalStorage("cookie", "");

    const saveToStorage = () => {
        setValue("shown");
    }

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const cookieComponent = document.getElementById("cookie") as HTMLDivElement;

            if (value === null)
                cookieComponent.style.display = 'flex';
            else
                cookieComponent.style.display = 'none';
        });

        return () => clearTimeout(timeout); // return disposable function
    }, [value])

    return (
        <div id="cookie" className={styles.cookieBanner} style={{ display: 'none' }}>
            <div className={styles.cookieText}>
                By using our website, you agree to our
                <Link href="/cookie-policy"
                    target="_blank"> Cookie Policy</Link>
            </div>
            <div className={styles.cookieButton}
                onClick={saveToStorage}>OK</div>
        </div>
    );
};

export default CookieBanner;