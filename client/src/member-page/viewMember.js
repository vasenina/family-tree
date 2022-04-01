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
    const changePhoto = (image) => {
        let updMember = { ...member };
        updMember.image_url = image;
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
                                className="photo-view"
                            />
                            <div
                                className="btn-primary photo-change__button"
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
                                    photoChanger={changePhoto}
                                />
                            )}
                        </div>
                        <section className="bio-container">
                            <div
                                className="btn bio-edit-member__button icon-tree"
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
                            <div className="bio-date">
                                {member.birth && (
                                    <DayJS
                                        format="DD MMM YYYY"
                                        className="bio-date__text"
                                    >
                                        {member.birth}
                                    </DayJS>
                                )}
                                {!member.birth && (
                                    <p className="bio-date__text">--/--/----</p>
                                )}

                                <p className="bio-date__text">{"  -  "}</p>
                                {member.death && (
                                    <DayJS
                                        format="DD MMM YYYY"
                                        className="bio-date__text"
                                    >
                                        {member.death}
                                    </DayJS>
                                )}
                                {!member.death && (
                                    <p className="bio-date__text">--/--/----</p>
                                )}
                            </div>
                            <p className="bio-date__text">
                                City: {member.city || "--------"}
                            </p>
                            <p className="bio-date__text">{member.bio}</p>
                        </section>
                        <section className="bio-date__text">
                            <MemberRelatives
                                id={member.id}
                                addRelations={addRelativesToggler}
                            />
                        </section>
                    </div>
                    <section>
                        <MemberWall id={id} />
                    </section>
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
