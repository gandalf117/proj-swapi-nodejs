import { Starship, StarshipResponse } from "../entities/starships.interface";

export const getStarshipPayload = (id: number, starship: Starship): StarshipResponse => {
    return {
        id,
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        cost_in_credits: parseInt(starship.cost_in_credits),
        consumables: starship.consumables,
        hyperdrive_rating: parseInt(starship.hyperdrive_rating),
        MGLT: parseInt(starship.MGLT),
        starship_class: starship.starship_class,
        parameters: {
            length: parseInt(starship.length),
            crew: parseInt(starship.crew),
            passengers: parseInt(starship.passengers),
            max_atmosphering_speed: parseInt(starship.max_atmosphering_speed),
            cargo_capacity: parseInt(starship.cargo_capacity),
        },
        metadata: {
            created: starship.created,
            edited: starship.edited,
        },
    }
}
