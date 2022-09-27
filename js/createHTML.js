export const accordionItem = (item, nodo) => {
    console.log(item);
    const accordionElement = document.createElement("div");
    accordionElement.innerHTML = `
    <div class="accordion-item">
    <h2 class="accordion-header" id="game-id-${item.id}">
      <button
        class="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#game-${item.id}"
        aria-expanded="true"
        aria-controls="game-${item.id}"
      >
        ${item.game[0].name} vs ${item.game[1].name}
      </button>
    </h2>
    <div
      id="game-${item.id}"
      class="accordion-collapse collapse show"
      aria-labelledby="game-id-${item.id}"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        Personajes player 1: ${item.game[0].characters.map(character => `<strong> ${character.name}</strong>`)} -
      </div>
      <div class='accordion-body'>
      Personajes player 2: ${item.game[1].characters.map(character => `<strong> ${character.name}</strong>`)} -
      </div>
      <div class='accordion-body'>
      Ganador <strong> ${item.nameWinner} </strong>
      </div>
    </div>
  </div>`;
    nodo.appendChild(accordionElement)
}