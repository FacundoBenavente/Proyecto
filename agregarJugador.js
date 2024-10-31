    let listaJugs = document.getElementById("listaJugs");
    let listaJugs2 = document.getElementById("listaJugs2");
    let cantidadLogged;
    let siguienteBtn = document.getElementById("siguienteBtn")
    let logeados = JSON.parse(localStorage.getItem("logeadosTorneo"));
    cantidadLogged = logeados.length;
    let maxLog = JSON.parse(localStorage.getItem("cantidadLog"))
    let maxJugs = document.getElementById("maxJugs")
    if(maxLog == cantidadLogged){
        agregaJug.disabled = true;
        agregaJug.style.cursor = "not-allowed";
        siguienteBtn.style.cursor = "pointer";
        siguienteBtn.disabled = false;
        maxJugs.hidden = false;
    } else {
        agregaJug.disabled = false;
        agregaJug.style.cursor = "pointer";
        siguienteBtn.style.cursor = "not-allowed";
        siguienteBtn.disabled = true;
        maxJugs.hidden = true;
    }
    function agregarJugador(){
          window.location = "LogTorneo.html"
    }
    function Siguiente(){
        localStorage.setItem("fase", 0);
        postData("orgCruces", logeados)
        if(maxLog == 16){
            window.location = "./OrgTorneo/Octavos.html";
        }
        if(maxLog == 8){
            window.location = "./OrgTorneo/Cuartos.html";
        }
        if(maxLog == 4){
            window.location = "./OrgTorneo/Semis.html";
        } 
        if(maxLog == 2){
            window.location = "./OrgTorneo/Final.html";
        }
    }

    for(let i = 0; i < cantidadLogged; i++){

        let li = document.createElement("li");

        if (i < 8){
        listaJugs.appendChild(li).setAttribute("id",`Jug${i}`);
        let jugs =  document.getElementById(`Jug${i}`)
        jugs.classList.add("jugs")
        jugs.innerHTML = logeados[i];
        } else {
        listaJugs2.appendChild(li).setAttribute("id",`Jug${i}`);
        let jugs =  document.getElementById(`Jug${i}`)
        jugs.classList.add("jugs")
        jugs.innerHTML = logeados[i];

        }
    }
