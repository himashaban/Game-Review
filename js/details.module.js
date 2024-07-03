export class DisplayGame {
  constructor(gameid) {
    this.gameid = gameid;
  }

  async fetchGameDetails() {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c32764fcd1msha3ed37a1702a2bfp144318jsn5085e1fab920",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    let response = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.gameid}`,
      options
    );

    let gameData = await response.json();
    let modalDesc=gameData.description;
    let gamestate = gameData.status;
    console.log(gamestate);
   return { modalDesc, gamestate };
  }
}


