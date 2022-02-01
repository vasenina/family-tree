export default function familyTreeReducer(familyTree = [], action) {
    if (action.type == "family-tree/receivedTree") {
        familyTree = action.payload.tree;
    }

    if (action.type == "family-tree/changePhoto") {
        console.log(action.playload);
        const newFamilyTree = familyTree.map((member) => {
            console.log("Family TRee map ", member.id, action.playload.data.id);
            if (member.id == action.playload.data.id) {
                console.log("action.playload.data", action.playload.data);
                const newMember = {
                    ...member,
                    image_url: action.playload.data.url,
                };
                console.log("newMember", newMember);
                return newMember;
            }
            return member;
        });
        return newFamilyTree;
    }

    if (action.type == "family-tree/addRelation-sibling") {
        // console.log("from slice", action.playload);
        const newFamilyTree = familyTree.map((member) => {
            if (member.id == action.playload.member_id) {
                const newSibling = member.sibling
                    ? [...member.sibling, action.playload.relative_id]
                    : [action.playload.relative_id];
                const newMember = { ...member, sibling: newSibling };
                return newMember;
            } else if (member.id == action.playload.relative_id) {
                const newSibling = member.sibling
                    ? [...member.sibling, action.playload.member_id]
                    : [action.playload.member_id];

                const newMember = { ...member, sibling: newSibling };
                return newMember;
            }
            return member;
        });
        return newFamilyTree;
    }

    if (action.type == "family-tree/addRelation-other") {
        //console.log("from slice", action.playload);
        const newFamilyTree = familyTree.map((member) => {
            if (member.id == action.playload.member_id) {
                const newOther = member.other
                    ? [...member.other, action.playload.relative_id]
                    : [action.playload.relative_id];
                const newMember = { ...member, other: newOther };
                return newMember;
            } else if (member.id == action.playload.relative_id) {
                const newOther = member.other
                    ? [...member.other, action.playload.member_id]
                    : [action.playload.member_id];

                const newMember = { ...member, other: newOther };
                return newMember;
            }
            return member;
        });
        return newFamilyTree;
    }

    if (action.type == "family-tree/addRelation-spouse") {
        //console.log("from slice", action.playload);
        const newFamilyTree = familyTree.map((member) => {
            if (member.id == action.playload.member_id) {
                const newSpouse = member.spouse
                    ? [...member.spouse, action.playload.relative_id]
                    : [action.playload.relative_id];
                const newMember = { ...member, spouse: newSpouse };
                return newMember;
            } else if (member.id == action.playload.relative_id) {
                const newSpouse = member.spouse
                    ? [...member.spouse, action.playload.member_id]
                    : [action.playload.member_id];

                const newMember = { ...member, spouse: newSpouse };
                return newMember;
            }
            return member;
        });
        return newFamilyTree;
    }

    if (action.type == "family-tree/addRelation-parent") {
        console.log("from slice - parent", action.playload);
        const newFamilyTree = familyTree.map((member) => {
            if (member.id == action.playload.member_id) {
                const newChild = member.child
                    ? [...member.child, action.playload.relative_id]
                    : [action.playload.relative_id];
                const newMember = { ...member, child: newChild };
                return newMember;
            } else if (member.id == action.playload.relative_id) {
                const newParent = member.parent
                    ? [...member.parent, action.playload.member_id]
                    : [action.playload.member_id];

                const newMember = { ...member, parent: newParent };
                return newMember;
            }
            return member;
        });
        return newFamilyTree;
    }

    if (action.type == "family-tree/addRelation-child") {
        console.log("from slice - child", action.playload);
        const newFamilyTree = familyTree.map((member) => {
            if (member.id == action.playload.relative_id) {
                const newChild = member.child
                    ? [...member.child, action.playload.member_id]
                    : [action.playload.member_id];
                const newMember = { ...member, child: newChild };
                return newMember;
            } else if (member.id == action.playload.member_id) {
                const newParent = member.parent
                    ? [...member.parent, action.playload.relative_id]
                    : [action.playload.relative_id];

                const newMember = { ...member, parent: newParent };
                return newMember;
            }
            return member;
        });
        return newFamilyTree;
    }

    return familyTree;
}

export function receiveFamily(tree) {
    return {
        type: "family-tree/receivedTree",
        payload: { tree },
    };
}

// export function makeFriend(id) {
//     return {
//         type: "friends-and-fans/accept",
//         playload: { id },
//     };
// }

export function changePhotoById(data) {
    return {
        type: "family-tree/changePhoto",
        playload: { data },
    };
}

export function addRelation(relation, who) {
    console.log("slice, relation", relation);
    return {
        type: "family-tree/addRelation-" + who,
        playload: { relation },
    };
}
