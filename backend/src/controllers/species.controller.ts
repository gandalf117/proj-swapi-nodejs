import { Species, SpeciesResponse } from "../entities/species.interface";

export const getSpeciesPayload = (id: number, species: Species): SpeciesResponse => {
    return {
        id,
        name: species.name,
        homeworld: species.homeworld,
        language: species.language,
        demographics: {
            classification: species.classification,
            designation: species.designation,
        },
        attributes: {
            average_height: parseInt(species.average_height),
            average_lifespan: parseInt(species.average_lifespan),
            hair_colors: species.hair_colors,
            skin_colors: species.skin_colors,
            eye_colors: species.eye_colors,
        },
        metadata: {
            created: species.created,
            edited: species.edited,
        },
    }
}
