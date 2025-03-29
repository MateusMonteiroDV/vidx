import { useState } from "react";
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

export default function InstructorForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
                                   
  

    try {
      

    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Card className="mx-auto min-w-[500px] p-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-4xl font-bold">Create your course</CardTitle>
        <CardDescription className="text-lg">
          Enter the course details and upload an thumbnail.
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
            <Label htmlFor="file">Upload Image</Label>
            <Input
              id="file"
              type="file"
              required
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full py-6 text-lg"
            />
          </div>
          <Button type="submit" className="w-full py-4 text-xl">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}