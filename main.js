/* Задача 1 */

let firstRow = prompt("Введите первую строку");
let secondRow = prompt("Введите вторую строку");
let letter = prompt("Какую букву будем считать?")

function getRow(firstRow, secondRow) {
    let firstCount = 0;
    let secondCount = 0;

    if (firstRow.length > 0) {
        for (let i = 0; i < firstRow.length; i++) {
            if (firstRow.toLowerCase().charAt(i) === letter.toLowerCase()) {     //интересная замена firstRow[i]
                firstCount++;
            }
        }
    }
    else {
        return "Первая строка пустая";
    }

    if (secondRow.length > 0) {
        for (let i = 0; i < secondRow.length; i++) {
            if (secondRow.charAt(i) === letter) {
                secondCount++;
            }
        }
    }
    else {
        return "Вторая строка пустая";
    }

    if (firstCount > secondCount) {
        return firstRow;
    }
    else if (secondCount > firstCount) {
        return secondRow;
    }
    else {
        return `Количество букв "${letter}" в строках одинакого`;
    }
}

alert(`Букв "${letter}" больше в строке: "${getRow(firstRow, secondRow)}"`);

console.log(getRow(firstRow, secondRow));


/* Задача 2 */
let phone = prompt("Введите номер телефона");
let formatPhone = "";

function formattedPhone(phone) {
    phone.trim();

    if ((phone.length < 10) || (phone.length > 12)) {
        return "Вы ввели неверный номер телефона";
    }
    else {
        if ((phone.length == 12) && (phone.charAt(0) == "+") && (phone.charAt(1) == 7)) {
            formatPhone = phone.charAt(0) + phone.charAt(1) + " (" + phone.charAt(2) + phone.charAt(3) + phone.charAt(4) + ") " + phone.charAt(5) + phone.charAt(6) + phone.charAt(7) + "-" + phone.charAt(8) + phone.charAt(9) + "-" + phone.charAt(10) + phone.charAt(11);
        }
        if ((phone.length == 11) && (phone.charAt(0) == 8)) {
            formatPhone = "+7" + " (" + phone.charAt(1) + phone.charAt(2) + phone.charAt(3) + ") " + phone.charAt(4) + phone.charAt(5) + phone.charAt(6) + "-" + phone.charAt(7) + phone.charAt(8) + "-" + phone.charAt(9) + phone.charAt(10);
        }
        if (phone.length == 10) {
            formatPhone = "+7" + " (" + phone.charAt(0) + phone.charAt(1) + phone.charAt(2) + ") " + phone.charAt(3) + phone.charAt(4) + phone.charAt(5) + "-" + phone.charAt(6) + phone.charAt(7) + "-" + phone.charAt(8) + phone.charAt(9);
        }
        return formatPhone;
    }
}
alert(`Форматированный номер телефона: ${formattedPhone(phone)}`);
console.log(formattedPhone(phone));