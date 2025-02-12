# proj-swapi-nodejs

In order to run the APIs locally do the following:

1. clone the repo

2. cd backend

3. create an .env file with the following content: (SWAPI_BASE_URL is important) (PORT and SECRET_KEY are optional)
PORT=1337
SWAPI_BASE_URL=https://swapi.dev/api/
SECRET_KEY=some_secret_key_here

4. npm install

5. npm start


API documentattion:

/api/films/

/api/films/with-planets

/api/people/

/api/people/with-starships

/api/people/with-vehicles

/api/planets/

/api/planets/with-films

/api/starships/

/api/starships/with-pilots

/api/vehicles/

/api/vehicles/with-pilots

/api/species/

/api/species/with-people

All the endpoints allow pagination. Example: ?page=someNumber&limit=someNumber (limit default to 5)

All the endpoints allow sorting. Example: ?sort=validPropertyName&order=desc (order defaults to asc)

All the endpoints allow filtering on almost every parameter that is part of the payload (except for the metadata and homeworld).

Example: ?title=someFilmTitle&release_data=1977