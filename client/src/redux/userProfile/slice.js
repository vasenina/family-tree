export default function userProfileReducer(familyTree = [], action) {
    if (action.type == "user-profile/receivedProfile") {
        familyTree = action.payload.tree;
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

export function receiveProfile(tree) {
    return {
        type: "user-profile/receivedProfile",
        payload: { tree },
    };
}

// export function makeFriend(id) {
//     return {
//         type: "friends-and-fans/accept",
//         playload: { id },
//     };
// }

// export function endFriendship(id) {
//     return {
//         type: "friends-and-fans/end-friendship",
//         playload: { id },
//     };
// }
