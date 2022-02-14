import useFetch from "../hooks/useFetch";
import { useState } from "react";

import useTextInput from "../hooks/useTextInput";

export default function MemberWall({ id }) {
    const { data, loading, error } = useFetch(`/api/wall/${id}`);
    const [values, handleChange] = useTextInput();

    const print = () => {
        // сonsole.log("wall DATA");
        if (loading) return <>Loading....</>;
        if (error) return <>{error}</>;
        if (data.success) return <>{data.wall && <>Here will be a wall</>}</>;

        return <>print</>;
    };

    const addNewMemory = (e) => {
        e.preventDefault();
        console.log("button clicked");
        fetch(`/api/wall/${id}/new-post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                //console.log(data);
                if (data.success) {
                    console.log(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log("dasjkdhjk", data);
    return (
        <div className="wall-container">
            <h2>Memories</h2>
            {print()}
            <form>
                <textarea
                    name="memory"
                    rows="4"
                    className="bio-editor-textarea"
                    maxLength="300"
                    onChange={handleChange}
                />
                <button onClick={addNewMemory}>Add Memory</button>
            </form>
        </div>
    );
}
