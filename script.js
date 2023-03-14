let hour = document.getElementById('hour');
let minute = document.getElementById('minute');
let seconds = document.getElementById('seconds');
let clockIn = document.getElementById('clockIn');
let clockOut = document.getElementById('clockOut');
let takeBreak = document.getElementById('takeBreak');
let resumeWork = document.getElementById('resumeWork');

let intervalId = null;
let isRunning = false;
let isOnBreak = false;

function start(){

    if(!isRunning){
        isRunning = true;

        intervalId = setInterval(function(){
            seconds.innerHTML++;
            if(seconds.innerHTML<10) {
                seconds.innerHTML = '0'+ seconds.innerHTML
            } 

            if(seconds.innerHTML == 60){
                seconds.innerHTML = '0' + 0;
                minute.innerHTML++;
                if(minute.innerHTML<10) {
                    minute.innerHTML = '0'+ minute.innerHTML
                }
            }

            if(minute.innerHTML == 60){
                minute.innerHTML = '0' + 0;
                hour.innerHTML++;
                if(hour.innerHTML<10) {
                    hour.innerHTML = '0'+ hour.innerHTML
                }
            }
        },1000);
        console.log(intervalId)

    }


    }





function stop(){

if(isRunning){
    isRunning = false;
    clearInterval(intervalId);
}

}

function reset(){


    if(isRunning){
        isRunning = false;
        clearInterval(intervalId);
        hour.innerHTML = '0' + 0;
        minute.innerHTML = '0' + 0;
        seconds.innerHTML = '0' + 0;
    }

}



function toggleBreak (){
    

    if(isOnBreak){
        // On the break : Resume the work
        isOnBreak = false ;
        takeBreak.innerHTML= "Take a Break"
        start();
    } else {
          // Not on break: then initiate break
          isOnBreak=true;
          takeBreak.innerHTML= "Resume Work"
          stop();
    }
}



clockIn.addEventListener('click', start)
takeBreak.addEventListener('click',toggleBreak)
clockOut.addEventListener('click', reset)


// small hack to run the timer even if the tab is inactive 
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      start();
    } else {
      start();
    }
  });