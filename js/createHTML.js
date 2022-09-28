export const accordionItem = (item, nodo) => {
  const accordionElement = document.createElement("div");
  accordionElement.innerHTML = `
    <div class="accordion-item mt-2">
    <h2 class="accordion-header" id="game-id-${item.id}">
      <button
        class="accordion-button ${item.id>1&&'collapsed'}"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#game-${item.id}"
        aria-expanded="${item.id===0?true:false}"
        aria-controls="game-${item.id}"
      >
        ${item.game[0].name} vs ${item.game[1].name}
      </button>
    </h2>
    <div
      id="game-${item.id}"
      class="accordion-collapse collapse ${item.id===1&&'show'}"
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

export const element = (elemento, text, clases, nodo, event, func, id) => {
  const element = document.createElement(elemento);
  if (text || text==0) { element.textContent = text }
  if (clases) { element.setAttribute('class', clases) }
  if (event) { element.addEventListener(event, func) }
  if (id) { element.setAttribute('id', id) }

  nodo.appendChild(element)
}

export const nodo = (elemento, clases, event, func, text) => {
  const element = document.createElement(elemento);
  element.setAttribute('class', clases)
  if (text || text==0) { element.textContent = text }
  if (event) { element.addEventListener(event, func)}
  return element
}