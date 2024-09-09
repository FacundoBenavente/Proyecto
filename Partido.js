var letra;
var usgol1 = 0;
var usgol2 = 0;
var minutos = 0;
var segundos = 3;//300;
var segundos_muestra = 0;
var ganador;
document.addEventListener("keydown", (letra) =>{
   gol(letra.key);
});

function gol(mensaje){
    if(msjFinal.hidden == true){
    if(mensaje == "f"){
        if(segundos_muestra > 0){
        usgol1 ++;
        Us1.innerHTML = usgol1;
        }
    } else if(mensaje == "j"){
        if(segundos_muestra > 0){
        usgol2 ++;
        Us2.innerHTML = usgol2;
        }
    } else if(mensaje == "r"){
        updateClock();
          }
    }
}


  function updateClock() {
    minutos = Math.floor(segundos/60);
    if(minutos > 1){
        segundos_muestra = segundos -60*minutos;
    } else if(minutos <= 0){
        segundos_muestra = segundos;
    } 
    if(segundos_muestra > 10){
    count.innerHTML = minutos + ":" + segundos_muestra;
    } else if(segundos_muestra < 10){
    count.innerHTML = minutos + ":" + "0" + segundos_muestra;
    }
    if(segundos==0 && minutos == 0){

      msjFinal.hidden = false;
      if(usgol1 > usgol2){
          msjWin.innerHTML = "Ganó el usuario 1";
          msjWin.hidden = false;
            ganador = "usuario 1";
      } else if(usgol2 > usgol1){
          msjWin.innerHTML = "Ganó el usuario 2";
          msjWin.hidden = false;
            ganador = "usuario 2";
      } else if(usgol1 == usgol2){
          msjWin.innerHTML = "Empate";
          msjWin.hidden = false;
      }
    }else{
      segundos-=1;
      setTimeout("updateClock()",1000);
      }
}