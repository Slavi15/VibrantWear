import { useState, useEffect } from "react";

const useLocalStorage = (key: string, value: string) => {
    const [state, setState] = useState(() => {
        if (typeof window === "undefined") {
            return value; // Return initial value on server side
        }

        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : value;
        } catch (err) {
            console.log(err);
        }
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                window.localStorage.setItem(key, JSON.stringify(state));
            } catch (err) {
                console.log(err);
            }
        }
    }, [key, state]);

    const setValue = (value: any) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setState(value);
        } catch (err) {
            console.log(err);
        }
    }

    return [state, setValue];
};

export default useLocalStorage;