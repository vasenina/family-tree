export default function InputField({ label, name, type, onChange, value }) {
    //console.log("InputValue", value);
    return (
        <div className="input_group">
            <label htmlFor={name} className="input_label">
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                className="input_field"
                onChange={onChange}
                defaultValue={value}
            />
        </div>
    );
}
