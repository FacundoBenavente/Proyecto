import { onEvent, sendEvent, startServer } from "soquetic";
import fs, { writeFileSync } from "fs"
import { on } from "events";
import { stringify } from "querystring";
 import { SerialPort } from "serialport";
 import { ReadlineParser } from '@serialport/parser-readline';


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
            console.log(jsonStat);
            fs.writeFileSync("Stats.json", graba);
            }

            // partido + hard
            
            const port = new SerialPort({
                //Completar con el puerto correcto
                path: "COM5",
                baudRate: 9600,
              });
              const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))

              parser.on("data", function (data) {
                console.log(data)
                sendEvent("jugador", data);
              });
                

              // Torneo

              onEvent("orgTorneo", (jugadores) =>{guardaEnfrenta(jugadores)})

              function guardaEnfrenta(jugadores){
                  console.log(jugadores);
                  if(jugadores.length == 8){
                    let partido1 = []; 
                    partido1[0] = jugadores[0];
                    partido1[1] = jugadores[1];
                    let partido2 = [];
                    partido2[0] = jugadores[2];
                    partido2[1] =  jugadores[3];
                    let partido3 = []; 
                    partido3[0] = jugadores[4];
                    partido3[1] = jugadores[5];
                    let partido4 = [];
                    partido4[0] = jugadores[6];
                    partido4[1] =  jugadores[7]; 
                    let enfrentaCuartos = [];
                    for(i = 0; i < 4; i++){
                        enfrentaCuartos[i] = `partido${i+1}`
                    }
                  }
                   else if(jugadores.length == 4){
                        let partido1 = []; 
                        partido1[0] = jugadores[0];
                        partido1[1] = jugadores[1];
                        let partido2 = [];
                        partido2[0] = jugadores[2];
                        partido2[1] =  jugadores[3];
                        let enfrentaSemi = [];
                      /*  enfrentaSemi[0] = partido1;
                        enfrentaSemi[1] = partido2;*/
                        for(i = 0; i < 2; i++){
                            enfrentaSemi[i] = `partido${i+1}`
                        }
                        console.log(enfrentaSemi);
                  }
              }
    startServer();