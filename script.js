document.getElementById("searchButton").addEventListener("click", searchPokemon);

async function searchPokemon() {
    const pokemonName = document.getElementById("searchInput").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Pokémon não encontrado!");

        const data = await response.json();
        displayPokemonInfo(data);
        updateBackgroundColor(data.sprites.front_default); // Chama a função para atualizar o fundo com a cor da imagem
    } catch (error) {
        document.getElementById("pokemonInfo").innerHTML = `<p>${error.message}</p>`;
    }
}

function displayPokemonInfo(data) {
    const pokemonInfo = document.getElementById("pokemonInfo");
    const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const pokemonImage = data.sprites.front_default;
    const pokemonTypes = data.types.map(type => type.type.name).join(", ");
    const pokemonAbilities = data.abilities.map(ability => ability.ability.name).join(", ");

    pokemonInfo.innerHTML = `
        <h2>${pokemonName}</h2>
        <img src="${pokemonImage}" alt="${pokemonName}" />
        <p><strong>Tipo(s):</strong> <span class="types">${pokemonTypes}</span></p>
        <p><strong>Habilidade(s):</strong> <span class="abilities">${pokemonAbilities}</span></p>
    `;
}

function updateBackgroundColor(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = function() {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        const rgbColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

        // Alterar o fundo para a cor predominante
        document.body.style.backgroundColor = rgbColor;
    };
}
