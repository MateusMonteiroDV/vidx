import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  instructorCourses: [], 
  selectedCourse: null
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    
    setInstructorCourses: (state, action) => {
      state.selectedCourse =  action.payload 
        
    },
    
    
    addInstructorCourse: (state, action) => {
      state.instructorCourses.push(action.payload);
    },
    
    resetCourses: (state) => {
      state.selectedCourse = [];
    }
  }
});

export const { setInstructorCourses, addInstructorCourse, resetCourses } = courseSlice.actions;
export default courseSlice.reducer;