
import { Card, CardHeader, CardTitle, CardDescription, CardContent }
 from "../../components/ui/card";
import { Label } from "../../components/ui/label.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'

import {useDispatch} from 'react-redux'
import {setCredentials,setAdmin} from "../../context/authSlice.js";
import {resetCourses} from "../../context/courseSlice.js";
import {useRegistrationMutation} from "../../context/authApiSlice.js";


export default function RegistrationPage() {
  const [name,setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { isLoading }] = useRegistrationMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(resetCourses());
    dispatch(setAdmin(false));
}, [dispatch]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  function handleName(e){
  	setName(e.target.value)
  }



  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }


 async function handleSubmit(e) {
  e.preventDefault();

  const body = {
    name: name,
    email: email,
    password:password
  }

  try {
    const response = await signup(body).unwrap(); 
    console.log(response);
    dispatch(setCredentials({ token: response.token }));
    

    navigate('/home');
   } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    
  }
}

  return (
    <Card className="mx-auto min-w-[500px] p-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-4xl font-bold">Signup</CardTitle>
        <CardDescription className="text-lg">
          Enter your email and password to register to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="w-full space-y-4">
           <div className="space-y-2">
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              type="name"
              placeholder="admin"
              required
              value={name}
              onChange={handleName}
              className="w-full py-6 text-lg"
            />
          </div>


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
            Cadastrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}