import InputField from "./ui/inputField";
import useTextInput from "./hooks/useTextInput";
import useFormSubmit from "./hooks/useFormSubmit";

export default function Welcome() {
    const [values, handleChange] = useTextInput();
    const fieldNames = ["email", "password"];

    const [submit, error] = useFormSubmit("/login.json", values, fieldNames);
    return (
        <div className="welcome-container">
            <h1>All Your Family here</h1>
            {error && <h2 className="error">{error}</h2>}
            <form>
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                />
                <button onClick={submit} className="btn-primary">
                    See my Family
                </button>
            </form>
        </div>
    );
}
