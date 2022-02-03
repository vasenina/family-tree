import { useHistory, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useTextInput from "../hooks/useTextInput";

import MemberPic from "../ui/memberPic";
import InputField from "../ui/inputField";
import { addMember } from "../redux/familyTree/slice.js";

export default function AddMember({}) {
    const dispatch = useDispatch();
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

        dispatch(addMember(member));

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
            if (values.city) {
                fd.append("city", values.city);
            }
            if (values.bio) {
                fd.append("bio", values.bio);
            }
            if (values.birth) {
                fd.append("birth", values.birth);
            }
            if (values.death) {
                fd.append("birth", values.death);
            }

            fetch("/api/add-member-and-photo", {
                method: "POST",
                body: fd,
            })
                .then((res) => {
                    console.log(res);
                    res.json();
                })
                .then((data) => {
                    console.log("response photo", data);
                    if (data.success) {
                        addingUserToRedux(data.newMember);
                        // location.assign(`/member/${data.id}`);

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
                    console.log("response", data);
                    console.log("AddMember:data from server", data);
                    if (data.success) {
                        addingUserToRedux(data.newMember);
                        //add a user to redux
                        //location.assign(`/member/${data.id}`);
                    }
                })
                .catch((err) => {
                    console.log("error addMember", err);
                });
        }
    };

    return (
        <div>
            <form className="add-member-container ">
                <div>
                    <div>
                        <MemberPic size="big" />
                    </div>
                    <input
                        className="input-file"
                        type="file"
                        accept="image/*"
                        onChange={getPhoto}
                    />
                    <InputField
                        label="Image URL"
                        name="image_url"
                        type="text"
                        onChange={handleChange}
                    />
                </div>
                <div className=" flex-center">
                    <div className="bio-container">
                        <div className="line">
                            <InputField
                                label="First Name"
                                name="first"
                                type="text"
                                onChange={handleChange}
                            />
                            <InputField
                                label="Last Name"
                                name="last"
                                type="text"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="line">
                            <InputField
                                label="Birth"
                                name="birth"
                                type="date"
                                onChange={handleChange}
                            />
                            <InputField
                                label="Death"
                                name="death"
                                type="date"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="line">
                            <InputField
                                label="City"
                                name="city"
                                type="text"
                                onChange={handleChange}
                            />
                        </div>
                        <textarea
                            defaultValue={""}
                            name="bio"
                            rows="4"
                            className="bio-editor-textarea add-member-bio"
                            maxLength="300"
                            onChange={handleChange}
                        />

                        <button
                            onClick={addMemberClick}
                            className="btn-primary add-member-btn "
                        >
                            Add Member
                        </button>
                    </div>
                </div>
            </form>
            <></>
        </div>
    );
}
