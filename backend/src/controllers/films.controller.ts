import { Request, Response } from "express";
import { ENTITIES } from "../consts";
import { fetchItems } from "../services/fetchData";
import { Film, FilmResponse } from "../entities/films.interface";
import { applyPagination, applyFilters, applySort } from "../utils/utilsController";

const DEFAULT_PAGE_SIZE = 5;

export const GetFilms = async (req: Request, res: Response): Promise<void> => {
    try {
        const { startIndex, endIndex } = applyPagination(req, DEFAULT_PAGE_SIZE, ENTITIES.FILMS.TOTAL);

        const films: Film[] = await fetchItems(
            ENTITIES.FILMS.KEY,
            ENTITIES.FILMS.NAME,
            ENTITIES.FILMS.TOTAL,
        );

        const filters = ['title', 'episode_id', 'director', 'producer', 'release_date', 'opening_crawl'];
        let filmsFiltered = applyFilters(req,  Array.from(films.entries()), filters);

        filmsFiltered = applySort(req,  Array.from(films.entries()));

        const filmsPayload: FilmResponse[] = filmsFiltered.map(([id, film]) => {
            return {
                id,
                title: film.title,
                episodeId: film.episode_id,
                details: {
                    openingCrawl: film.opening_crawl,
                    director: film.director,
                    producer: film.producer,
                    releaseDate: film.release_date,
                },
                metadata: {
                    created: film.created,
                    edited: film.edited,
                },
            }
        });

        res.status(200).json(filmsPayload.slice(startIndex, endIndex));
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }
};

export const GetFilmsWithPlanets = async (req: Request, res: Response) => {
    try {
        const films = await fetchItems(ENTITIES.STARSHIPS.KEY, ENTITIES.STARSHIPS.NAME, ENTITIES.STARSHIPS.TOTAL);
        // const films = await fetchItems(ENTITIES.FILMS.KEY, ENTITIES.FILMS.NAME, 10);
    
        const filmsPayload = [];
        films.forEach(film => {
          filmsPayload.push({
            title: film.id,
            episode_id: film.episode_id,
            director: film.director,
            producer: film.producer,
            release_date: film.release_date,
          });
        });
    
        res.status(200).json(filmsPayload);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
