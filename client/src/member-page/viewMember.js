import { useParams } from "react-router";
import { useState, useEffect } from "react";

import MemberRelatives from "./memberRelatives";

export default function viewMember({}) {
    const { id } = useParams();
    const [member, setMember] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        //get all info about user from db
        fetch(`/api/member/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setMember(data.member);
                } else {
                    setError("User did not found");
                }
            })
            .catch((err) => {
                console.log("error");
            });
    }, []);
    const memberPhoto = member?.image_url || "/default-member.png";
    console.log(memberPhoto);
    return (
        <>
            {error && <p>{error}</p>}
            {member && (
                <div className="member-view-container">
                    <img
                        src={memberPhoto}
                        alt={`photo of ${member.first} ${member.last}`}
                    />
                    <div className="bio-container">
                        <h1>
                            {member.first} {member.last}
                        </h1>
                        <MemberRelatives id={member.id} />
                    </div>
                </div>
            )}
        </>
    );
}
