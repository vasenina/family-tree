import { useState } from "react";

export default function useTextInput() {
    const [userInput, setUserInput] = useState({});

    const handleChange = (e) => {
        console.log("useFormHandleChange", userInput);
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value,
        });
    };
    return [userInput, handleChange];
}
