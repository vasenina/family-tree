import { useHistory, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import useTextInput from "../hooks/useTextInput";

import MemberPic from "../ui/memberPic";
import InputField from "../ui/inputField";

export default function AddMember({}) {
    const history = useHistory();
    const [values, handleChange] = useTextInput();
    const [file, setFile] = useState();

    useEffect(() => {
        console.log("add-member component mounted");
    }, []);

    const getPhoto = (e) => {
        //console.log("user changed a photo");

        console.log("fileselecthandler", e.target.files[0]);
        setFile(e.target.files[0]);
    };
    const addingUserToRedux = (member) => {
        //
        console.log("server sent me this member: ", member);

        location.assign(`/member/${member.id}`);
    };

    const addMemberClick = (e) => {
        e.preventDefault();
        console.log("add member", values);

        if (file) {
            const fd = new FormData();
            fd.append("file", file);
            if (values.first) {
                fd.append("first", values.first);
            }
            if (values.last) {
                fd.append("last", values.last);
            }

            fetch("/api/add-member-and-photo", {
                method: "POST",
                body: fd,
            })
                .then((res) => {
                    res.json();
                })
                .then((data) => {
                    if (data.success) {
                        addingUserToRedux(data.newMember);

                        //add a user to redux
                    }
                    console.log(data);
                })
                .catch((err) => {
                    console.log("error", err);
                });
        } else {
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
                    addingUserToRedux(data.newMember);
                    //add a user to redux
                })
                .catch((err) => {
                    console.log("error addMember", err);
                });
        }
    };

    return (
        <div>
            Add Member
            <form>
                <MemberPic size="big" />
                <input
                    className="input-file"
                    type="file"
                    accept="image/*"
                    onChange={getPhoto}
                />
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
