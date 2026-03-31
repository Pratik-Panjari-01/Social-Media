import { configureStore} from "@reduxjs/toolkit"
import messagesReducer from "../features/user/userSlice.js"
import connectionsReducer from "../features/connections/connectionSlice.js"
import userReducer from "../features/messages/messagesSlice.js"

export const store = configureStore({
    reducer: {
        user: userReducer,
        connections:connectionsReducer,
        messages:messagesReducer
    }
})

