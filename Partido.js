var letra;
var usgol1 = 0;
var usgol2 = 0;
var minutos = 0;
var segundos = 80; //300;
var segundos_muestra = 0;
var ganador;
let usuarios = JSON.parse(localStorage.getItem("logeados"));
Usuario1.innerHTML = usuarios[0];
Usuario2.innerHTML = usuarios[1];
document.addEventListener("keydown", (letra) =>{
   gol(letra.key);
}); 
/*receive("jugador", (data) =>{
  console.log(data);
  if(msjFinal.hidden == true){
  if(data == "jugador1"){
    if(segundos_muestra > 0){
    usgol1 ++;
    Us1.innerHTML = usgol1;
    }
  } else if(data == "jugador2"){
    if(segundos_muestra > 0){
    usgol2 ++;
    Us2.innerHTML = usgol2;
    }
  }else if(data == "comienza"){
    updateClock();
      }
    }
})*/

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
    console.log(minutos + ":" + segundos_muestra);
    if(segundos > 60){
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

      if(usgol1 == usgol2 && localStorage.getItem("modo") == "Torneo"){
        segundos += 3 ; // 60
        console.log("alargue")
        updateClock();
        
        return
      }
      let Countdown = document.getElementById("Countdown");

      if(localStorage.getItem("modo") == "Partido"){
        volverAinicio.hidden = false;
        revancha.hidden = false;
        Countdown.hidden = true;
        Marcador.style.marginBottom = 90 + "px";
      }  else if (localStorage.getItem("modo") == "Torneo"){
        continueBtn.hidden = false;
        Countdown.hidden = true;
        Marcador.style.marginBottom = 90 + "px";
      }
      msjFinal.hidden = false;
      let  resultado = {}
      if (localStorage.getItem("modo") == "Partido"){
        resultado = {
        "users":  usuarios,
        "goles": [usgol1,usgol2]
      }
    } else if (localStorage.getItem("modo") == "Torneo"){
          resultado = {
          "users":  usuarios,
          "goles": [usgol1,usgol2],
          "numPartido": JSON.parse(localStorage.getItem("partidoNum"))
        }
      }
    
      postData("setResultado", {resultado})

      if(usgol1 > usgol2){
        ganador =  usuarios[0];
          msjWin.innerHTML = "Ganó " + ganador;
        msjWin.hidden = false;
      } else if(usgol2 > usgol1){
          ganador = usuarios[1];
          msjWin.innerHTML = "Ganó "+ ganador;
          msjWin.hidden = false;
      } else if(usgol1 == usgol2){
          msjWin.innerHTML = "Empate";
          msjWin.hidden = false;
      }
    }else{
      segundos-=1;
      setTimeout("updateClock()",1000);
      }
}
function continuar(){
  let LogTorneo = JSON.parse(localStorage.getItem("logeadosTorneo"));
 let partidoNum = localStorage.getItem("partidoNum");
 if(LogTorneo.length/2 > partidoNum){
 partidoNum ++;
 localStorage.setItem("partidoNum", partidoNum);
 window.location = "Stats.html";
 } else {
  let fases = ["Octavos", "Cuartos", "Semis", "Final"];
  let faseActual = localStorage.getItem("faseTorneo");
  if(faseActual == "Final"){
    localStorage.removeItem("partidoNum");
    let fase = localStorage.getItem("fase");
    fase ++;
    localStorage.setItem("fase", fase);
    window.location = "./OrgTorneo/Ganador.html";
  }else {
  for(let i = 0; i < fases.length; i++){
    if(fases[i] == faseActual){
       localStorage.removeItem("partidoNum");
         let fase = localStorage.getItem("fase");
        fase ++;
        localStorage.setItem("fase", fase);
         window.location = `./OrgTorneo/${fases[i + 1]}.html`
      }
    }
  }

 }

    
}


function volverAlinicio(){
  localStorage.clear();
  window.location = "index.html"
}

function doRevancha(){
  location.reload()
}