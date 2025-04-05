import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
 	name:'auth',
	initialState:{
	token:null,
	isAdmin: false,
},

	reducers:{
		setCredentials:(state,action)=>{
			const {token} = action.payload;
			
			state.token = token;
			

		},

		setAdmin:(state,action)=>{
			const {isAdmin} =action.payload;

			state.isAdmin = action.payload;

		},	
		logOut: (state,action)=>{
			state.token = null

		}

	}
})


export const  {setCredentials,logOut,setAdmin} = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentAdmin = (state) => state.auth.isAdmin;
