import { DOMcontainer } from './selectors.js'
import { playerOne, playerTwo, currentPlayer, partidas } from './objects.js'
import { fetchApi } from './utils.js';

let isLoading = false;

export function renderizarForm() {

    const form = document.createElement("form");
    const formContainer = document.createElement("div");
    formContainer.classList.add("my-5");

    const label = document.createElement("label");
    label.classList.add("form-label");
    label.textContent = "Jugador 1";
    const input = document.createElement("input");
    input.classList.add("form-control");
    input.setAttribute("id", "formElement-1");

    const label2 = document.createElement("label");
    label2.classList.add("form-label");
    label2.textContent = "Jugador 2";
    const input2 = document.createElement("input");
    input2.classList.add("form-control");
    input2.setAttribute("id", "formElement-2");
    // input2.setAttribute('value', 'text');

    const button = document.createElement("button");
    button.textContent = "Empezar";
    button.classList.add("btn", "btn-primary", "mt-3");

    form.addEventListener("submit", startGame);

    // partidas
    const gamesContainer = document.createElement("div");
    gamesContainer.classList.add("d-flex", "justify-content-between", 'align-items-center');
    const oldGames = document.createElement("div");
    oldGames.textContent = "Partidas jugadas: ";
    const numGames = document.createElement("div");
    numGames.textContent = partidas.length;
    const btnGames = document.createElement("button");
    btnGames.textContent = 'Ver';
    btnGames.classList.add("btn", "btn-primary");
    btnGames.addEventListener("click", seeGames);


    gamesContainer.appendChild(oldGames);
    gamesContainer.appendChild(numGames);
    gamesContainer.appendChild(btnGames);

    formContainer.appendChild(label);
    formContainer.appendChild(input);
    formContainer.appendChild(label2);
    formContainer.appendChild(input2);
    formContainer.appendChild(button);
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
        // DOMcontainer.removeChild(DOMcontainer.firstChild)
        const div = document.createElement("div");
        div.classList.add("d-flex", "mt-5", "justify-content-center");

        div.innerHTML = `
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>`;

        DOMcontainer.appendChild(div);
    }
    setTimeout(() => {
        DOMcontainer.removeChild(DOMcontainer.firstChild);
        isLoading = false;
        // console.log(param );
        param == "render" && gameRender();
        param == "fight" && fight();
        param == "newGame" && renderizarForm();
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

    // CREAR OBJETO CURRENT PLAYER REFERENCIADO AL JUGADOR
    const characters = document.createElement("div");
    characters.classList.add("h2");
    characters.textContent = `Personajes`;
    const carrousel = document.createElement("div");
    carrousel.classList.add("d-flex", "align-items-center", "mt-3");
    const playerName = document.createElement("div");
    playerName.classList.add("h2");
    playerName.textContent = `Jugador: ${currentPlayer.name}`;
    const habilityPower = document.createElement("div");
    habilityPower.classList.add("h4");
    habilityPower.textContent = `Poder de habilidad: ${currentPlayer.power}`;
    carrousel.innerHTML = `
          <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
      <div class="carousel-item active">
        <img src=${currentPlayer.characters[0].image} class="d-block w-100 " alt="...">
      </div>
      <div class="carousel-item active">
        <img src=${currentPlayer.characters[1].image} class="d-block w-100 " alt="...">
      </div><div class="carousel-item active">
      <img src=${currentPlayer.characters[2].image} class="d-block w-100 " alt="...">
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
    // CUANDO CAMBIES EL JUGADOR, QUE BORRE EL CARROUSEL, Y VUELVA A CREARSE CON LOS DATOS DEL JUGADOR
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("d-flex", "justify-content-between");

    const changePlayer = document.createElement("button");
    changePlayer.classList.add("btn", "btn-primary", "mb-3", "mt-1", "px-1");
    changePlayer.textContent = "Cambiar jugador";
    changePlayer.addEventListener("click", changePlaylayerSelected);

    const fightButton = document.createElement("button");
    fightButton.classList.add("btn", "btn-danger", "mb-3", "mt-1", "px-1");
    fightButton.textContent = "Pelear";
    fightButton.addEventListener("click", () => loading("fight"));

    DOMcontainer.insertBefore(characters, DOMcontainer.children[0]);
    DOMcontainer.appendChild(carrousel);
    buttonsContainer.appendChild(changePlayer);
    buttonsContainer.appendChild(fightButton);
    DOMcontainer.appendChild(buttonsContainer);

    DOMcontainer.insertBefore(playerName, DOMcontainer.children[2]);
    DOMcontainer.insertBefore(habilityPower, DOMcontainer.children[2]);
};

const fight = () => {
    let winner;
    playerOne.power === playerTwo.power && (winner = "Empate");
    playerOne.power > playerTwo.power
        ? (winner = playerOne.name)
        : (winner = playerTwo.name);
    const fightResult = document.createElement("div");
    const btnReset = document.createElement("button");
    btnReset.classList.add("btn", "btn-primary", "mb-3", "mt-1", "px-1");
    btnReset.textContent = "volver";
    fightResult.classList.add("h2");
    fightResult.textContent = `El ganador es: ${winner}`;

    DOMcontainer.appendChild(fightResult);
    DOMcontainer.appendChild(btnReset);
    btnReset.addEventListener("click", () => {
        partidas.push({ nameWinner: winner, game: [playerOne, playerTwo] });
        loading("newGame");
    });
};

const seeGames = () => {
    loading()
    const accordion = document.createElement("div");
    const accordionElement = document.createElement("div");
    accordionElement.innerHTML = `
    <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Accordion Item #1
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingTwo">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Accordion Item #2
        </button>
      </h2>
      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingThree">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Accordion Item #3
        </button>
      </h2>
      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
        </div>
      </div>
    </div>
  </div>`;
    DOMcontainer.appendChild(accordion)
    accordion.appendChild(accordionElement)
}