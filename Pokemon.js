class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ selectors, name, hp, type, attacks = [] }) {
        super(selectors);

        this.name = name;
        this.hp = {
            defaultHP: hp,
            damageHP: hp,
        };
        this.type = type;
        this.attacks = attacks;

        this.renderHP();
    }

    //Удар Thunder Jolt
    changeHP(count, logF) {     //changeHP = () => - вот так почему-то не работает (в Safari) и в некоторых других браузерах
        this.hp.damageHP -= count;

        if (this.hp.damageHP <= 0) {
            this.hp.damageHP = 0;
            alert(`Бедный ${this.name} проиграл бой`);
        }

        this.renderHP();
        logF && logF(count);
    }

    //Функция удара в зависимости от кол-ва букв в name игрока
    discharge() {
        const a = 10;
        const b = 19;

        if ((this.name.length % 2 === 0) && (this.hp.damageHP > 10)) {
            this.hp.damageHP -= a;
            this.renderHP();

            return a;
        }

        else if (this.hp.damageHP > 19) {
            this.hp.damageHP -= b;
            this.renderHP();

            return b;
        }
    }

    //Удар Splash
    splash() {
        this.hp.damageHP -= 23;

        if (this.hp.damageHP <= 0) {
            this.hp.damageHP = 0;
            alert(`Бедный ${this.name} проиграл бой`);
        }

        this.renderHP();
    }

    //Отображение жизни и прогрессбара
    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    //Отрисовка жизни
    renderHPLife() {
        const { elHP, hp: { defaultHP, damageHP } } = this;

        elHP.innerText = damageHP + " / " + defaultHP;
    }

    //Отрисовка прогрессбара
    renderProgressbarHP() {
        const { elProgressbar, hp: { defaultHP, damageHP } } = this;

        elProgressbar.style.width = ((damageHP / defaultHP) * 100) + "%";
    }
}

export default Pokemon;