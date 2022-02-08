import useFetch from "../hooks/useFetch";
import { useState } from "react";

export default function MemberWall({ id }) {
    const { data, loading, error } = useFetch(`/api/get-wall/${id}`);

    const print = () => {
        // сonsole.log("wall DATA");
        return <>print</>;
    };

    console.log("dasjkdhjk", data);
    return (
        <div className="wall-container">
            <h2>Memories</h2>
            {print()}
        </div>
    );
}
