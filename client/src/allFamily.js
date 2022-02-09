import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import MemberPic from "./ui/memberPic";

export default function Family({ loading, error }) {
    const family = useSelector((state) => {
        return state.familyTree;
    });

    console.log("family", family);

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>Error</div>}
            <div className="main-family-screen">
                {family &&
                    family.map((member) => {
                        return (
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
        </>
    );
}
