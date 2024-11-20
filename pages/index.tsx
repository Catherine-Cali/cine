import { useState, useEffect } from "react";
import RootLayout from "./layout";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
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
  const [hasError, setHasError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();


  //empecher la page de se recharger
  const handleSubmit = async (event : any) => {
    event.preventDefault(); // Empêche la page de se recharger
    //console.log('Username:', username); // Affiche la valeur de `username`
    //console.log('Password:', password); // Affiche la valeur de `password`
    try{
      const requete = await fetch("./api/authentification", {
        method : "POST",
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({username,password})
      })
      if(requete.status == 200){
        console.log("authentification réussie");
        setIsLogged(true);
        router.push('/dashboard');
  
      }
      else{
        // mettre un message d'erreur
        setHasError(true);
        router.push('/error');
      }
    }
    catch(e){
      setHasError(true);
      router.push('/error'); 
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

    // pr detecter le mode sombre 
    useEffect(() => {
      const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(darkModeMediaQuery.matches); // pr definir le mode selon les prefs sys
  
      //pr detecter les changements en temps reel ( detecte changement pref sys)
      const handleChange = (e:any) => setIsDarkMode(e.matches);
      darkModeMediaQuery.addEventListener('change', handleChange);
  
      //pr supp ecouteur d'evnmt ( permet eviter fuite de memoire)
      return () => darkModeMediaQuery.removeEventListener('change', handleChange);
    }, []);
  


  return (<RootLayout>
   <div className={`min-h-screen min-w-full flex items-center justify-center ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}>
   <Card className={`w-full sm:w-[100px] md:w-[300px] lg:w-[400px] p-4 ${isDarkMode ? "bg-transparent sm:bg-gray-900 text-white" : "bg-transparent sm:bg-white text-black"} border-0 sm:border shadow-none sm:shadow`}>
    <form onSubmit={handleSubmit}>
  <CardHeader>
    <CardTitle className="flex justify-center">🎬 Cinetica</CardTitle>
  </CardHeader>
  <CardContent>
  <div className=" flex flex-col w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username " value={username} onChange={handleChangeU} className={isDarkMode ? "bg-gray-800 text-white" : ""}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Enter your password" value={password} onChange={handleChangeP} className={isDarkMode ? "bg-gray-800 text-white" : ""}/>
            </div>
  </div>
  </CardContent>
  <CardFooter className="flex justify-center">
        <Button type ="submit" variant="outline" className={isDarkMode ? "bg-gray-800 text-white" : ""}>Login</Button>
  </CardFooter>
  </form>
</Card>

</div>
    </RootLayout>)
}
