import { Film, FilmResponse } from "../entities/films.interface";

export const getFilmPayload = (id: number, film: Film): FilmResponse => {
    return {
        id,
        title: film.title,
        episode_id: parseInt(film.episode_id),
        details: {
            opening_crawl: film.opening_crawl,
            director: film.director,
            producer: film.producer,
            release_date: film.release_date,
        },
        metadata: {
            created: film.created,
            edited: film.edited,
        },
    }
}
