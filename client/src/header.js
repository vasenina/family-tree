//import ProfilePic from "./profilePic";
import Logo from "./UI/logo";
import { useHistory, Redirect } from "react-router-dom";

import { useEffect, useState } from "react";
export default function Header({}) {
    const history = useHistory();

    useEffect(() => {}, []);

    return (
        <div className="header">
            <Logo />
            <div>
                {/* <ProfilePic
                    imageUrl={imageUrl}
                    first={first}
                    last={last}
                    action={toggleUploader}
                    size="small"
                /> */}

                <img
                    src="/logout-icon.svg"
                    className="icon-btn"
                    onClick={() => {
                        console.log("logout clicked");
                        fetch("/logout", {})
                            .then(() => {
                                //location.assign("/login");
                            })
                            .catch((err) => {
                                console.log("logout error", err);
                            });
                    }}
                />
            </div>
        </div>
    );
}
