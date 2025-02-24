# Star Wars Fleet Builder

🚀 Create your ultimate Star Wars fleet with iconic ships and characters! 🌌✨

Create your fleet, assign a Fleet Commander (even Jar Jar Binks, for the brave souls), compose it with every starship model from the first 6 films, assign some generals on board... and you are ready to go!

!["whoops"](/readme/Navigation-error.png)


*Don't mess with the navigation, if you don't want Ben Kenobi to go after you!*

## Project Startup

### 🐋 Docker (suggested)

To start the project, it's better if you have [Docker](https://www.docker.com/) up and running on your machine.

To start the project, go into the main folder and start Docker Compose:

```bash
docker compose up
```

The Dockerfile contains two sections, one for the `dev` environment and one for the `prod` environment. 

Please uncomment the desired one to use.

You can also start the environment using `npm`:

```bash
npm run docker:dev
```

### ❌ Without container

If you hate whales in general (de gustibus...) you can build it your own way. You need Node at least v19 to build it.

First of all, install [bun](https://bun.sh/), a JavaScript runtime that contains a blazing fast package manager.

> You can still stick to good ol' npm, if you desire to.

Then, install all dependencies:

```bash
bun install
```

and run your dev environment:

```bash
bun run dev
```

> Bun is fast, but it takes a while to download all dependencies.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

And... that's it! Now you can go lightspeed to your Kubernetes environment!

![Han Solo approves](/public/star-wars-light.gif "Han Solo approves")

## Build and deploy

The Dockerfile contains two sections, one for the dev environment and one for the production environment. Please uncomment the desired one to use.

You can also run production environment without Docker:

```bash
bun run build
bun run start
```

## Test

You can run test in your local environment, it's better to use `npm`

```bash
npm test
```

## Screenshots

![Add main details to your fleet](/readme/detail.png "Add main details to your fleet")

*Add main details to your fleet*

![Compose your fleet](/readme/composition.png "Compose your fleet")

*Compose your fleet*

![Assign generals to your fleet](/readme/general.png "Assign generals to your fleet")

*Assign generals to your fleet*

![Submitting data](/readme/general-loading.png "Almost done, we're sending data on Parsec route*")

*Almost done, we're sending data on Parsec route*

![All done!](/readme/complete-feedback.png "Sure, it's always a trap!")

*All done!*

![Summary page on completion](/readme/complete.png "We got also useless fancy buttons!")

*Summary page on completion*

## Boring stuff

![Go away from here!](/public/bestie-force-star-wars.gif "Go away from here!")

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

All data are retrieved via good ol' [`SWAPI` (Star Wars API)](https://swapi.dev/) REST calls. Data are then cached in local storage.

We're using [`axios`](https://axios-http.com/) for API calls, in order to test it.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

This project uses [`redux`](https://redux.js.org/) for state management, using [Redux Toolkit](https://redux-toolkit.js.org/) and React-Redux to speed up the development phase and create less boilerplate.

UI assets are from the [`Mantine`](https://mantine.dev) library, with [`Tabler Icons`](https://tabler.io/icons).

Testing is done using the [`Jest`](https://jestjs.io/) library.

Gifs are taken from [`tenor`](https://tenor.com/).

## Disclaimer

![it's a trap](/public/star-wars-admiral-ackbar.gif "it's a trap")

This project is a fan-made application and is not affiliated with, endorsed, or sponsored by Lucasfilm Ltd., Disney, or any of their subsidiaries or affiliates. All trademarks, service marks, and trade names are proprietary to Lucasfilm Ltd., Disney, and their respective owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder.
