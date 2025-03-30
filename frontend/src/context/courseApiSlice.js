import { apiSlice } from "./api/apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    formInstructor: builder.mutation({
      query: (credentials) => ({
        url: "api/validateInstructorForm",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ['Instructor']
    }),
    
    uploadingVideo: builder.mutation({
      query: (formData) => {
        return {
          url: "api/uploadingVideo",
          method: "POST",
          body: formData,
          
          headers: {}
        };
      },
      invalidatesTags: ['CourseVideos']
    }),
    
    
    
  }),
});

export const { 
  useFormInstructorMutation,
  useUploadingVideoMutation,
} = courseApiSlice;