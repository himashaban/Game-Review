import { getGames } from "./ui.module.js"; // Import the getGames class

export function navbar(callback) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      
      let category = this.getAttribute("data-value"); // Get the category from data-value attribute
      callback(category); // Pass the category to the callback function
    });
  });
}
