import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("@/components/ContactForm.tsx"));

import styles from "@/styles/Contact.module.scss";

const Contact = () => {
    return (
        <div>
            <section className={styles.banner}>
                <div className={styles.h2}>#get in touch</div>
            </section>

            <div style={{ padding: '40px 15%' }}>
                <ContactForm />
            </div>
        </div>
    );
};

export default Contact;