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
      let usuarios = JSON.parse(localStorage.getItem("logeados"));
      msjFinal.hidden = false;
      if(usgol1 > usgol2){
        ganador = usuarios[0];
          msjWin.innerHTML = "Ganó " + ganador;
          msjWin.hidden = false;
          let resultado = usgol1 + "-" + usgol2;
          postData("ganadorPartido", {ganador}, (usuarioExiste)=>{
          if(!usuarioExiste){
            let usuario = {
              "user": ganador,
              "goles": usgol1,
              "wins": 1,
              "looses": 0,
              "mayorVictoria": resultado,
              "partidos": 1,
              "diferenciaGol": usgol1-usgol2
          }
          postData("crearStatsWin",{usuario});
        } else{
          let usuario = {
            "user": ganador,
            "goles": usgol1,
            "wins": 1,
            "looses": 0,
            "mayorVictoria": resultado,
            "partidos": 1,
            "diferenciaGol": usgol1-usgol2
        }
          postData("buscaStatsWin",{usuario});
        }
      }
          );

        //almacenar goles, victorias++, partiduosJug++ y comprobar mayor victoria
      } else if(usgol2 > usgol1){
          ganador = usuarios[1];
          msjWin.innerHTML = "Ganó "+ ganador;
          msjWin.hidden = false;
          //almacenar goles, derrotas++ y partiduosJug++
      } else if(usgol1 == usgol2){
          msjWin.innerHTML = "Empate";
          msjWin.hidden = false;
      }
    }else{
      segundos-=1;
      setTimeout("updateClock()",1000);
      }
}