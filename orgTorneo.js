let cantLogeados = JSON.parse(localStorage.getItem("cantidadLog"));
let logeadosTorneo = JSON.parse(localStorage.getItem("logeadosTorneo"));



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