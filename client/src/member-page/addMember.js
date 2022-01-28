import { useHistory, Redirect } from "react-router-dom";

import { useEffect, useState } from "react";

export default function AddMember({}) {
    const history = useHistory();

    useEffect(() => {
        console.log("add-member component mounted");
    }, []);

    return <div>Add Member</div>;
}
