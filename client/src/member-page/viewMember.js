import { useParams } from "react-router";
import { useState, useEffect } from "react";

import MemberRelatives from "./memberRelatives";
import PhotoUploader from "../ui/photoUploader";
import AddRelations from "./addRelations";

export default function viewMember({}) {
    const { id } = useParams();
    const [member, setMember] = useState();
    const [error, setError] = useState();
    const [photoUploaderToggler, setPhotoUploaderToggler] = useState(false);
    const [addRelativesIsVisible, setAddRelativesIsVisible] = useState(false);
    const [relationType, setRelationType] = useState();

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

    const addRelativesToggler = (type) => {
        let relationType = type;
        if (type == "parent") {
            relationType = "child";
        } else if (type == "child") {
            relationType = "parent";
        }
        setRelationType(relationType);
        console.log("inside viewMembers", relationType);
        setAddRelativesIsVisible(!addRelativesIsVisible);
    };

    console.log("state", relationType);
    // const togg

    return (
        <>
            {error && <p>{error}</p>}
            {member && (
                <div className="member-view-container">
                    <div>
                        <img
                            src={member.image_url || "/default-member.png"}
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
                        <MemberRelatives
                            id={member.id}
                            addRelations={addRelativesToggler}
                        />
                    </div>
                </div>
            )}
            {addRelativesIsVisible && (
                <AddRelations
                    id={member.id}
                    close={addRelativesToggler}
                    type={relationType}
                />
            )}
        </>
    );
}
