import { onEvent, sendEvent, startServer } from "soquetic";
import fs, { readFileSync, writeFileSync } from "fs"
import { on } from "events";
import { stringify } from "querystring";
 //import { SerialPort } from "serialport";
// import { ReadlineParser } from '@serialport/parser-readline';


onEvent("registro", (usuario)=>{ return crearCuenta(usuario)})

onEvent("login", (data)=>{
    const jsonData = fs.readFileSync("Usuarios.json" );        
        const jsonUsers = JSON.parse(jsonData);        
        for(let i = 0; i < jsonUsers.usuarios.length; i++){
            const usr = JSON.parse(jsonUsers.usuarios[i]);
            if (usr.email == data.user.email){
                if(usr.password == data.user.password){
                    return true;
                } else {                    
                    return false;                    
                }                
            }
        }
        return false;   
})

function crearCuenta(usuario){
    const jsonData = fs.readFileSync("Usuarios.json" )
    const jsonUsers = JSON.parse(jsonData);        
    const jsonUser = JSON.stringify(usuario.user);

    for(let i = 0; i < jsonUsers.usuarios.length; i++){
        const usr = JSON.parse(jsonUsers.usuarios[i]);
        if (usr.email == usuario.user.email || usr.username == usuario.user.username){
            return false
        }
    }
    jsonUsers.usuarios.push(jsonUser);
    const data = JSON.stringify(jsonUsers);

    fs.writeFileSync("Usuarios.json", data);
    return true;   
}
    // stats
    onEvent("loged",(logeados) =>{return buscaUsuario(logeados)})


    function buscaUsuario(logeados){
        let usuariosName = [];
        const jsonData = fs.readFileSync("Usuarios.json" )
        const jsonUsers = JSON.parse(jsonData);        

    for(let i = 0; i < jsonUsers.usuarios.length; i++){
        const usr = JSON.parse(jsonUsers.usuarios[i]);
        if (logeados[0] == usr.email){
            usuariosName[0] = usr.username;
        } else if(logeados[1] == usr.email)
        usuariosName[1] = usr.username;
    }
    return usuariosName;   
}

            onEvent("buscaStats",(data) => {return buscaStats(data)})

            function buscaStats(data){
                const jsonData = fs.readFileSync("Stats.json")
                const jsonStat = JSON.parse(jsonData);    

                let usrPos1 = getUsuario(data.UsrLog[0]);
                let usrPos2 = getUsuario(data.UsrLog[1]);
                let usrPos = [usrPos1, usrPos2];
                let usuarioStats =[];
                for(let i = 0; i<usrPos.length; i++){
                    if (usrPos[i] >= 0){
                    usuarioStats[i] = JSON.parse(jsonStat.usuarios[usrPos[i]]); 
                } else {
                    let noStatUsr = {
                       "user": data.UsrLog[i],
                       "goles": 0,
                       "wins": 0,
                       "looses": 0,
                       "mayorVictoria": "0-0",
                       "partidos": 0
                    }
                    usuarioStats[i] = noStatUsr;
                }
            }
            return usuarioStats;
        }

//partido


                function getUsuario(username){
                    let jsonData = JSON.parse(fs.readFileSync("Stats.json"));
                    if(jsonData.usuarios.length > 0){   
                    for(let i = 0; i < jsonData.usuarios.length; i++){
                        const usr = JSON.parse(jsonData.usuarios[i]);
                        if (usr.user==username)            
                            return i             
                    }
                    return -1
                    }
                }
                
            onEvent("setResultado", (resultado)=>{setResultado(resultado)})
            
            function setResultado(data){

                const jsonData = fs.readFileSync("Stats.json")
                const jsonStat = JSON.parse(jsonData);    

                let posUsr1 = getUsuario(data.resultado.users[0]) 
                let posUsr2 = getUsuario(data.resultado.users[1]) 
                let posUsr = [posUsr1, posUsr2];
                let ganador = "";
                for(let i = 0; i < posUsr.length; i++){
                    let contrario = 0;
                    if(i == 0){
                        contrario = 1
                    }
                if (posUsr[i] >= 0){
                    let usu = JSON.parse(jsonStat.usuarios[posUsr[i]])  
                    usu.goles =  usu.goles + data.resultado.goles[i]
                    usu.partidos ++;

                    if(data.resultado.goles[i] > data.resultado.goles[contrario]){
                        usu.wins ++;
                        // para el torneo
                        if(data.resultado.numPartido >= 1){
                          ganador = data.resultado.users[i];
                        } 
                        if(usu.diferenciaGol < data.resultado.goles[i] - data.resultado.goles[contrario]){
                            usu.diferenciaGol = data.resultado.goles[i] - data.resultado.goles[contrario];
                            usu.mayorVictoria = data.resultado.goles[i] + "-" + data.resultado.goles[contrario];
                        }
                    } else if(data.resultado.goles[i] < data.resultado.goles[contrario]){
                        usu.looses ++;
                    }
                    jsonStat.usuarios[posUsr[i]] = JSON.stringify(usu);
                } else {
                    let gana = 0;
                    let pierde = 0;
                    let bestWin;
                    let difGol = 0; 
                     if(data.resultado.goles[i] > data.resultado.goles[contrario]){
                        gana = 1;
                        difGol = data.resultado.goles[i] - data.resultado.goles[contrario];
                        bestWin = data.resultado.goles[i] +"-" +data.resultado.goles[contrario];
                        pierde = 0;

                        //para el torneo
                        if(data.resultado.numPartido >= 1){
                            console.log("Entra");
                          ganador = data.resultado.users[i];
                        } 

                    } else if(data.resultado.goles[i] < data.resultado.goles[contrario]){
                        gana = 0;
                        difGol = 0;
                        bestWin = "0-0";
                        pierde = 1;

                    }
                    let usuario = {
                        user: data.resultado.users[i],
                        goles: data.resultado.goles[i],
                        wins: gana,
                        looses: pierde,
                        mayorVictoria: bestWin, 
                        partidos: 1,
                        diferenciaGol: difGol
                    }
  

                    let ustat = JSON.stringify(usuario);
                    jsonStat.usuarios.push(ustat);

                }

            }

            const graba = JSON.stringify(jsonStat);
            fs.writeFileSync("Stats.json", graba);
            //para el torneo
            if(data.resultado.numPartido  == 1){
            let JSONtornament  = JSON.parse(fs.readFileSync("Torneos.json"));
            let sigFase = [];            
                 sigFase[0] = ganador;
        JSONtornament.push(sigFase);
        fs.writeFileSync("Torneos.json", JSON.stringify(JSONtornament));
    } else if (data.resultado.numPartido > 1){
        let JSONtornament  = JSON.parse(fs.readFileSync("Torneos.json"));
        JSONtornament[JSONtornament.length -1].push(ganador);
        fs.writeFileSync("Torneos.json", JSON.stringify(JSONtornament));
    }
}

                    // partido + hard
            
        /*    const port = new SerialPort({
                //Completar con el puerto correcto
                path: "COM5",
                baudRate: 9600,
              });
              const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

              parser.on("data", function (data) {
                console.log(data)
                sendEvent("jugador", data);
              });
                */

              // Torneo


              function guardaEnfrenta(torneo){
                let jsonTorneo = [];
                jsonTorneo.push(torneo);
                fs.writeFileSync("Torneos.json", JSON.stringify(jsonTorneo));
            }

            onEvent("sorteado", ()=>{
                let sorteado = false
                const check = fs.readFileSync("Torneos.json");
                try {
                    JSON.parse(check) 
                    sorteado = true;
                    return sorteado; 
                } catch (error) {
                    sorteado = false
                    return sorteado;
                }
               
                
            })

            function numRandom(cantLogeados){
                let num = Math.floor(Math.random()*(cantLogeados  - 0) + 0);
                if(num == cantLogeados){
                    numRandom(cantLogeados)
                }
                return num;
            }
            onEvent("orgCruces", (logeadosTorneo) => {orgCruces(logeadosTorneo)})
            function orgCruces(logeadosTorneo){
                let newOrg = [];
                let cantLogeados = logeadosTorneo.length;
                for(let i = 0; i < cantLogeados; i ++){
                    let rndmNum = numRandom(cantLogeados);
                      if(newOrg[rndmNum] == undefined) {
                        newOrg[rndmNum] = logeadosTorneo[i];
                    }else if(newOrg[rndmNum] != undefined){
                        i = i -1;
                    } 
                    if(i == cantLogeados){
                        for( let j = 0; j < cantLogeados; j++){
                            if(newOrg[j] == undefined){
                                logeadosTorneo[i] = newOrg[j];
                            }
                        }
                    }
                } 
                guardaEnfrenta(newOrg)
            }
            onEvent("obtenerJugs",(fase) =>{
                let jugadores = JSON.parse(fs.readFileSync("Torneos.json"));
                return jugadores[fase];
            })
    startServer();