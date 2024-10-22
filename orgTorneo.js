let cantLogeados = JSON.parse(localStorage.getItem("cantidadLog"));
if(cantLogeados < 16){
    document.getElementById("octavosFinal").hidden = true;
} 
 if(cantLogeados < 8){
    document.getElementById("cuartosFinal").hidden = true;
} 
 if(cantLogeados < 4){
    document.getElementById("semiFinal").hidden = true;
}
