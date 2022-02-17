import useFetch from "../hooks/useFetch";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import useTextInput from "../hooks/useTextInput";

export default function MemberWall({ id }) {
    const { data, loading, error } = useFetch(`/api/wall/${id}`);
    const [values, handleChange] = useTextInput();
    const [memories, setMemories] = useState();
    const [sender, setSender] = useState({
        last: "Peter",
        first: "Mayo",
        id: "620ec9a86a5c018402847b01",
    });
    const textAreValueRef = useRef();

    useEffect(() => {
        setMemories(data.wall);
    }, [data]);

    const showWall = () => {
        if (loading) return <>Loading....</>;
        if (error) return <>{error}</>;

        if (data.success)
            return (
                <>
                    {memories &&
                        memories.map((m) => {
                            return (
                                <div className="memory-container" key={m._id}>
                                    {m.memory_text}
                                    <div>
                                        <a href={`/member/${m.sender_id.id}`}>
                                            {m.sender_id.last}{" "}
                                            {m.sender_id.first}
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                </>
            );

        return <>print</>;
    };

    const addNewMemory = (e) => {
        e.preventDefault();
        console.log("button clicked");
        fetch(`/api/wall/${id}`, {
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
                    const addedMemory = {
                        ...data.newMemory,
                        sender_id: sender,
                    };

                    setMemories([addedMemory, ...memories]);
                    textAreValueRef.current.value = "";

                    //clear fields
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="wall-container">
            <h2>Memories</h2>
            {showWall()}
            <form className="wall-memory-form">
                <textarea
                    name="memory"
                    rows="4"
                    className="wall-textarea"
                    maxLength="300"
                    onChange={handleChange}
                    ref={textAreValueRef}
                />
                <button onClick={addNewMemory} className="btn-primary">
                    Add Memory
                </button>
            </form>
        </div>
    );
}
