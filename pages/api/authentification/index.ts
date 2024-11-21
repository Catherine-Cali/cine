import type { NextApiRequest, NextApiResponse } from 'next';
import {user} from "@/repository/user";
import * as bcrypt from 'bcryptjs'



export default async function handler(req: NextApiRequest, res: NextApiResponse ){
    try{
        if(req.method === "POST"){
            //permet de recup les données mis dans la requete
            const {username, password}  = req.body;
            // bcrypt.compareSync(password,user.password) permet de comparer password dans le user.ts avec le password dans la requete
            //en le cryptant d'abord
            //pour obtenir le hash correct, celui sur le site donne pas le mm
            //console.log(bcrypt.hashSync("azertyuiop123", 10)); 
            if( username.toLowerCase() === user.username.toLowerCase() && bcrypt.compareSync(password,user.password)){
                return res.status(200).json({msg:"success"})
            }
            return res.status(401).json({msg:"failure"})
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error });
    }

}


