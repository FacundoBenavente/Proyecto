let cantidadAlogear = 0;

function goLogTorneo1(){
    cantidadAlogear = 2;
    window.localStorage.setItem("cantidadLog",JSON.stringify(cantidadAlogear));
    window.location = "LogTorneo.html";
  }

  function goLogTorneo2(){
    cantidadAlogear = 4;
    window.localStorage.setItem("cantidadLog",JSON.stringify(cantidadAlogear));
    window.location = "LogTorneo.html";
  }

  function goLogTorneo3(){
    cantidadAlogear = 8;
    window.localStorage.setItem("cantidadLog",JSON.stringify(cantidadAlogear));
    window.location = "LogTorneo.html";
  }

  function goLogTorneo4(){
    cantidadAlogear = 16;
    window.localStorage.setItem("cantidadLog",JSON.stringify(cantidadAlogear));
    window.location = "LogTorneo.html";
  }