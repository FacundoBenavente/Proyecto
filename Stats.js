var boton1 = false;
var boton2 = false;

function Button1(){
if(boton1 === false){
boton1 = true;
}else if(boton1 = true){
boton1 = false;
}
checkButtons();
}
function Button2(){
 if(boton2 === false){
boton2 = true;
} else if(boton2 = true){
boton2 = false;
}
checkButtons();
}
function checkButtons() {
if(boton1 === true && boton2 === true){
    window.location = "Partido.html";
        }
}