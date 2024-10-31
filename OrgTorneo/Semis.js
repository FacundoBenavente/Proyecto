let fase = localStorage.getItem("fase");
postData("obtenerJugs",fase, (jugadores)=>{
    localStorage.setItem("logeadosTorneo",JSON.stringify(jugadores));
    recorrerDiv(jugadores);
})

function recorrerDiv(players){
    let jugsemis = document.getElementsByClassName('jugadores');
    for(jugadorsemi in jugsemis){
        jugsemis[jugadorsemi].textContent = players[jugadorsemi];
    }
}

function Siguiente(){
    let partidoNum = JSON.parse(localStorage.getItem("partidoNum"));
        if(partidoNum == null){
            localStorage.setItem("partidoNum", 1);
        } else {
            partidoNum ++
            localStorage.setItem("partidoNum", JSON.stringify(partidoNum));
        }
        localStorage.setItem("faseTorneo", "Semis");
    window.location = "../Stats.html";
}