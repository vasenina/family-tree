import { useHistory, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import useTextInput from "../hooks/useTextInput";

import MemberPic from "../ui/memberPic";
import InputField from "../ui/inputField";

export default function AddMember({}) {
    const history = useHistory();
    const [values, handleChange] = useTextInput();

    useEffect(() => {
        console.log("add-member component mounted");
    }, []);

    const addMemberClick = (e) => {
        e.preventDefault();
        console.log("add member", values);

        fetch("/api/add-member", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("AddMember:data from server", data);
            })
            .catch((err) => {
                console.log("error addMember", err);
            });
    };

    return (
        <div>
            Add Member
            <form>
                <MemberPic size="big" />
                <InputField
                    label="last"
                    name="last"
                    type="text"
                    onChange={handleChange}
                />
                <InputField
                    label="first"
                    name="first"
                    type="text"
                    onChange={handleChange}
                />
                <InputField
                    label="image_url"
                    name="image_url"
                    type="text"
                    onChange={handleChange}
                />
                <button onClick={addMemberClick}>Add Member</button>
            </form>
            <></>
        </div>
    );
}
