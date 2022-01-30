export default function familyTreeReducer(familyTree = [], action) {
    if (action.type == "family-tree/receivedTree") {
        familyTree = action.payload.tree;
    }

    if (action.type == "family-tree/changePhoto") {
        console.log(action.playload);
        const newFamilyTree = familyTree.map((member) => {
            if (member.id === action.playload.data.id) {
                const newMember = {
                    ...member,
                    image_url: action.playload.data.url,
                };
                return newMember;
            }
            return member;
        });
        return newFamilyTree;
    }

    // if (action.type === "friends-and-fans/accept") {
    //     const newFriendsAndFans = friendsAndFans.map((friend) => {
    //         if (friend.id == action.playload.id) {
    //             const newFriend = { ...friend, accepted: true };
    //             return newFriend;
    //         }
    //         return friend;
    //     });
    //     return newFriendsAndFans;
    // }

    // if (action.type === "friends-and-fans/end-friendship") {
    //     const newFriendsAndFans = friendsAndFans.filter(
    //         (friend) => friend.id !== action.playload.id
    //     );
    //     return newFriendsAndFans;
    // }
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

// export function endFriendship(id) {
//     return {
//         type: "friends-and-fans/end-friendship",
//         playload: { id },
//     };
// }
