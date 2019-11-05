function roll() {
    return Math.floor(Math.random() * 10000) / 100;
}

let defense = 300;

function defenseBonus() {
    return (defense - 300) * 4;
}

function miss() {
    let c = 0;
    return Math.max(0, c + defenseBonus());
}

function dodge() {
    let c = 500;
    return Math.max(0, c + defenseBonus());
}

function block() {
    let c = 1000;
    return Math.max(0, c + defenseBonus());
}

function parry() {
    let c = 1000;
    return Math.max(0, c + defenseBonus());
}

function crit() {
    let c = 2500;
    return Math.max(0, c - defenseBonus());
}

function hit() {
    return Math.max(0, 10000 - (miss() + dodge() + block() + parry() + crit()));
}

const attackTable = [
    [miss, missElem, missRoll],
    [dodge, dodgeElem, dodgeRoll],
    [block, blockElem, blockRoll],
    [parry, parryElem, parryRoll],
    [crit, critElem, critRoll],
    [hit, hitElem, hitRoll]
];

function updateTable() {

    let rollCurrent = 0;
    attackTable.forEach(t => {
        t[1].innerText = (t[0]() / 100).toFixed(2);
        t[2].innerText = (rollCurrent / 100).toFixed(2) + " to " + ((rollCurrent + t[0]() - 1) / 100).toFixed(2);
        rollCurrent += t[0]();
    });


}

function changeDefense(e) {
    defense = defenseSlider.value;
    updateTable();
}

updateTable();