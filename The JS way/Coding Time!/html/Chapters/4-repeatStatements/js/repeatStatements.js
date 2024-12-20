document.querySelector('#d1 button').addEventListener('click', handleButtonClick);
let count = parseInt(document.querySelector('#turnCount').innerText);

const h2 = document.querySelector('h2');
const pre1 = document.querySelector('#pre1');
const code = document.querySelector('#code1');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const d1 = document.querySelector('#d1');
const d2 = document.querySelector('#d1');
const p3 = document.querySelector('#p3');
const p4 = document.querySelector('#p4');


function removePreviousInfo(){
    document.querySelector("h2").innerText = "";
    document.querySelector("#p1").innerText = "";
    document.querySelector("#p2").innerText = "";
    document.querySelector("#p3").innerText = "";
    document.querySelector("#p4").innerText = "";
    document.querySelector("#d1").innerText = "";
    document.querySelector("#d2").innerText = "";
}

// ****Carousel**** //

function handleButtonClick() {
    const inputField = document.querySelector('#userCount');
    if (inputField) {
        const newCount = parseInt(inputField.value);
        
        if (!isNaN(newCount) && newCount > 0) {
            count = newCount;
            document.querySelector('#turnCount').innerText = count; 
            countDown(); 
        } else {
            alert("Please enter a valid positive number!");
        }
    } else {
        countDown();
    }
}

function countDown() {
    clearInterval(window.intervalId);

    window.intervalId = setInterval(() => {
        if (count > 0) {
            count--;
            document.querySelector('#turnCount').innerText = count; 
        } else {
            clearInterval(window.intervalId); 
            showInputField(); 
        }
    }, 1000);
}

function showInputField() {
    document.querySelector('#turnCount').innerHTML = ``;
    document.querySelector('#d2').innerHTML = `
        <input id='userCount' placeholder='Enter new count'>
    `;
    document.querySelector('#p3').innerHTML = `<i class='bx bxs-pear' id='nextPage'></i>`
    document.querySelector('#nextPage').addEventListener('click', parityPage);
}

// ****Parity**** //

function parityPage() {
    removePreviousInfo();
    h2.innerText = 'Parity';
    p1.innerText = 'Check the following program that shows even numbers (divisible by 2) between 1 and 10.';
    pre1.classList.toggle('hidden');
    code.innerHTML = `
    for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
            console.log(\`\${i} is even\`);
        }
    }
    `;
    p2.innerText = 'Improve the program so that it also shows odd numbers. Improve it again to replace the initial number 1 by a number given by the user.';
    d1.innerHTML = `<input id='userParityNum' placeholder='Enter a number'><button id='runParity'>Send it!</button>`;

    const button = document.querySelector('#runParity');
    const input = document.querySelector('#userParityNum');

    button.addEventListener('click', function () {
        const userInput = parseInt(input.value);

        if (isNaN(userInput)) {
            alert("Please enter a valid number.");
            return;
        }

        parity(userInput);
    });

    function parity(start) {
        for (let i = 1; i <= start; i++) {
            if (i % 2 === 0) {
                p3.innerHTML = `${i} is even`;
            } else {
                p3.innerHTML = `${i} is odd`;
            }
        }
        p4.innerHTML = `<i class='bx bx-question-mark' id='nextProblem'></i>`

        document.querySelector('#nextProblem').addEventListener('click', inputValidation);
    }
}

// Multiplication Table? 
function getRandomInt() {
    return Math.floor(Math.random() * 10) + 1;
}
 

function inputValidation(){
        removePreviousInfo();
        pre1.classList.toggle('hidden');
        h2.innerText = 'Number Duel';
        p1.innerText = 'Guess the random number between 1 and 10. You have 3 lives to get it right or EXPLODE!'
        d1.innerHTML = `<input id='userGuess'><button id='checkIt'>Check</button>`

        const button = document.querySelector('#checkIt');
        
        const fullHeart = `<i class='bx bxs-heart'></i>`;
        const emptyHeart = `<i class='bx bx-heart' ></i>`;

        let lives = 3;
        let health = `${fullHeart} ${fullHeart} ${fullHeart}`;
        p2.innerHTML = health;

        button.addEventListener('click', function () {
            const userGuess = parseInt(document.querySelector('#userGuess').value);
            const randomNum = getRandomInt();
            console.log('User Guess = ', userGuess)
            console.log('Random Number = ', randomNum)
            if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
                alert("Please enter a number between 1 and 10!");
                return;
            }
            
            if( userGuess === randomNum ) {
                p3.innerHTML = "You did it!";
                p4.innerHTML = `The random number is ${randomNum}. Click <i class='bx bx-diamond' id='winner'></i> to move on!`;

                document.querySelector('#winner').addEventListener('click', yesOrNo);
            } else {
                lives--;
                if (lives > 0){
                    health = health.replace(fullHeart, emptyHeart);
                    p2.innerHTML = health;
                    p3.innerHTML = "Uh oh, you lost a life!";
                    p4.innerHTML = `The random number is ${randomNum}`;
                } else {
                    p2.innerHTML = "You've lost all your lives! The game is over."
                    p3.innerHTML = "Game Over!";
                    p4.innerHTML = `The random number is ${randomNum}. Click <i class='bx bxs-skull' id='gameOver'></i> to move on.`;
                    document.querySelector('#userGuess').disabled = true;
                    button.disabled = true;
                    document.querySelector('#gameOver').addEventListener('click', yesOrNo);
                }
            }
        });
}


function yesOrNo(){
    removePreviousInfo();
    h2.innerText = 'Neither Yes nor No';
    p1.innerText = 'Write a program that plays "neither yes, nor no" with the user. Specifically, the program asks the user to enter text until either "yes" or "no" is typed, which ends the game.';
}