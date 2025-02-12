import { People, PeopleResponse } from "../entities/people.interface";

export const getPeoplePayload = (id: number, person: People): PeopleResponse => {
    return {
        id,
        name: person.name,
        homeworld: person.homeworld,
        demographics: {
            birth_year: person.birth_year,
            gender: person.gender,
        },
        attributes: {
            height: parseInt(person.height),
            mass: parseInt(person.mass),
            hair_color: person.hair_color,
            skin_color: person.skin_color,
            eye_color: person.eye_color,
        },
        metadata: {
            created: person.created,
            edited: person.edited,
        },
    }
}
