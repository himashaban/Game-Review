import { DisplayGame } from "./details.module.js";
export class getGames {
  async fetchApi(category) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c32764fcd1msha3ed37a1702a2bfp144318jsn5085e1fab920",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      const Api = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        options
      );
      const response = await Api.json();
      this.display(response);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }

  display(response) {
    let RowData = document.getElementById("RowData");
    RowData.innerHTML = "";

    response.forEach((game) => {
      let colmd3 = document.createElement("div");
      colmd3.classList.add("col-md-3");

      let card = document.createElement("div");
      card.classList.add("card", "border-2", "text-white", "bg-transparent");
      card.style.cursor = "pointer"; // Add cursor pointer for click effect

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let img = document.createElement("img");
      img.classList.add("w-100", "card-img");
      img.src = game.thumbnail;

      let title = document.createElement("h5");
      title.textContent = game.title;
      title.style.position = "relative";
      title.style.fontSize = "17px";

      let tag = document.createElement("small");
      tag.innerText = game.genre;
      tag.style.backgroundColor = "gray";
      tag.classList.add("rounded-pill");
      tag.style.fontSize = "13px";
      tag.style.position = "absolute";
      tag.style.left = "10px";
      tag.style.bottom = "5px";

      let platform = document.createElement("small");
      platform.innerText = game.platform;
      platform.style.backgroundColor = "gray";
      platform.classList.add("rounded-pill");
      platform.style.fontSize = "10px";
      platform.style.position = "absolute";
      platform.style.right = "10px";
      platform.style.bottom = "5px";

      let free = document.createElement("small");
      free.classList.add("bg-info", "p-1", "rounded-pill");
      free.textContent = "Free";
      free.style.position = "absolute";
      free.style.left = "10px";
      free.style.top = "10px"; // Adjust position as needed

      let desc = document.createElement("p");
      desc.classList.add("text-center", "text-white", "opacity-50");
      desc.textContent = game.short_description;
      desc.style.fontSize = "16px";

      let br = document.createElement("br");

      cardBody.style.display = "flex";
      cardBody.style.flexDirection = "column";
      cardBody.appendChild(img);
      cardBody.appendChild(title);
      cardBody.appendChild(free); // Append free status
      cardBody.appendChild(tag);
      cardBody.appendChild(desc);
      cardBody.appendChild(platform);
      cardBody.appendChild(br);
      card.appendChild(cardBody);
      colmd3.appendChild(card);
      RowData.appendChild(colmd3);

      // Attach event listener to each card for showing modal
      $(card).click(async function () {
         document.querySelector(".games").classList.add("d-none");
         document.querySelector(".details").classList.remove("d-none");
       
        // Remove any existing modal
        $("#RowData").hide();
        $(".modal").remove();
        let gamez = new DisplayGame(game.id);
        gamez.fetchGameDetails();
        let resultz = await gamez.fetchGameDetails();
        
    
         
        let modalContent = `
    <div class='gdetails modalz text-white'>
      <h2>game details </h2>
     
              <button class='btn clsBtn text-white position-absolute end-0 '  ><i class="fa-solid fa-x"></i></button>

      <div class='col-md-4'>
      <img src="${game.thumbnail}" class=' w-100 cat-image' alt=""></div>
      <div class='col-md-8'>
      <div class='tags ps-4'>
        <p class='py-1'>category:<span class='bg-info p-1 rounded-4'>${game.genre}</span></p>
        <p class='my-1'>platform:<span class='bg-info p-1 rounded-4'>${game.platform}</span></p>
        <p class='my-1'>platform:<span class='bg-info p-1 rounded-4'>${resultz.gamestate}</span></p>
        </div>
        
        <p class='px-3 small'>${resultz.modalDesc}</p>
      </div>
    </div>
  `;
        // Append modal to body and show
        
        document.getElementById("details").innerHTML=modalContent;
      });
    });
  }
}


 $(document).ready(function () {
   $(document.body).on("click", ".clsBtn", function () {
     $("#gameModal").hide();
     $("#RowData").show();
     document.querySelector(".games").classList.remove("d-none");
     document.querySelector(".details").classList.add("d-none");
   });
 });