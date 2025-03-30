import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import {setInstructorCourses, addInstructorCourse } from "../../context/courseSlice.js";
import { useFormInstructorMutation } from "../../context/courseApiSlice.js";
import {selectFirstCourseId} from "../../context/courseSlice.js";
import {useSelector} from "react-redux"

export default function InstructorForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [formInstructor] = useFormInstructorMutation();

  const defaulCourse = useSelector(selectFirstCourseId)

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title_course', title);
      formData.append('desc_course', description);
      formData.append('image', file);

      const response = await formInstructor(formData).unwrap();
      
      console.log(response)
      dispatch(addInstructorCourse(
           response.id_course));
      
      dispatch(setInstructorCourses(defaulCourse))

      navigate("/createCourse")

    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto min-w-[500px] p-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-4xl font-bold">Create your course</CardTitle>
        <CardDescription className="text-lg">
          Enter the course details and upload a thumbnail.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Course title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-6 text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              placeholder="Course description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-6 text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Upload Thumbnail</Label>
            <Input
              name="image"
              id="image"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full py-6 text-lg"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full py-4 text-xl"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Course"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}