let cantLogeados = JSON.parse(localStorage.getItem("cantidadLog"));
let logeadosTorneo = JSON.parse(localStorage.getItem("logeadosTorneo"));
function numRandom(){
    let num = Math.floor(Math.random()*(cantLogeados  - 0) + 0);
    if(num == cantLogeados){
        numRandom()
    }
    return num;
}
 function orgCruces(cantLogeados, logeadosTorneo){
    let newOrg = [];

    for(let i = 0; i < cantLogeados; i ++){
        rndmNum = numRandom();
          if(newOrg[rndmNum] == undefined) {
            newOrg[rndmNum] = logeadosTorneo[i];
        }else if(newOrg[rndmNum] != undefined){
            i = i -1;
        } 
        if(i == cantLogeados){
            for( let j = 0; j < cantLogeados; j++){
                if(newOrg[j] == undefined){
                    logeadosTorneo[i] = newOrg[j];
                }
            }
        }
    } 
    return newOrg;
}

let players =[]
if(cantLogeados == 8){
    document.getElementById("octavosFinal").hidden = true;
} else if(cantLogeados == 4){
    document.getElementById("octavosFinal").hidden = true;
    document.getElementById("cuartosFinal").hidden = true;
    
    fetchData("sorteado", (sorteados) =>{             
        if  ( !sorteados ){        
            players = orgCruces(cantLogeados, logeadosTorneo);
            localStorage.setItem("logeadosTorneo", JSON.stringify(players));
            let torneo = {
                "jugadores": players,
                "fase": "semi"
            }
            postData("orgTorneo", torneo);
        } else {
            players = JSON.parse(localStorage.getItem("logeadosTorneo")); 
        }        
        recorrerDiv(players);
     })

    
    

    } else  if(cantLogeados == 2){
    document.getElementById("octavosFinal").hidden = true;
    document.getElementById("cuartosFinal").hidden = true;
    document.getElementById("semiFinal").hidden = true;
    
}
     

function recorrerDiv(players){
    let jugsemis = document.getElementsByClassName('jugSemis');
    for(jugadorsemi in jugsemis){
        jugsemis[jugadorsemi].textContent = players[jugadorsemi];
        console.log(jugadorsemi)
    }
}
function toStats(){
    let partidoNum = JSON.parse(localStorage.getItem("partidoNum"));
        if(partidoNum == null){
            localStorage.setItem("partidoNum", 1);
        } else {
            partidoNum ++
            localStorage.setItem("partidoNum", JSON.stringify(partidoNum));
        }
    window.location = "Stats.html";
}