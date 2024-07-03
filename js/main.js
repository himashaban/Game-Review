import { getGames } from "./ui.module.js";
import { navbar } from "./games.module.js";
// main.js or any relevant file
// import { CardClickHandler } from './details.module.js';

// Instantiate CardClickHandler to activate event listeners




const getgamez = new getGames(); // Create an instance of getGames
getgamez.fetchApi("MMORPG");
navbar((category) => {
  getgamez.fetchApi(category);
});
// const cardHandler = new CardClickHandler();