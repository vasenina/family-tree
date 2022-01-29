import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MemberPic from "../ui/memberPic";

export default function MemberRelatives({ id }) {
    const currentMember = useSelector((state) => {
        return state.familyTree?.find((member) => member.id === id);
    });

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
        if (relatives.length <= 0) {
            return <></>;
        } else {
            console.log("hee");
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
                </div>
            );
        }
    };
    return (
        <>
            relatives
            {returnRelativesList(parents, "parents")}
            {returnRelativesList(siblings, "siblings")}
            {returnRelativesList(children, "children")}
            {returnRelativesList(spouse, "spouse")}
            {returnRelativesList(other, "other")}
        </>
    );
}
