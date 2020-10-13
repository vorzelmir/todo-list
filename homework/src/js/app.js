let temp = localStorage.getItem('key');
let quest = JSON.parse(temp);

let questionContent = document.querySelector('.header-question');
let buttonStart = document.querySelector('.button-start');
let quiz = document.querySelectorAll('.quiz');
let content = document.querySelector('.content');
let wrapper = document.querySelector('.wrapper');
let totalPrize = document.querySelector('.total-prize span');
let currentPrize = document.querySelector('.current-prize span');
let buttonSkip = document.querySelector('.button-skip');
buttonSkip.disabled = true;
const startPrize = 100;
let prize = startPrize;
const doublePrize = 2;
const million = 1000000;

buttonStart.addEventListener('click', startGame);

let index = 0;
function startGame() {
    questionContent.style.display = 'block';
    wrapper.style.display = 'block';
    choiceQuestion();
    buttonStart.disabled = true;
    buttonSkip.disabled = false;
    buttonStart.style.opacity = '0.7';
    buttonStart.style.cursor = 'auto';
    totalPrize.textContent = 0;
    currentPrize.textContent = 100;
    prize = startPrize;
}

function choiceQuestion() {
    index = Math.round(Math.random() * quest.length);
    quest.splice(index, 1);
    questionContent.textContent = quest[index]['question'];
    for (let i = 0; i < quiz.length; i++) {
        quiz[i].textContent = quest[index]['content'][i];
    }
}


for (let i = 0; i < quiz.length; i++) {
    quiz[i].addEventListener('click', function() {
        let answer = this.textContent;
        let correctIndex = quest[index]['correct'];
        let correctAnswer = quest[index]['content'][correctIndex];
        
        if (answer === correctAnswer) {
            prize = prize * doublePrize;
            totalPrize.textContent = Number(totalPrize.textContent) + prize;
            currentPrize.textContent = prize;
            choiceQuestion();
        } else {
            questionContent.textContent = `Game over. Your prize is: ${totalPrize.textContent}`;
            totalPrize.textContent = 0;
            currentPrize.textContent = 100;
            wrapper.style.display = 'none';
            buttonStart.disabled = false;
            buttonStart.style.cursor = 'pointer';
            buttonSkip.disabled = true;
            buttonSkip.style.cursor = 'auto';
        }
        
        if (Number(totalPrize.textContent) >= million) {
            questionContent.textContent = 'Congratulation. You won 1000000';
            wrapper.style.display = 'none';
        }
    });
}

buttonSkip.addEventListener('click', function () {
    choiceQuestion();
    buttonSkip.disabled = true;
    buttonSkip.style.cursor = 'auto';
    buttonSkip.style.opacity = '0.7';
});