# sReality scraper app

This application is designed to scrape real estate data from the sReality.cz website. The backend is written in TypeScript and uses Prisma for database management. The frontend uses React with TypeScript that displays the scraped properties, including their name, price, image, and location.

The application was made according to the [given specifications](./project-specification.txt).

## How to run the app

### Prerequisites

You have to have Docker installed on your machine.

### Running the app

1. Clone the repository
2. Run `docker-compose up` in the root directory of the repository
3. If you want to try the special search feature, you have to put your OpenAI API key into the `.env` file in the root directory of the repository. The key should be in the format `OPENAI_API_KEY=your_key_here`. You can skip this step, and the app will default to a simple keyword search.
4. The app should be running on `localhost:3000`

You can run tests for the backend by running `npm test` in the project root directory. This command will start a script which runs a testing version of the docker container and runs the tests inside it. The tests are written using Jest.

## The search feature

I added a search feature that allows the user to search for properties by entering a natural language query. The way it works is like this:

1. each of the scraped properties is made into a string (like "Apartment for sale for 3 545 434 CZK in Brno")
2. These strings are then vectorized using OpenAI Embeddings API
3. The vectors are stored in a local vector database
4. When the user enters a query, it is also vectorized using the same API
5. The vectorized query is then compared to the vectors in the vector database using cosine similarity
6. The results are sorted by the similarity score and displayed to the user

I wanted to try this because it seemed like a fun idea and I wanted to see how well it would work. The results are not very good though, I want to try to improve it later.

## What could be improved?

- Number of search results could be limited not by a fixed value, but by a certain score threshold of the results fro the vector database.
- maybe try different vectorization methods - different string format, different API
- Tests for the frontend
- adding an option to refetch the data from the sReality website
- sorting
