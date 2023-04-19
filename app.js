const cardSelect = document.getElementById("card-select");
const cardsContainer = document.querySelector(".cards-container");

// Cargar la información de los personajes desde la API
async function loadCharacters() {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
    }
}

// Generar las 12 cards en el contenedor correspondiente
function generateCards(characters) {
    characters.slice(0, 12).forEach((character) => {
        const cardElem = document.createElement("div");
        cardElem.classList.add("card");
        cardElem.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <h2>${character.name}</h2>            
        `;
        cardsContainer.appendChild(cardElem);

        // Agregar la opción correspondiente al filtro
        const optionElem = document.createElement("option");
        optionElem.value = character.name.toLowerCase();
        optionElem.textContent = character.name;
        cardSelect.appendChild(optionElem);
    });
}

// Filtrar los personajes según la selección del usuario
function filterCards(characters, value) {
    const cards = Array.from(characters);    
    cards.forEach((character) => {
        if (value === "all" || character.querySelector("h2").textContent.toLowerCase() === value) {
            character.style.display = "block";
        } else {
            character.style.display = "none";
        }
    });
}

// Ejecutar las funciones al cargar la página
loadCharacters().then((data) => {
    generateCards(data);
});

// Escuchar el evento change del select y filtrar los personajes correspondientes
cardSelect.addEventListener("change", () => {
    filterCards(cardsContainer.children, cardSelect.value);
});
