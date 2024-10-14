var boton1 = false;
var boton2 = false;

const logeados = localStorage.getItem('logeados');
const UsrLog = JSON.parse(logeados);
window.username1.innerHTML = "@" + UsrLog[0];
window.username2.innerHTML = "@" + UsrLog[1];
postData("buscaStats", {UsrLog}, (data) =>{
    //usuario 1
    window.partidosCant1.innerHTML = data[0].partidos
    window.ganadosCant1.innerHTML = data[0].wins
    window.perdidosCant1.innerHTML = data[0].looses
    window.mayorWin1.innerHTML = data[0].mayorVictoria
    // usuario 2
    window.partidosCant2.innerHTML = data[1].partidos
    window.ganadosCant2.innerHTML = data[1].wins
    window.perdidosCant2.innerHTML = data[1].looses
    window.mayorWin2.innerHTML = data[1].mayorVictoria
})

function Button1(){
if(boton1 === false){
boton1 = true;
document.getElementById("buton1").style.backgroundColor = "#cfcaca";
}else if(boton1 === true){
boton1 = false;
document.getElementById("buton1").style.backgroundColor = 'white';
}

checkButtons();
}
function Button2(){
 if(boton2 === false){
boton2 = true;
document.getElementById("buton2").style.backgroundColor = "#cfcaca";
} else if(boton2 = true){
boton2 = false;
document.getElementById("buton2").style.backgroundColor = 'white';
}
checkButtons();
}
function checkButtons() {
if(boton1 === true && boton2 === true){
    window.location = "Partido.html";
        }
}

