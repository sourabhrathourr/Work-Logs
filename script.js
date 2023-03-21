let timerDisplay = document.getElementById('timerDisplay');
let clockIn = document.getElementById('clockIn');
let clockOut = document.getElementById('clockOut');
let takeBreak = document.getElementById('takeBreak');
let logs = document.getElementById('logs')


let startTime, elapsedTime = 0;
let timerInterval;
let toggleBreak = false;
let temp;
let clearBtn = document.createElement('button')
clearBtn.setAttribute('class','button2')
let buttonText = document.createTextNode("Clear")



function formatTime(time) {
    // Format time in HH:MM:SS (time parameter would be in seconds) 
    let hour = Math.floor(time / 3600).toString().padStart(2, '0');
    let minute = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    let seconds = Math.floor(time % 60).toString().padStart(2, '0');

    // return the time elapsed in this format 
    return `${hour} : ${minute} : ${seconds}`;
}



function startTimer() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        localStorage.setItem('startTime', startTime);
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            timerDisplay.textContent = formatTime(elapsedTime / 1000);
            localStorage.setItem('elapsedTime', elapsedTime);
        }, 1000);
        clockIn.disabled = true; // disable clock in button when timer is running
    }
} 

function stopTimer() {


    if (timerInterval) {
        temp = elapsedTime;
        localStorage.setItem('temp' , temp)
        console.log(`Your session lasted for ${formatTime(temp/1000)}`)
        clearInterval(timerInterval);
        elapsedTime = 0;
        timerDisplay.textContent = formatTime(elapsedTime / 1000);
        localStorage.removeItem('startTime');
        localStorage.removeItem('elapsedTime');
        timerInterval = null;
        clockIn.disabled = false; // enable clock in button when timer is stopped

        logs.innerHTML = `<span>Your session lasted for - ${formatTime(temp/1000)}</span>`;

        clearBtn.appendChild(buttonText);
        logs.appendChild(clearBtn)


    }
}


let savedStartTime = localStorage.getItem('startTime')
let savedElapsedTime = localStorage.getItem('elapsedTime')

if(savedStartTime && savedElapsedTime ){

    startTime = parseInt(savedStartTime);

    let timeDiff = Date.now() - startTime;

    elapsedTime = timeDiff;
    startTimer();


}


function pauseTimer() {

    if(!toggleBreak){
   
        if (timerInterval) {
            toggleBreak = true;
            clearInterval(timerInterval);
            localStorage.setItem('elapsedTime', elapsedTime);
            timerInterval = null;
            takeBreak.innerHTML = "Resume Work"
            clockIn.disabled = false; // enable clock in button when timer is paused
        }
    } else {
        toggleBreak = false;
        takeBreak.innerHTML = "Take a break";
        startTimer();
    }

 
}


clockIn.addEventListener('click', startTimer);
clockOut.addEventListener('click', stopTimer);
takeBreak.addEventListener('click' , pauseTimer);
clearBtn.addEventListener('click' , function(){
    logs.innerHTML = ''
})

