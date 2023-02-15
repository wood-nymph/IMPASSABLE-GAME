'use strict';

// Элементы из HTML
const replenishElement = document.getElementById(`replenish`);
const withdrawElement = document.getElementById(`withdraw`);
const startElement = document.getElementById(`start`);
const balanceElement = document.getElementById(`balance`);
let containerElement = document.querySelector(`.container`);
let number = Math.ceil(Math.random() * 3600);

// Глобальные переменные
balanceElement.textContent = 0;
let balance = 0;
let sumScore = 0;
let game = false;

alert(`Правила: \n 1. Правила по-русски, потому что я так хочу; \n 2. Это твой последний шанс слиться; \n 3. Я дарю тебе 1000 баллов, если ты сможешь сохранить их и увеличить до 10000, то ты настоящий шулер.`);

// Добавить средства
replenishElement.addEventListener(`click`, function replenish(){
    document.querySelector(`.background`).style.opacity = 100;
    balanceElement.textContent = 1000;
    balance = 1000;
    sumScore = 1000;
    game = true;
});

// Игра
startElement.addEventListener(`click`, function() { 
    if(game) {
    // Крутит колесо
    containerElement.style.transform = "rotate("+ number +"deg)"; 
    number += Math.ceil(Math.random() * 3600); 
    // Определяет выпавший блок
    const arrow = document.querySelectorAll('.span')[0] 
    Promise.all(containerElement.getAnimations().map((animation) => animation.finished)).then( 
        () => { 
            const result = document.elementsFromPoint(getOffset(arrow).left + arrow.offsetWidth/2, getOffset(arrow).top)  
            // Добавить средства
            balance = balanceElement.textContent; 
            if(Number(balance) > 0) {
                let fund = result[1].textContent;
                console.log(fund);
                if(fund.typeof === `number` || fund > 0) {
                    sumScore += Number(fund);
                    balanceElement.textContent = sumScore;
                } else if(fund.typeof === `number` || fund < 0) {
                    sumScore += Number(fund);
                    balanceElement.textContent = sumScore;
                } else {
                    game = false;
                    balanceElement.textContent = 0;
                    alert(`Game over`);
                };
            } else if(Number(balance) <= 0) {
                game = false;
                alert(`Game over`);
            };
    });
}
});
 

// Координаты
function getOffset(el) { 
    const rect = el.getBoundingClientRect(); 
    return { 
      left: rect.left + window.scrollX, 
      top: rect.top + window.scrollY 
    }; 
};

// Вывод средств
withdrawElement.addEventListener(`click`, function(){
    let balance = balanceElement.textContent;
    if(balance > 10000) {
        game = false;
        alert(`Вауууу даже у меня не получилось пройти, наверное сегодня твой день и можно купить лотерейный билетик :) \n Ну а вообще это профилактика азартных игр, представь если бы это были реальные деньги, сколько бы ты просадил \n Как говорится: всегда выигрывает заведение, во как`);
        balanceElement.textContent = 0;
        sumScore = 1000;
        document.querySelector(`.background`).style.opacity = 0;
    } else {
        alert(`Withdrawal from 10000`);
    };
});
