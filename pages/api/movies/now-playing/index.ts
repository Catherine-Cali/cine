import type { NextApiRequest, NextApiResponse } from 'next';
import { Movie } from '@/entities/Movie';

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    //on pourra plus tard ne pas mettre la cle API dns le code en definissant la cle dns les variables d'environnement de Vercel
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmYyNzY4NzU0NmYyMDY3MzMzNDYyOWUwNGRjOWM3MCIsIm5iZiI6MTczMDgyMDExOS45OTIzMTUzLCJzdWIiOiI2NzJhMzM5YjE0ZDRhMzk5NzIwMzU2MDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._QOFs8qsJmlp3C3eUZVLptw2xG6B6LBwBLQdldX4m2A'
  }
};

//async permet d'ecrire des fonctions qui gerent des operations asynchrones de maniere plus simple, 
//en utilisant await pour attendre les resultats sans bloquer le reste du code.
export default async function handler(req: NextApiRequest, res: NextApiResponse <Movie[] | { error: string }>){
    try{

        //pour recuperer les donnees : renvoie pas directement une reponse avec un corps en JSON,
        // mais une promesse qui est resolue en un objet Response apres.
        const response = await fetch(url,options);

        //gerons le cas ou les donnees ne peuvent pas etre recup
        if (!response.ok) {
            // on peut egalement utiliser return : throw lance une erreur et arrete l'execution, 
            //tandis que return arrete l'execution de la fonction et renvoie une valeur sans signaler une erreur.
            throw new Error(`Erreur lors de la recuperation des donnees: ${response.status}`);
        }

        //attend que la reponse recue soit convertie en un objet js a partir du JSON.
        const data = await response.json();

        const movies: Movie[] = data.results.map((item: Movie) => ({
            id: item.id,
            title: item.title,
            overview: item.overview,
            releaseDate: item.release_date,  
            posterPath: item.poster_path,
        }));

        //serveur envoie reponse HTTP de statut 200 (succes) avec les donnees JSON du tableau movies
        res.status(200).json(movies);
    }


    catch (error) {
        // pour gerer les erreurs et envoyer une reponse appropriee
        res.status(500).json({ error: 'Erreur interne du serveur' });
        console.error(error);
    }

}

