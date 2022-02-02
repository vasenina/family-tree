import useTextInput from "../hooks/useTextInput";
import InputField from "./inputField";

import dayjs from "dayjs";

export default function BioEditor({ member, close, bioChanger }) {
    const [values, handleChange] = useTextInput();
    console.log("ID edit bio", member.id);

    const editMemberClick = (e) => {
        e.preventDefault();

        fetch(`/api/update-bio/${member.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    // console.log("Editor call biochanger", bioChanger);
                    //dispatch new first and last
                    //location.reload();
                    bioChanger(values);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        close();
    };

    console.log("Dayjs", dayjs(member.birth).format("YYYY-MM-DD"));
    return (
        <form className="bio-editor-container">
            <div className="line">
                <InputField
                    label="first"
                    name="first"
                    type="text"
                    onChange={handleChange}
                    value={member.first}
                />
                <InputField
                    label="last"
                    name="last"
                    type="text"
                    onChange={handleChange}
                    value={member.last}
                />
            </div>
            <div className="line">
                <InputField
                    label="birth"
                    name="birth"
                    type="date"
                    onChange={handleChange}
                    value={dayjs(member.birth).format("YYYY-MM-DD")}
                />
                <InputField
                    label="death"
                    name="death"
                    type="date"
                    onChange={handleChange}
                    value={dayjs(member.death).format("YYYY-MM-DD")}
                />
            </div>
            <div className="line">
                <InputField
                    label="city"
                    name="city"
                    type="text"
                    onChange={handleChange}
                    value={member.city}
                />
            </div>
            <textarea
                defaultValue={member.bio}
                name="bio"
                rows="4"
                className="bio-editor-textarea"
                maxLength="300"
                onChange={handleChange}
            />

            <div className="line">
                <button onClick={close}>Cancel</button>
                <button onClick={editMemberClick} className="btn-primary">
                    Update
                </button>
            </div>
        </form>
    );
}
