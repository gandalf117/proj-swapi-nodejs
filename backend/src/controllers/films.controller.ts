import { Request, Response } from "express";
import { ENTITIES } from "../consts";
import { fetchItems } from "../services/fetchData";
import { Film, FilmResponse } from "../entities/films.interface";
import { Planet, PlanetResponse } from "../entities/planets.interface"
import {
    applyPagination,
    applyFilters,
    applyMultiFilters,
    applySort,
    extractEntities
} from "../utils/utilsController";
import { getPlanetPayload } from "./planets.controller";

const DEFAULT_PAGE_SIZE = 5;

const FILTERS = ['title', 'episode_id', 'director', 'producer', 'release_date', 'opening_crawl'];

export const getFilmPayload = (id: number, film: Film): FilmResponse => {
    return {
        id,
        title: film.title,
        episodeId: parseInt(film.episode_id),
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
}

export const GetFilms = async (req: Request, res: Response): Promise<void> => {
    try {
        const films: Map<number, Film> = await fetchItems(
            ENTITIES.FILMS.KEY,
            ENTITIES.FILMS.NAME,
            ENTITIES.FILMS.TOTAL,
        );

        const { startIndex, endIndex } = applyPagination(req, DEFAULT_PAGE_SIZE, ENTITIES.FILMS.TOTAL);

        let filmsFiltered = applyFilters(req,  Array.from(films.entries()), FILTERS);

        filmsFiltered = applySort(req,  Array.from(films.entries()));

        const filmsPayload: FilmResponse[] = filmsFiltered.map(([id, film]) => {
            return getFilmPayload(id, film as Film);
        });

        res.status(200).json(filmsPayload.slice(startIndex, endIndex));
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }
};

export const GetFilmsWithPlanets = async (req: Request, res: Response) => {
    try {
        const planets: Map<number, Planet> = await fetchItems(ENTITIES.PLANETS.KEY, ENTITIES.PLANETS.NAME, ENTITIES.PLANETS.TOTAL);
        const films: Map<number, Film> = await fetchItems(ENTITIES.FILMS.KEY, ENTITIES.FILMS.NAME, ENTITIES.FILMS.TOTAL);
    
        const { startIndex, endIndex } = applyPagination(req, DEFAULT_PAGE_SIZE, ENTITIES.FILMS.TOTAL);

        let filmsFiltered = applyFilters(req,  Array.from(films.entries()), FILTERS);

        filmsFiltered = applySort(req,  Array.from(films.entries()));

        let filmsPayload: FilmResponse[] = filmsFiltered.map(([id, film]) => {
            return {
                ...getFilmPayload(id, film as Film),
                planets: extractEntities<Planet, PlanetResponse>(film.planets, planets, getPlanetPayload),
            }
        });

        //filmsPayload = applyMultiFilters<FilmResponse, 'planets', any>(req,  filmsPayload, 'planets', ['id', 'name']);

        res.status(200).json(filmsPayload.slice(startIndex, endIndex));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
