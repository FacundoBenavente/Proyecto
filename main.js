    function goAbout(){
    window.location = "About.html";
    }
    function goRules(){
      window.location = "Rules.html";
    }
    function goLogin(){
      window.location = "Login.html";
      localStorage.setItem("modo", "Partido");
    }
    function goTorneo(){
      window.location = "cantJugadores.html";
      localStorage.setItem("modo", "Torneo");
    }