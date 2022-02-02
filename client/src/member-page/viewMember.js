import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DayJS from "react-dayjs";

import MemberRelatives from "./memberRelatives";
import PhotoUploader from "../ui/photoUploader";
import AddRelations from "./addRelations";
import BioEditor from "../ui/bioEditor";
import MemberWall from "./memberWall";

export default function viewMember({}) {
    const { id } = useParams();
    const [member, setMember] = useState();
    const [error, setError] = useState();
    const [photoUploaderToggler, setPhotoUploaderToggler] = useState(false);
    const [editBioToggler, setEditBioToggler] = useState(false);
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

    const toggleEditBio = () => {
        const toggle = !editBioToggler;
        setEditBioToggler(toggle);
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

    const changeBio = (values) => {
        console.log("new Values", values);
        let updMember = { ...member };
        for (let prop in values) {
            updMember[prop] = values[prop];
        }
        console.log(updMember);
        setMember(updMember);
        return;
    };

    return (
        <>
            {error && <p>{error}</p>}
            {member && (
                <div>
                    <div className="member-view-container">
                        <div className="photo-container">
                            <Link to={`/member-tree/${id}`}>
                                <div className="btn-primary tree-btn">
                                    <img
                                        src="/family-tree.svg"
                                        className="icon-btn icon-tree"
                                    />
                                </div>
                            </Link>
                            <img
                                src={
                                    member.image_url ||
                                    "/default-member-big.png"
                                }
                                alt={`photo of ${member.first} ${member.last}`}
                                className="view-photo"
                            />
                            <div
                                className="btn-primary change-photo"
                                onClick={toggleUploader}
                            >
                                <img
                                    src="/photo.svg"
                                    className="icon-btn icon-tree"
                                />
                            </div>
                            {photoUploaderToggler && (
                                <PhotoUploader
                                    memberId={id}
                                    close={toggleUploader}
                                />
                            )}
                        </div>
                        <div className="bio-container">
                            <div
                                className="btn edit-member-btn icon-tree"
                                onClick={toggleEditBio}
                            >
                                <img
                                    src="/edit-icon.svg"
                                    className="icon-btn"
                                />
                            </div>
                            {editBioToggler && (
                                <BioEditor
                                    member={member}
                                    close={toggleEditBio}
                                    bioChanger={changeBio}
                                />
                            )}
                            <h1>
                                {member.first} {member.last}
                            </h1>
                            <div className="date-view">
                                {member.birth && (
                                    <DayJS
                                        format="DD MMM YYYY"
                                        className="date-text"
                                    >
                                        {member.birth}
                                    </DayJS>
                                )}
                                {!member.birth && (
                                    <p className="date-text">--/--/----</p>
                                )}

                                <p className="date-text"> - </p>
                                {member.death && (
                                    <DayJS
                                        format="DD MMM YYYY"
                                        className="date-text"
                                    >
                                        {member.death}
                                    </DayJS>
                                )}
                                {!member.death && (
                                    <p className="date-text">--/--/----</p>
                                )}
                            </div>
                            <p className="bio-text">
                                City: {member.city || "--------"}
                            </p>
                            <p className="bio-text">{member.bio}</p>
                        </div>
                        <div className="relatives-box">
                            <MemberRelatives
                                id={member.id}
                                addRelations={addRelativesToggler}
                            />
                        </div>
                    </div>
                    <MemberWall />
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
