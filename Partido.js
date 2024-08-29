var letra;
var usgol1 = 0;
var usgol2 = 0;
var minutos = 1;
var segundos = 1;
document.addEventListener("keydown", (letra) =>{
   gol(letra.key);
});

function gol(mensaje){
    if(mensaje == "f"){
        usgol1 ++;
        Us1.innerHTML = usgol1;
    } else if(mensaje == "j"){
        usgol2 ++;
        Us2.innerHTML = usgol2;
    } else if(mensaje == "r"){
        updateClock();
          }
    }


function updateClock() {
    if(segundos > 10){
    document.getElementById('Countdown').innerHTML = minutos + ":" + segundos;
    } else if(segundos < 10){
    document.getElementById('Countdown').innerHTML = minutos + ":" + "0" + segundos;
    }
    if(segundos==0 && minutos == 0){
      console.log('Final');
    }else if(segundos == 0 && minutos > 0){
        segundos = segundos + 59;
        minutos= minutos-1;
    }else{
      segundos-=1;
      setTimeout("updateClock()",1000);
    }
}