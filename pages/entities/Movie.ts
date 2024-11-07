//l'interface permet de définir un contrat de règles,
// une structure, forme pour notre code : nommer et typer

export interface Movie {
    datemax : string;
    datemin : string; 
    title: string;
    id: number;
    genre_ids: number[];
    //original_language: string;
    //original_title: string;
    //vote_average: number;
    release_date: string;
    //adult: boolean; 
    //popularity: number; 
    //video: boolean; 
    //backdrop_path: string; 
    overview: string; 
    poster_path: string; 
  }
