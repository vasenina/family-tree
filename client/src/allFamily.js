//import ProfilePic from "./profilePic";

import { useHistory, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Family({}) {
    const history = useHistory();

    useEffect(() => {}, []);

    return (
        <div className="main-family-screen">
            <Link to="/add-member">
                <button className="big-btn">add</button>
            </Link>
        </div>
    );
}
