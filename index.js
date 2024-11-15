import { got } from "./data.js";

let data = got.houses;

const button = document.querySelector(".container-button");
const cards = document.querySelector(".container-cards");
const search = document.querySelector(".input-search");

function main() {
  function createButton(data) {
    const button = document.createElement("button");
    button.innerText = data;
    button.className =
      "py-1 px-3 bg-black text-white border rounded border-black";
    return button;
  }

  function createButtonsUI(data, root) {
    root.innerHTML = "";
    data.forEach(({ name }, index) => {
      const button = createButton(name);
      button.setAttribute("data-id", index);
      root.appendChild(button);
    });
   }
  


  function house(data, root) {
    root.innerHTML = "";
    data.forEach(({ people }) => {
      createCardUI(people, root);
    });
  }

  function createCardUI(data, root) {
    data.forEach(({ name, description, image, wikiLink }) => {
      const card = createCard(name, description, image, wikiLink);
      root.appendChild(card);
    });
  }

  function createCard(name, description, image, wikiLink) {
    const div = document.createElement("div");

    const cardImage = document.createElement("img");
    const cardName = document.createElement("h2");
    const cardDescription = document.createElement("p");
    const cardLink = document.createElement("a");

    div.className =
      "flex flex-col items-center gap-y-2 py-3 px-1 w-[30%] border bg-blue-200 rounded-lg bg blue-200 text center ";

    cardName.innerText = name;
    cardName.classList.add("text-3xl", "font-bold");

    cardDescription.innerText = description;
    cardImage.src = image;
    cardImage.className = "w-[5rem] h-[5rem] rounded-full";

    const button = createButton("Know More");
    cardLink.href = wikiLink;
    cardLink.appendChild(button);

    div.appendChild(cardImage);
    div.appendChild(cardName);
    div.appendChild(cardDescription);
    div.appendChild(cardLink);

    return div;
  }

  let lastClickedButton = null;

  function handleButton(event) {
    let target = event.target;

    if (
      lastClickedButton &&
      lastClickedButton.dataset.id !== target.dataset.id
    ) {
      lastClickedButton.classList.remove("clicked");
      lastClickedButton.classList.toggle("bg-black");
      lastClickedButton.classList.toggle("text-white");
    }
    if (!target.classList.contains("clicked")) {
      target.classList.add("clicked");
      let id = target.dataset.id;
      house([data[id]], cards);
      lastClickedButton = target;
    } else {
      target.classList.remove("clicked");
      house(data, cards);
      lastClickedButton = null;
    }
    target.classList.toggle("bg-black");
    target.classList.toggle("text-white");
  }

  function handleSearch(event) {
    let value = event.target.value;
    if (value.length > 0) {
      let newData = { people: [] };
      data.forEach(({ people }) => {
        people.forEach(({ name }, index) => {
          if (name.toLocaleLowerCase().includes(value))
            newData.people.push(people[index]);
        });
      });
      house([newData], cards);
    } else {
      house(data, cards);
    }
  }

  button.addEventListener("click", handleButton);
  search.addEventListener("input", handleSearch);
  createButtonsUI(data, button);
  house(data, cards);
}

document.addEventListener("DOMContentLoaded", main);
