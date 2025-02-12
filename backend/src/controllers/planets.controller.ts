import { Request, Response } from "express";
import { ENTITIES } from "../consts";
import { fetchItems } from "../services/fetchData";
import { Film, FilmResponse } from "../entities/films.interface";
import { Planet, PlanetResponse } from "../entities/planets.interface"
import {
    applyPagination,
    applyFilters,
    applyFiltersExact,
    applyMultiFilters,
    applySort,
    extractEntities
} from "../utils/utilsController";
import { getFilmPayload } from "./films.controller";

const DEFAULT_PAGE_SIZE = 5;

const FILTERS = ['name', 'climate', 'gravity', 'terrain'];

const FILTERS_EXACT_MATCH = ['rotation_period', 'orbital_period', 'diameter', 'surface_water'];

export const getPlanetPayload = (id: number, planet: Planet): PlanetResponse => {
    return {
        id,
        name: planet.name,
        population: parseInt(planet.population),
        characteristics: {
            rotationPeriod: parseInt(planet.rotation_period),
            orbitalPeriod: parseInt(planet.orbital_period),
            diameter: parseInt(planet.diameter),
            climate: planet.climate,
            gravity: planet.gravity,
            terrain: planet.terrain,
            surfaceWater: parseInt(planet.surface_water)
        },
        metadata: {
            created: planet.created,
            edited: planet.edited,
        }
    }
}

export const GetPlanets = async (req: Request, res: Response): Promise<void> => {
    try {
        const planets: Map<number, Planet> = await fetchItems(
            ENTITIES.PLANETS.KEY,
            ENTITIES.PLANETS.NAME,
            ENTITIES.PLANETS.TOTAL,
        );

        let planetsFiltered = Array.from(planets.entries());

        planetsFiltered = applyFiltersExact(req, planetsFiltered, FILTERS_EXACT_MATCH);

        planetsFiltered = applyFilters(req, planetsFiltered, FILTERS);

        planetsFiltered = applySort(req,  planetsFiltered);

        const planetsPayload: PlanetResponse[] = planetsFiltered.map(([id, planet]) => {
            return getPlanetPayload(id, planet as Planet);
        });

        const { startIndex, endIndex, page, limit, totalPages } = applyPagination(req, DEFAULT_PAGE_SIZE, planetsPayload.length);

        res.status(200).json({
            planets: planetsPayload.slice(startIndex, endIndex),
            pagination: {
                page,
                items_per_page: limit,
                total_pages: totalPages
            }
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        res.status(500).json({ message: errorMessage });
    }
};

export const GetPlanetsWithFilms = async (req: Request, res: Response) => {
    try {
        const films: Map<number, Film> = await fetchItems(ENTITIES.FILMS.KEY, ENTITIES.FILMS.NAME, ENTITIES.FILMS.TOTAL);
        const planets: Map<number, Planet> = await fetchItems(ENTITIES.PLANETS.KEY, ENTITIES.PLANETS.NAME, ENTITIES.PLANETS.TOTAL);
    
        let planetsFiltered = Array.from(planets.entries());

        planetsFiltered = applyFiltersExact(req, planetsFiltered, FILTERS_EXACT_MATCH);

        planetsFiltered = applyFilters(req, planetsFiltered, FILTERS);

        planetsFiltered = applySort(req, planetsFiltered);

        let planetsPayload: PlanetResponse[] = planetsFiltered.map(([id, planet]) => {
            return {
                ...getPlanetPayload(id, planet as Planet),
                films: extractEntities<Film, FilmResponse>(planet.films, films, getFilmPayload),
            }
        });

        // planetsPayload = applyMultiFilters<PlanetResponse, 'films', any>(req,  planetsPayload, 'films', ['id', 'name']);

        const { startIndex, endIndex, page, limit, totalPages } = applyPagination(req, DEFAULT_PAGE_SIZE, planetsPayload.length);

        res.status(200).json({
            planets: planetsPayload.slice(startIndex, endIndex),
            pagination: {
                page,
                items_per_page: limit,
                total_pages: totalPages
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
