/******************************************
 *  Author : Author
 *  Created On : Thu Apr 28 2022
 *  File : app.js
 *******************************************/

const bill = document.getElementById("bill");
const people = document.getElementById("people");

const percent = document.querySelectorAll(".percent");
const custom = document.getElementById("custom");
const resetButton = document.getElementById("reset");

const perTip = document.getElementById("tip_money");
const perTotal = document.getElementById("total_money");

custom.addEventListener("keyup", () => {
    percent.forEach((e) => (e.checked = false));
    calculate();
});

percent.forEach((tip) =>
    tip.addEventListener("click", () => {
        Custom();
        calculate();
    })
);

people.addEventListener("keyup", () => calculate());

bill.addEventListener("keyup", () => calculate());

resetButton.addEventListener("click", () => {
    updateResult("0.00", "0.00", true);
});

function Custom() {
    custom.value = "";
}

function findPercent() {
    if (custom.value == "") {
        percent.forEach((e) => {
            if (e.checked == true) {
                console.log(e.value);
                tipValue = Number(e.value);
            }
        });
    } else {
        tipValue = custom.value;
    }
    return tipValue;
}

function calculate() {
    console.log(bill.value);
    console.log(people.value);
    if (people.value == "" || people.value == "0") {
        console.log("NoNo");
        //cant xero message
    } else {
        console.log("Yaay");
        tipValue = findPercent();
        realCalc(tipValue);
    }
}

function updateResult(tipPerPerson, totalPerPerson, reset) {
    perTip.innerHTML = tipPerPerson;
    perTotal.innerHTML = totalPerPerson;
    if (reset == true) {
        if (reset == true) {
            Custom();
            bill.value = people.value = "";
            resetButton.disabled = true;
        }
    }
}

function realCalc(tipValue) {
    totalBill = Number(bill.value);
    numPeople = Number(people.value);
    const totalTip = totalBill * (tipValue / 100);
    const tipPerPerson = (totalTip / numPeople).toFixed(2);
    const totalPerPerson = ((totalBill + totalTip) / numPeople).toFixed(2);
    updateResult(tipPerPerson, totalPerPerson, false);
}
