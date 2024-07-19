import { useState } from "react";

const useLocalStorage = (key : string, value : string) => {
    const [state, setState] = useState(() => {
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : value;
        } catch (err) {
            console.log(err);
        }
    })

    const setValue = (value : any) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setState(value);
        } catch (err) {
            console.log(err);
        }
    }

    return [state, setValue]
};

export default useLocalStorage;