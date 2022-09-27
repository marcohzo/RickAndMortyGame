import { playerOne, playerTwo } from './objects.js'

export const fetchApi = async () => {
    let characters;

    const res = await fetch(
        "https://rickandmortyapi.com/api/character/?page=1"
    );
    characters = await res.json();

    for (let i = 0; i < 3; i++) {
        playerOne.characters[i] =
            characters.results[Math.floor(numeroAleatorioDecimales(19))];
        playerOne.power += playerOne.characters[i].id;
        playerTwo.characters[i] =
            characters.results[Math.floor(numeroAleatorioDecimales(19))];
        playerTwo.power += playerTwo.characters[i].id;
    }

    playerOne.power =
        playerOne.characters[0].id +
        playerOne.characters[1].id +
        playerOne.characters[2].id;
    playerTwo.power =
        playerTwo.characters[0].id +
        playerTwo.characters[1].id +
        playerTwo.characters[2].id;

    console.log(playerOne);
    console.log(playerTwo);

    function numeroAleatorioDecimales(max) {
        var num = Math.random() * (max);
        return num + 1;
    }
};