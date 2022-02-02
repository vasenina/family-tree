//import ProfilePic from "./profilePic";

import { useHistory, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MemberPic from "./ui/memberPic";

export default function Family({}) {
    const history = useHistory();

    const family = useSelector((state) => {
        return state.familyTree;
    });

    console.log("family", family);
    useEffect(() => {}, []);

    return (
        <div className="main-family-screen">
            {family &&
                family.map((member) => {
                    return (
                        // <div key={member.id}> </div>
                        <MemberPic
                            key={member.id}
                            first={member.first}
                            last={member.last}
                            imageUrl={member.image_url}
                            css="img_profile_big"
                            action={() => {
                                location.assign(`/member/${member.id}`);
                            }}
                        />
                    );
                })}
            <Link to="/add-member">
                <button className="big-btn"></button>
            </Link>
        </div>
    );
}
