function $getElById(id) {
    return document.getElementById(id);
}


const $btn = $getElById("btn-kick");
const $btnDischarge = $getElById("btn-discharge");
const $btnRandomize = $getElById("btn-randomize");

const character = {
    name: "Pikachu",
    defaultHP: 200,
    damageHP: 200,
    elHP: $getElById("health-character"),
    elProgressbar: $getElById("progressbar-character"),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

const enemy = {
    name: "Charmander",
    defaultHP: 200,
    damageHP: 200,
    elHP: $getElById("health-enemy"),
    elProgressbar: $getElById("progressbar-enemy"),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    discharge: discharge,
}
//Кнопка ударит двоих сразу
$btn.addEventListener("click", () => {
    console.log("Kick!");
    character.changeHP(random(20));
    enemy.changeHP(random(20));
});
//Кнопка ударит врага
$btnDischarge.addEventListener("click", () => {
    console.log("Discharge!");
    enemy.discharge();
});

//Кнопка рандомного выбора удара
$btnRandomize.addEventListener("click", () => {
    let ran = random(30);
    if (ran > 15) {
        enemy.discharge;
        console.log("Luck smiled at Pikachu");
    }
    else if (ran < 15) {
        character.changeHP(random(15));
        console.log("Luck smiled at Charmander");
    }
    else {
        console.log("Lucky to all pokemon");
    }
    $btnRandomize.disabled = true;
});

//Отображение конкретных игроков
function init() {
    console.log("Start Game!");
    character.renderHP();
    enemy.renderHP();
}

//Отображение жизни и прогрессбара
function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

//Отрисовка жизни
function renderHPLife() {
    this.elHP.innerText = this.damageHP + " / " + this.defaultHP;
}

//Отрисовка прогрессбара
function renderProgressbarHP() {
    this.elProgressbar.style.width = ((this.damageHP / this.defaultHP) * 100) + "%";
}

//Удар Thunder Jolt
function changeHP(count) {
    this.damageHP -= count;

    const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
    console.log(log);
    createLog(log);

    if (this.damageHP <= 0) {
        this.damageHP = 0;
        alert("Бедный " + this.name + " проиграл бой!");
        $btn.disabled = true;
        $btnDischarge.disabled = true;
    }

    this.renderHP();
}
//Запись действий боя в новые параграфы, где верхний параграф - последнее действие
function createLog(log) {
    const $logs = document.querySelector("#logs");

    const $p = document.createElement("p");
    $p.innerHTML = log;
    $logs.insertBefore($p, $logs.children[0]);

}
//Получение случайного числа от 0 до num
function random(num) {
    return Math.ceil(Math.random() * num);
}
//Функция удара в зависимости от кол-ва букв в name игрока
function discharge() {
    if ((this.name.length % 2 === 0) && (this.damageHP > 10)) {
        this.damageHP -= 10;

        const log = this === enemy ? generateLog(this, character, 10) : generateLog(this, enemy, count);
        console.log(log);
        createLog(log);
    }
    else if (this.damageHP > 19) {
        this.damageHP -= 19;

        const log = this === enemy ? generateLog(this, character, 19) : generateLog(this, enemy, count);
        console.log(log);
        createLog(log);
    }
    else {
        this.damageHP = 0;
        alert("Бедный " + this.name + " проиграл бой!");
        $btnDischarge.disabled = true;
        $btn.disabled = true;
    }

    this.renderHP();
}

//Генерация описания действий в бою
function generateLog(firstPerson, secondPerson, loss) {        //loss - потеря
    let firstDm = firstPerson.damageHP;
    let firstDf = firstPerson.defaultHP;

    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${loss} [${firstDm}/${firstDf}]`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${loss} [${firstDm}/${firstDf}]`
    ];

    return logs[random(logs.length) - 1];
}

//Запуск игры
init();

