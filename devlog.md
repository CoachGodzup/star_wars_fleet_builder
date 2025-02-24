# Creation of Star Wars Fleet

Here I'll present you my design choices and a devlog, on how I design and implement this project.

### Why this stack?

I used `next.js` because it's a full-fledged framework, with several feature already ready to go, and simpler to implement.

`Typescript` is the natural way to go if you want to go with types

`redux` is the way I prefer to use stores. It gives me a single point of trust and one-way to update stuff (typically, forms update the store, other parts of application just listen to the changes via `useSelector` hook and changes accordingly). It's more efficient than `React Context API`, and more organized. An valid alternative could be `Rx.js`, but I prefer a more organized approach, and I don't need to control the flow of datas, being just data to be cached for a form.

I decided to use a UI library, in order to speed up the whole build process. After a few search, I went into [Mantine](https://mantine.dev/), that is very simple to use, already fit for React and extetically very pleasant.

Also, `docker` is the standard way-to-go to containerize application that can be deployed via Kubernetes. I'm more comfortable to use `docker-compose` to create a more complex architecture than a simple `Dockerfile`. This file starts from a `linux:alpine` standard image, with `bun` inside.

I've used `bun` as an experiment for package managing. I've used always `npm`, sometimes `pnpm`, and I want to give it a try. It's way fast but still I'm struggling with his cache management, so for some tasks I stick to `npm`.

Application is thought to be used in a desktop environment. I'm not focusing now on responsiveness.

## Long time ago, in some models far far away

I began this project using Test Driven Development (that unfortunately, I dropped a few days later because it was too much time consuming).

After initializing the project with `create-next-app` and cleaning up all the boilerplates, I started implementing **models**  I was going to use. Since I'm using REST Api, I prefer to use the whole response as internal data, eventually enriching it with accessory information via optional parameters (HomeworldInfo, SpeciesInfo).

> If the starting point were a GraphQL API, I'll stick to the simplest model I have to manage, and letting the API enrich it with all information regarding Planets and Species.

Core models of this application are `person` and `starship`. In order to retrieve informations, also `planet` and `species` are mapped. There's also another model, `assignment`, but I'll show you later.

## Keep it simple

In order to start doing the most meaninful result first, I began with a single page, with **only a form** and a submit, subdivided into three separated fieldset (easier to split later on): `design`, `component` and `general`.

- design let me introduce my fleet
- components it's used to create the fleet
- general to assign generals to starships
- a further step, `complete`, will be created later

> this was a good choice to focus on building forms and form components I need faster, but it brought some dufficulty in design later on all the wizard flux, considering edge use-cases

I began with the simpler of the forms, `design`, that consist into three inputs, two text one and one with a general. 

> At this point, there's still no data retrieval, but I was using mocks.

## Trust everybody, but always cut the cards

I began to create `cardPerson` and `cardStarship` in order to show some information about those complex data models. I stick to the requirements, and noticed that for `person` I need to retrieve some more information. Also, a little `dateFormatter` was needed in order to format the date. It just split the date an separate it with a whitespace.

| in Star Wars universe, all dates are BBY (Before [Battle of Yavin](https://en.wikipedia.org/wiki/Battle_of_Yavin)) or ABY (After Battle of Yavin). This battle took place at the end of the first film.

After raw cards are implemented, I began to design the row for `TableFleet`. I took for both templates provided from `mantine`, and I adapt them for my project. I want it to have information about starship and general, and the last part being the action you can take with this row (cancel, add general, remove general).

## You don't know the power of the Redux Side

Now it's time to think about storing data, in order to split the form into three pages. So, I'll begin creating `detail` store in Redux. To help me in this task, I've used `redux-toolkit` and `react-redux` in order to reducing boilerplates to the minimum part. Being stores a core part of this application, I've focused also on testing them deeply.

> now we got a problem: Next.js is very server-side rendering oriented, and being redux mainly a client-side technology, this caused a conflict. I prefer to stay on the client side for everything.

In this specific page, I still don't know precisely which action I'll use for every single component. I know what to do, but not the payloads I'll pass to the single action.

I thought also that it should be a clever way to handle the fact that a general should be assigned only to one ship. So, I created a `assignment` store and model. So, the fleet at step 2 is just an array of assignments, where general is empty, and adding a general is straightforward. 

> The store also manage the unicity of general during adding time, so when you add it to a ship, store already controls if it's somewhere else and remove it, before assignment. We've got the "move general" action with zero effort!

## That wizard's just a crazy old man
That single page form is just boring: it's time to create the wizard. So I splitted the form into three separated component and I created a `navbar` component in order to navigate them. Navbar is quite simple, since [it was already in library](https://mantine.dev/core/stepper/). I just have to create routing for my application. Luckily, Next.js has already [a way to route using folders and components](https://nextjs.org/docs/app).

I've also added a starting page, because... I'm lazy, and I forgot everytime to use https://localhost:3000/detail instead of https://localhost:3000. But it also a nice feature to have, a single landing point.

## My Lord, the fleet has moved out of lightspeed.

Time to create the `composition` form. For this specific component, I was thinking about a custom form, where you can see and search in the left part and see your fleet on the right.

![Form composition](/readme/composition.png)

** form as its final stage. Notice the pagination **

> Pagination assumes that API always answers with 10 elements per page. That's what happens everytime.

I created a `selectableCardStarship` that extends `cardStarship` creating a clickable area to add the ship on the store and thus on the fleet panel on the right. You can also remove a single ship, or everyone using `reset` button.

> This UI has a caveat when you need to bulk add some ships. This can be a future improvement.

## API, API everywhere

TIme to move away from mocks and implements the API calls. There's a way next.js handle calls with an internal cache mechanism. The problem is: this still not fits well with Jest testing library. So, with my great unpleasantness, I decided to switch to `Axios`. I don't like to add libraries for already-available features, but testing is quite important.

I began creating endpoints for all requests, beginning with `people` and `starship`, handling pagination accordingly. 

> I know that in this phase a lot of calls are made, and I decided to use a caching mechanism. Later.

## Hello there! General Kenobi!

Time to create the general page. That will be very similar to step 2: a searching mechanism on the left, and fleet summary on the right, also to guarantee continuity.

![Assign fleet general to ships](/readme/general.png) 

*Assign fleet general to ships*

I've already created a form search mechanism on details page, time to externalize it into a reusable component, `personInput`. Also, with API integration, we can finally fetch real planet and species. At this time, the component will fetch this info separately and saves it into the card. It's highly inefficient, but it makes the work.

> Having a lot of information can be shown in several different way. For instance, avatar changes based on species, with a standard one. Also, during development, the color of the background was based on the biome of the planet. I deprecated it later on, in order not to have an overengineered card.

## Parsec route 




