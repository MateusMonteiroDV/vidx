
import { Card, CardHeader, CardTitle, CardDescription, CardContent }
 from "../../components/ui/card";
import { Label } from "../../components/ui/label.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useEffect, useState } from "react";

import {useNavigate} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import {addAllInstructorCourse,resetCourses} from "../../context/courseSlice.js";
import {setCredentials} from "../../context/authSlice.js";
import {useLoginMutation} from "../../context/authApiSlice.js";
export default function RegistrationPage() {
 
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation()
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(resetCourses());
}, [dispatch]);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

const navigate = useNavigate()
 async function handleSubmit(e) {
  e.preventDefault();


  try {
    const body = {
      email:email,
      password:password

    }


    const response = await  login(body).unwrap()
    console.log(response);
    dispatch(addAllInstructorCourse(response.course));
    dispatch(setCredentials({ token: response.token }))
    
    navigate('/home')

   } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

  return (
    <Card className="mx-auto min-w-[500px] p-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-4xl font-bold">Signin</CardTitle>
        <CardDescription className="text-lg">
          Enter your email and password to register to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={handleEmail}
              className="w-full py-6 text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={handlePassword}
              className="w-full py-6 text-lg"
            />
          </div>
          <Button type="submit" className="w-full py-4 text-xl">
            login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}