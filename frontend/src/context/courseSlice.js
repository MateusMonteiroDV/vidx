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


export const selectAllCourseIds = (state)=> state.course.instructorCourses

export const selectCurrentCourseId = (state)=> state.course.selectedCourse

export const selectFirstCourseId =(state)=> state.course.instructorCourses[0];
