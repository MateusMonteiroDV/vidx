
import { Card, CardHeader, CardTitle, CardDescription, CardContent }
 from "../../components/ui/card";
import { Label } from "../../components/ui/label.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useState } from "react";
import axios from 'axios'

export default function RegistrationPage() {
  const [name,setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const options = {
    method: "POST",
    url: "http://localhost:5000/api/signup", 
    headers: {
      "Content-Type": "application/json", 
    },
    data: JSON.stringify({name, email, password }), 
  };

  try {
    const response = await axios(options);
    console.log("Response:", response.data); 

    
    alert("Registration successful!");
   } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Registration failed");
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