var letra;
var usgol1 = 0;
var usgol2 = 0;
var minutos = 0;
var segundos = 122;
var segundos_muestra = 0;
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
    while(segundos >= 60){
        segundos - 60;
        //segundos_muestra = segundos -60;
        minutos = minutos + 1;
    }
    if(segundos > 10){
    document.getElementById('Countdown').innerHTML ="0" + minutos + ":" + segundos_muestra;
    } else if(segundos < 10){
    document.getElementById('Countdown').innerHTML ="0" + minutos + ":" + "0" + segundos_muestra;
    }
    if(segundos==0 && minutos == 0){
      console.log('Final');
    //}else if(segundos_muestra == 0 && minutos > 0){
       // minutos = minutos-1;
       // segundos_muestra = segundos - 60*minutos - 1;
    }else{
      segundos-=1;
      setTimeout("updateClock()",1000);
      }
}