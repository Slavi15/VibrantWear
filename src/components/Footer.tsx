import Link from "next/link";
import styles from "@/styles/Footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Link href="/privacy-policy" 
                    prefetch={true}
                    target="_blank" 
                    rel="noopener noreferrer">Privacy Policy</Link>
            <Link href="/terms-conditions" 
                    prefetch={true}
                    target="_blank" 
                    rel="noopener noreferrer">Terms & Conditions</Link>
            <Link href="https://www.returnpolicy.com/policy?id=1ve4fez0f6j65gwvtwnn" 
                    prefetch={true}
                    target="_blank" 
                    rel="noopener noreferrer">Return Policy</Link>
        </div>
    );
};

export default Footer;