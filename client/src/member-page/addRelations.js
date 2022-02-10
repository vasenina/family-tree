import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { addRelation } from "../redux/familyTree/slice.js";

import MemberPic from "../ui/memberPic";

export default function AddRelations({ id, close, type }) {
    // const currentMember = useSelector((state) => {
    //     return state.familyTree?.find((member) => member.id === id);
    // });
    // console.log(currentMember);
    const dispatch = useDispatch();

    const currentMemberRelations = useSelector((state) => {
        const member = state.familyTree?.find((member) => member.id === id);
        console.log(member);
        const relations = [].concat(
            member.parent ? member.parent : null,
            member.child ? member.child : null,
            member.spouse ? member.spouse : null,
            member.other ? member.other : null,
            member.sibling ? member.sibling : null,
            [id]
        );

        return relations;
    });

    const [selected, setSelected] = useState(0);

    const otherMembers = useSelector((state) => {
        return state.familyTree?.filter(
            (member) => currentMemberRelations.indexOf(member.id) == -1
        );
    });

    //console.log("otherMembers", otherMembers);

    //console.log("Form Relations:", currentMember);

    const closeModal = (e) => {
        if (e.target.classList.contains("overlay")) {
            close("");
        }
        return;
    };

    const selectMember = (id) => {
        console.log(id, "selected");
        setSelected(id);
    };

    const addRelation = () => {
        const newRelation = {
            member_id: id,
            relative_id: selected,
            type: type,
        };
        console.log("newRelation", newRelation);
        fetch("/api/add-relation", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRelation),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("add Relations: data from server", data);
                if (data.success) {
                    //dispatch hete
                    //  dispatch(addRelation(newRelation));
                    dispatch({
                        type: `family-tree/addRelation-${newRelation.type}`,
                        playload: newRelation,
                    });
                }
            })
            .catch((err) => {
                console.log("error", err);
            });

        close("");
    };

    return (
        <div className="overlay" onClick={closeModal}>
            <div className="modal">
                <h2>Choose a relative</h2>
                <div className="relatives-list margin-modal">
                    {otherMembers &&
                        otherMembers.map((member) => {
                            return (
                                <div
                                    key={member.id}
                                    onClick={() => selectMember(member.id)}
                                >
                                    <MemberPic
                                        imageUrl={member.image_url}
                                        css={
                                            member.id == selected
                                                ? "img_profile_small selected"
                                                : "img_profile_small"
                                        }
                                    />
                                </div>
                            );
                        })}
                </div>
                <button
                    className="btn-primary add-relations-btn"
                    onClick={addRelation}
                >
                    Add
                </button>
            </div>
        </div>
    );
}
