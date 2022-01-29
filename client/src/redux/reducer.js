import { combineReducers } from "redux";
import familyTreeReducer from "./familyTree/slice.js";
import userProfileReducer from "./userProfile/slice.js";

const rootReducer = combineReducers({
    familyTree: familyTreeReducer,
    userProfile: userProfileReducer,
    // friendsAndFans: friendsAndFansReducer,
    // chatMessages: chatMessagesReducer,
    // userProFile: userProfileReducer,
    // //chatMessages: chatMessagesReducer,
});

export default rootReducer;
