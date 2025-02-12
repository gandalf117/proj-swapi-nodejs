import { Planet, PlanetResponse } from "../entities/planets.interface"

export const getPlanetPayload = (id: number, planet: Planet): PlanetResponse => {
    return {
        id,
        name: planet.name,
        population: parseInt(planet.population),
        characteristics: {
            rotation_period: parseInt(planet.rotation_period),
            orbital_period: parseInt(planet.orbital_period),
            diameter: parseInt(planet.diameter),
            climate: planet.climate,
            gravity: planet.gravity,
            terrain: planet.terrain,
            surface_water: parseInt(planet.surface_water)
        },
        metadata: {
            created: planet.created,
            edited: planet.edited,
        }
    }
}
