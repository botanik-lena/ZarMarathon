import Pokemon from "./Pokemon.js";
import { random, countBtn, disable, generateLog, createLog } from "./utils.js";
// import { pokemons } from "./pokemons.js";
import Game from "./Game.js";

//Получение покемонов
const game = new Game();
let pokemons;
game.start().then(data => pokemons = data);


//Начало игры
function startGame() {
    $btnStart.disabled = true;

    let gamers = createPlayers(pokemons);  //массив из двух игроков, где gamers[0]-первый игрок, gamers[1]-второй
    let gamer1 = gamers[0];
    let gamer2 = gamers[1];

    renderPlayers(gamer1, gamer2);
}

const $btnStart = document.querySelector(".start");
$btnStart.addEventListener("click", startGame);


//Перезапуск игры
const $btnReset = document.querySelector(".reset");

$btnReset.addEventListener("click", () => {
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());
    startGame();
});


//Перезапуск, если выиграл первый игрок - смена противника
function restartOpponent(gamerWin) {
    $btnStart.disabled = true;
    const allButtons = document.querySelectorAll('.control .button');

    allButtons.forEach($item => $item.remove());

    let gamers = createPlayers(pokemons);
    let gamer2 = gamers[1];

    renderPlayers(gamerWin, gamer2);
}


//Создание рандомных игроков
function createPlayers(arrayPlayers) {
    let num1 = 0;
    let num2 = 0;

    while (num1 === num2) {
        num1 = random(0, arrayPlayers.length - 1);
        num2 = random(0, arrayPlayers.length - 1);
    }

    //Рандомный выбор игроков
    let p1 = arrayPlayers[num1];
    let p2 = arrayPlayers[num2];


    const player1 = new Pokemon({
        ...p1,
        selectors: "player1",
    });
    // console.log(player1);

    const player2 = new Pokemon({
        ...p2,
        selectors: "player2",
    });
    // console.log(player2);

    return [player1, player2];  //возвращает массив из двух игроков
}



const $control = document.querySelector(".control");

function renderPlayers(gamer1, gamer2) {

    gamer1.attacks.forEach(item => {                        //первый игрок
        const $button = document.createElement("button");
        $button.classList.add("button");
        $button.classList.add("btnPlayer1");
        $button.disabled = true;

        $button.innerText = item.name;
        const btnCount = countBtn(item.maxCount, $button, item.name);

        $button.addEventListener("click", () => {
            console.log("Click button ", $button.innerText);
            btnCount();

            let count = random(item.minDamage, item.maxDamage);

            let btnPlayer1 = document.querySelectorAll(".btnPlayer1");  //Заблокирует кнопки первого игрока
            btnPlayer1.forEach(item => {
                item.disabled = true;
            });

            gamer2.changeHP(count, function (count) {
                let log = generateLog(gamer1, gamer2, count);
                createLog(log);
                console.log(log);

                let btnPlayer2 = document.querySelectorAll(".btnPlayer2");  //Разблокирует кнопки второго игрока
                btnPlayer2.forEach(item => {
                    item.disabled = false;
                });

                if (gamer2.hp.damageHP === 0) {
                    disable();
                    restartOpponent(gamer1);
                }

            });
        });

        const $elImg = document.getElementById("img-player1");
        $elImg.src = gamer1.img;
        const $elName = document.getElementById("name-player1");
        $elName.innerText = gamer1.name;

        $control.appendChild($button);
    });


    gamer2.attacks.forEach(item => {                            //второй игрок
        const $button = document.createElement("button");
        $button.classList.add("button");
        $button.classList.add("btnPlayer2");

        $button.innerText = item.name;
        const btnCount = countBtn(item.maxCount, $button, item.name);

        $button.addEventListener("click", () => {
            console.log("Click button ", $button.innerText);
            btnCount();

            let count = random(item.minDamage, item.maxDamage);

            let btnPlayer2 = document.querySelectorAll(".btnPlayer2");  //Заблокирует кнопки второго игрока
            btnPlayer2.forEach(item => {
                item.disabled = true;
            });

            gamer1.changeHP(count, function (count) {
                const log = generateLog(gamer2, gamer1, count);
                createLog(log);
                console.log(log);

                let btnPlayer1 = document.querySelectorAll(".btnPlayer1");  //Разблокирует кнопки первого игрока
                btnPlayer1.forEach(item => {
                    item.disabled = false;
                });

                if (gamer1.hp.damageHP === 0) {
                    disable();
                }
            });
        });

        const $elImg = document.getElementById("img-player2");
        $elImg.src = gamer2.img;
        const $elName = document.getElementById("name-player2");
        $elName.innerText = gamer2.name;

        $control.appendChild($button);
    });
}