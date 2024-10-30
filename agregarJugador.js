    // rediseñar front
    
    
    
    let listaJugs = document.getElementById("listaJugs");
    let listaJugs2 = document.getElementById("listaJugs2");
    let cantidadLogged;
    let logeados = JSON.parse(localStorage.getItem("logeadosTorneo"));
    cantidadLogged = logeados.length;
    let maxLog = JSON.parse(localStorage.getItem("cantidadLog"))
    if(maxLog == cantidadLogged){
        agregaJug.disabled = true;
        agregaJug.style.cursor = "not-allowed";
        siguienteBtn.style.cursor = "pointer";
        siguienteBtn.disabled = false;
    } else {
        agregaJug.disabled = false;
        agregaJug.style.cursor = "pointer";
        siguienteBtn.style.cursor = "not-allowed";
        siguienteBtn.disabled = true;
    }
    function agregarJugador(){
          window.location = "LogTorneo.html"
    }
    function Siguiente(){
        window.location = "orgTorneo.html";
    }

    for(let i = 0; i < cantidadLogged; i++){
    let li = document.createElement("li");
    listaJugs.appendChild(li).setAttribute("id",`Jug${i}`);
    let jugs =  document.getElementById(`Jug${i}`)
    jugs.classList.add("jugs")
    jugs.innerHTML = logeados[i];

    }