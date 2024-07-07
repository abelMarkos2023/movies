import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user:{},
    isAuthenticated:false,
    sessionId:""
}

 const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.sessionId = localStorage.getItem('session')
            localStorage.setItem('accountId',action.payload.id)  

        }
    }
})
export const {setUser} = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state) => state.user