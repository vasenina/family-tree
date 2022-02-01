import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MemberPic from "../ui/memberPic";

export default function MemberRelatives({ id, addRelations }) {
    const currentMember = useSelector((state) => {
        return state.familyTree?.find((member) => member.id === id);
    });

    // console.log("from MemberRelatives", currentMember);

    const parents = useSelector((state) => {
        return state.familyTree?.filter(
            (member) => currentMember.parent?.indexOf(member.id) > -1
        );
    });

    const spouse = useSelector((state) => {
        return state.familyTree?.filter(
            (member) => currentMember.spouse?.indexOf(member.id) > -1
        );
    });
    const siblings = useSelector((state) => {
        return state.familyTree?.filter(
            (member) => currentMember.sibling?.indexOf(member.id) > -1
        );
    });

    const other = useSelector((state) => {
        return state.familyTree?.filter(
            (member) => currentMember.other?.indexOf(member.id) > -1
        );
    });

    const children = useSelector((state) => {
        return state.familyTree?.filter(
            (member) => currentMember.child?.indexOf(member.id) > -1
        );
    });

    const returnRelativesList = (relatives, type) => {
        // console.log("return List", type);
        if (relatives.length <= 0) {
            return (
                <div className="relatives-list ">
                    {type}{" "}
                    <button
                        className="btn-primary add-btn"
                        onClick={() => {
                            console.log("here is a type", type);
                            addRelations(type);
                        }}
                    ></button>
                </div>
            );
        } else {
            return (
                <div className="relatives-list ">
                    {type}
                    {relatives.map((member) => {
                        return (
                            <div key={member.id}>
                                <MemberPic
                                    imageUrl={member.image_url}
                                    css="img_profile_small"
                                    action={() => {
                                        location.assign(`/member/${member.id}`);
                                    }}
                                />
                            </div>
                        );
                    })}
                    <button
                        className="btn-primary add-btn"
                        onClick={() => {
                            console.log("here is a type", { type });
                            addRelations(type);
                        }}
                    ></button>
                </div>
            );
        }
    };
    return (
        <div className="relatives-container">
            relatives
            {returnRelativesList(parents, "parent")}
            {returnRelativesList(siblings, "sibling")}
            {returnRelativesList(children, "child")}
            {returnRelativesList(spouse, "spouse")}
            {/* {returnRelativesList(other, "other")} */}
            <Link to={`/member-tree/${id}`}>
                <button className="btn-primary ">Show Tree</button>
            </Link>
        </div>
    );
}
