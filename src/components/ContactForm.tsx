"use client"

import axios from "axios";
import { BsArrowRight } from "react-icons/bs";
import { Formik, Form, useField, FieldHookConfig, FormikValues, FormikHelpers } from "formik";
import * as Yup from "yup";

import styles from "../styles/ContactForm.module.scss";

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    textMessage: string;
};

interface TextInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    id?: string;
};

const TextInput = ({ label, ...props }: TextInputProps) => {
    const [field, meta] = useField(props);

    return (
        <div className={styles.textInput}>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className={styles.textInputField} {...field} {...props}></input>
            {meta.touched && field.value && meta.error ? (
                <div className={styles.errorMessage}>{meta.error}</div>
            ) : null}
        </div>
    );
};

const ContactForm = () => {
    const handleSubmit = async (values: FormValues) => {
        const data: FormValues = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            textMessage: values.textMessage
        };

        await axios.post("some_url", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    };

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                textMessage: ''
            }}
            validationSchema={Yup.object({
                firstName: Yup.string()
                    .trim()
                    .min(2, "Minimum 2 characters needed!")
                    .required("Required field!"),
                lastName: Yup.string()
                    .trim()
                    .min(2, "Minimum 2 characters needed!")
                    .required("Required field!"),
                email: Yup.string()
                    .trim()
                    .email("Invalid email address!")
                    .required("Required field!"),
                textMessage: Yup.string()
                    .trim()
                    .min(10, "Minimum 10 characters needed!")
                    .required("Required field!")
            })}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form className={styles.form}>
                    <div className={styles.formHeader}>
                        <TextInput label="First name"
                            name="firstName"
                            type="text"
                            placeholder="John" />

                        <TextInput label="Last name"
                            name="lastName"
                            type="text"
                            placeholder="Doe" />
                    </div>

                    <TextInput label="Email"
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com" />

                    <TextInput label="Your message"
                        name="textMessage"
                        type="text"
                        placeholder="We are happy to hear from you!" />

                    <button className={styles.formButton} disabled={isSubmitting}>
                        Send <BsArrowRight className={styles.arrowIcon} />
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;