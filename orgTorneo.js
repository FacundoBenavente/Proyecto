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


if(cantLogeados == 8){
    document.getElementById("octavosFinal").hidden = true;
} else if(cantLogeados == 4){
    document.getElementById("octavosFinal").hidden = true;
    document.getElementById("cuartosFinal").hidden = true;
    let jugs = orgCruces(cantLogeados, logeadosTorneo);
    recorrerDiv(jugs);
    postData("orgTorneo", {jugs});
    } else  if(cantLogeados == 2){
    document.getElementById("octavosFinal").hidden = true;
    document.getElementById("cuartosFinal").hidden = true;
    document.getElementById("semiFinal").hidden = true;
    
}

function recorrerDiv(jugs){
    let jugsemis = document.getElementsByClassName('jugSemis');
    for(jugadorsemi in jugsemis){
        jugsemis[jugadorsemi].textContent = jugs[jugadorsemi];
        console.log(jugadorsemi)
    }
}
