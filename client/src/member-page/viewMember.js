import { useParams } from "react-router";
import { useState, useEffect } from "react";

import MemberRelatives from "./memberRelatives";
import PhotoUploader from "../ui/photoUploader";

export default function viewMember({}) {
    const { id } = useParams();
    const [member, setMember] = useState();
    const [error, setError] = useState();
    const [photoUploaderToggler, setPhotoUploaderToggler] = useState(false);

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
    // const memberPhoto = member?.image_url || "/default-member.png";
    //console.log(memberPhoto);
    const toggleUploader = () => {
        const toggle = !photoUploaderToggler;
        //console.log(uploader);
        setPhotoUploaderToggler(toggle);
    };

    // const toggl

    return (
        <>
            {error && <p>{error}</p>}
            {member && (
                <div className="member-view-container">
                    <div>
                        <img
                            src={member.image_url}
                            alt={`photo of ${member.first} ${member.last}`}
                        />
                        <div
                            className="btn change-photo"
                            onClick={toggleUploader}
                        >
                            {" "}
                            Change{" "}
                        </div>
                        {photoUploaderToggler && (
                            <PhotoUploader
                                memberId={id}
                                close={toggleUploader}
                            />
                        )}
                    </div>
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
