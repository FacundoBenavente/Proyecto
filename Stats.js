var boton1 = false;
var boton2 = false;

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

fetchData("username", )