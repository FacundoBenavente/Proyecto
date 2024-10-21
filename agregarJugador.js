    let cajaJugs = document.getElementById("cajaJugs");
    let cantidadLogged;
    let logeados = JSON.parse(localStorage.getItem("logeadosTorneo"));
    cantidadLogged = logeados.length;
    let maxLog = JSON.parse(localStorage.getItem("cantidadLog"))
    if(maxLog == cantidadLogged){
        console.log("hola");
        agregaJug.innerHTML = "SIGUIENTE";
    }
    function agregarJugador(){
        if(cantidadLogged < maxLog){
          window.location = "LogTorneo.html"
        } else if(cantidadLogged == maxLog) {
            window.location = "orgTorneo.html"
        }
    }
    for(let i = 0; i < cantidadLogged; i++){
    let div = document.createElement("div");
    cajaJugs.appendChild(div).setAttribute("id",`Jug${i}`);
    let jugs =  document.getElementById(`Jug${i}`)
    jugs.classList.add("jugs")
    jugs.innerHTML = logeados[i];
    }