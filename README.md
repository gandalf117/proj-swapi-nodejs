# proj-swapi-nodejs

In order to run the APIs locally do the following:

1. <strong>clone the repo</strong>

2. <strong>cd backend</strong>

3. <strong>create an .env file with the following content: (SWAPI_BASE_URL is important) (PORT and SECRET_KEY are optional)</strong>
<h6> PORT=1337 </h6>
<h6> SWAPI_BASE_URL=https://swapi.dev/api/ </h6>
<h6> SECRET_KEY=some_secret_key_here </h6>

4. <strong>npm install</strong>

5. <strong>npm start</strong>


<h3>API documentattion:</h3>

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
