import { useState } from "react";
import RootLayout from "./layout";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


//acceder à un élément de user.ts : user.username

export default function Connexion() {
  const [isLogged, setIsLogged] = useState(false); 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 

  //empecher la page de se recharger
  const handleSubmit = async (event : any) => {
    event.preventDefault(); // Empêche la page de se recharger
    console.log('Username:', username); // Affiche la valeur de `username`
    console.log('Password:', password); // Affiche la valeur de `password`
    const requete = await fetch("./api/authentification", {
      method : "POST",
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({username,password})
    })
    if(requete.status == 200){
      console.log("authentification réussie");
    }
    else{
      // mettre un message d'erreur
      console.log("authentificaion failed")
    }
  };

  // mettre à jour le mdp
  function handleChangeP(e : any) {
    setPassword(e.target.value);
  }

  //mettre à jour le username
  function handleChangeU(e : any) {
    setUsername(e.target.value);
  }

  


  return (<RootLayout>
    <div>
    <Card  className="w-full sm:w-[100px] md:w-[300px] lg:w-[400px] p-4">
    <form onSubmit={handleSubmit}>
  <CardHeader>
    <CardTitle className="flex justify-center">🎬 Cinetica</CardTitle>
  </CardHeader>
  <CardContent>
  <div className=" flex flex-col w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username " value={username} onChange={handleChangeU}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Enter your password" value={password} onChange={handleChangeP}/>
            </div>
  </div>
  </CardContent>
  <CardFooter className="flex justify-center">
        <Button type ="submit" variant="outline">Login</Button>
  </CardFooter>
  </form>
</Card>

</div>
    </RootLayout>)
}
