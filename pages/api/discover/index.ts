import type { NextApiRequest, NextApiResponse } from 'next';
import { TVShow } from '@/entities/TVShow';
import { Movie } from '@/entities/Movie';

const urlm = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const urls = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc';
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
export default async function handler(req: NextApiRequest, res: NextApiResponse <{ show : TVShow[], movie : Movie[]}| { error: string }>){
    try{

        const responseMovie = await fetch(urlm,options);
        const responseShow = await fetch(urls,options);

        //gerons le cas ou les donnees ne peuvent pas etre recup
        if (!responseMovie.ok) {
            throw new Error(`Erreur lors de la recuperation des donnees: ${responseMovie.status}`);
        }

        if (!responseShow.ok) {
            throw new Error(`Erreur lors de la recuperation des donnees: ${responseShow.status}`);
        }

        //attend que la reponse recue soit convertie en un objet js a partir du JSON.
        const dataMovie = await responseShow.json();
        const dataShow = await responseMovie.json();

        const show: TVShow[] = dataShow.results.map((item: TVShow) => ({
            id: item.id,
            name: item.name,
            overview: item.overview,
            releaseDate: item.release_date,  
            posterPath: item.poster_path,
        }));

        const movie: Movie[] = dataMovie.results.map((item: Movie) => ({
            id: item.id,
            title: item.title,
            overview: item.overview,
            releaseDate: item.release_date,  
            posterPath: item.poster_path,
        }));

        res.status(200).json({show,movie});
    }


    catch (error) {
        // pour gerer les erreurs et envoyer une reponse appropriee
        res.status(500).json({ error: 'Erreur interne du serveur' });
        console.error(error);
    }

}

