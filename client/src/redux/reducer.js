import { combineReducers } from "redux";
import familyTreeReducer from "./familyTree/slice.js";

const rootReducer = combineReducers({
    familyTree: familyTreeReducer,
    // friendsAndFans: friendsAndFansReducer,
    // chatMessages: chatMessagesReducer,
    // userProFile: userProfileReducer,
    // //chatMessages: chatMessagesReducer,
});

export default rootReducer;
