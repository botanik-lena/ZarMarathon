class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ selectors, name, hp, type }) {
        super(selectors);

        this.name = name;
        this.hp = {
            defaultHP: hp,
            damageHP: hp,
        };
        this.type = type;

        this.renderHP();
    }

    //Удар Thunder Jolt
    changeHP(count, logF) {
        this.hp.damageHP -= count;

        if (this.hp.damageHP <= 0) {
            this.hp.damageHP = 0;
            alert(`Бедный ${this.name} проиграл бой`);
        }

        this.renderHP();
        logF && logF(count);
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