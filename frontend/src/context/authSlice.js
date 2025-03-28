import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
		name:'auth',
		initialState:{token:null},

		reducers:{
			setCredentials:(state,action)=>{
				const {token} = action.payload;
				state.token = token;

		},	
		logOut: (state,action)=>{
			state.token = null
		}

	}
})


export const  {setCredentials,logOut} = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token;

