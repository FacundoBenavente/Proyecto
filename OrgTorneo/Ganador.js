function Siguiente(){
    localStorage.clear();
    window.location = "../index.html"
}
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