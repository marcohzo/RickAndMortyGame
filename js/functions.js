import { DOMcontainer } from './selectors.js'
import { playerOne, playerTwo, currentPlayer, partidas } from './objects.js'
import { fetchApi } from './utils.js';
import { accordionItem, element, nodo } from './createHTML.js'

let isLoading = false;

export function renderizarForm() {
    resetPlayer(playerOne);
    resetPlayer(playerTwo);
    resetPlayer(currentPlayer);

    const form = nodo('form', false, 'submit', startGame)
    const formContainer = nodo('div', 'my-5')
    // ========================== OLD GAMES =============================
    const gamesContainer = nodo('div', "d-flex justify-content-between align-items-center")
    element('div', "Partidas jugadas: ", " ", gamesContainer)
    element('div', partidas.length, false, gamesContainer)
    element('button', "Ver", "btn btn-primary", gamesContainer, 'click', () => loading('see'))

    // ========================== PLAYERS =============================
    element('label', 'Jugador 1', 'form-label', formContainer)
    element('input', false, "form-control", formContainer, false, false, 'formElement-1')
    element('label', 'Jugador 2', 'form-label', formContainer)
    element('input', false, "form-control", formContainer, false, false, 'formElement-2')
    element('button', "Empezar", " btn btn-primary mt-3", formContainer)
    form.appendChild(formContainer);
    form.appendChild(gamesContainer);

    DOMcontainer.appendChild(form);
}

const startGame = (e) => {
    e.preventDefault();
    const player1 = document.querySelector("#formElement-1").value;
    const player2 = document.querySelector("#formElement-2").value;
    playerOne.name = player1;
    playerTwo.name = player2;

    loading("render");
};

const loading = async (param) => {
    isLoading = true;
    if (isLoading) {
        DOMcontainer.innerHTML = "";

        const loader = nodo('div', "d-flex mt-5 justify-content-center")

        loader.innerHTML = `
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`;
        DOMcontainer.appendChild(loader);
    }
    setTimeout(() => {
        DOMcontainer.removeChild(DOMcontainer.firstChild);
        isLoading = false;
        param == "render" && gameRender();
        param == "fight" && fight();
        param == "newGame" && renderizarForm();
        param == "see" && seeGames();
    }, 1000);
};

const gameRender = async () => {
    playerOne.characters.length < 1 &&
        playerTwo.characters.length < 1 &&
        (await fetchApi());

    //CREAR FUNCION QUE SELECCIONE EL JUGADOR
    const changePlaylayerSelected = () => {
        currentPlayer.name == playerOne.name
            ? (currentPlayer.name = playerTwo.name,
                currentPlayer.characters = playerTwo.characters,
                currentPlayer.power = playerTwo.power)
            : (currentPlayer.name = playerOne.name,
                currentPlayer.characters = playerOne.characters,
                currentPlayer.power = playerOne.power);
        loading("render");
    };
    const checkPlayer = async () => {
        if (currentPlayer.characters.length < 1) {
            currentPlayer.name = playerOne.name,
                currentPlayer.characters = playerOne.characters,
                currentPlayer.power = playerOne.power
        }
    };
    await checkPlayer();

    const characters = nodo('div', "h2", false, false, 'Personajes')
    const carrousel = nodo('div', "d-flex align-items-center mt-3", false, false)
    carrousel.innerHTML = `
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
      <div class="carousel-item active text-center">
        <img src=${currentPlayer.characters[0].image} class="d-block game-img" alt="...">
      </div>
      <div class="carousel-item active text-center">
        <img src=${currentPlayer.characters[1].image} class="d-block game-img" alt="...">
      </div>
      <div class="carousel-item active text-center">
      <img src=${currentPlayer.characters[2].image} class="d-block game-img" alt="...">
    </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`
        ;
    const playerName = nodo('div', "h3", false, false, `Jugador: ${currentPlayer.name}`)
    const habilityPower = nodo('div', "h4", false, false, `Poder de habilidad: ${currentPlayer.power}`)
    const buttonsContainer = nodo('div', "d-flex justify-content-between")
    element('button', "Cambiar jugador", "btn btn-primary mb-3 mt-1 px-1", buttonsContainer, 'click', changePlaylayerSelected)
    element('button', "Pelear", "btn btn-danger mb-3 mt-1 px-1", buttonsContainer, 'click', () => loading("fight"))

    DOMcontainer.insertBefore(characters, DOMcontainer.children[0]);
    DOMcontainer.appendChild(carrousel);
    DOMcontainer.appendChild(buttonsContainer);

    DOMcontainer.insertBefore(playerName, DOMcontainer.children[2]);
    DOMcontainer.insertBefore(habilityPower, DOMcontainer.children[2]);
};

const resetPlayer = (player) => {
    player.name = '';
    player.characters = [];
    player.power = '';
}

const fight = () => {
    let winner;
    (playerOne.power === playerTwo.power) && (winner = "Empate");
    playerOne.power > playerTwo.power
        ? (winner = playerOne.name)
        : (winner = playerTwo.name);
    element('div', `El ganador es: ${winner}`, "h3", DOMcontainer)
    element('button', "Volver", "btn btn-primary mb-3 mt-1 px-1", DOMcontainer, 'click', () => {
        partidas.push(
            {
                id: partidas.length + 1,
                nameWinner: winner,
                game: [
                    { name: playerOne.name, characters: playerOne.characters, power: playerOne.power },
                    { name: playerTwo.name, characters: playerTwo.characters, power: playerTwo.power }
                ]
            }
        );
        loading("newGame");
    })

};

const seeGames = () => {
    const accordion = nodo('div', 'accordion')
    if (partidas.length > 0) {
        partidas.map(element => accordionItem(element, accordion))
    } else {
        element('div', 'No hay partidas', 'h4',accordion)
    }
    DOMcontainer.appendChild(accordion)

    element('button', "Volver", "btn btn-primary mb-3 mt-1 px-1", DOMcontainer, 'click', () => {
        loading("newGame");
    })
}