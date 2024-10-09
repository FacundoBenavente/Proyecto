import { onEvent, sendEvent, startServer } from "soquetic";
import fs, { writeFileSync } from "fs"
import { on } from "events";

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
        if (usr.email == usuario.user.email){
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



//partido
let usExiste = false;
        onEvent("ganadorPartido",(ganador) =>{return checkUsStats(ganador)});
        function checkUsStats(ganador){
            const jsonData = fs.readFileSync("Stats.json");
            const jsonUsers = JSON.parse(jsonData);     
            if(jsonUsers.usuarios.length > 0){   
        for(let i = 0; i < jsonUsers.usuarios.length; i++){
            const usr = JSON.parse(jsonUsers.usuarios[i]);
            if (ganador == usr.user){
                usExiste = true;
            } else{
                usExiste = false;
        }
    } 
    }else{
        usExiste = false;
    }
        return usExiste;   
        }
    
        onEvent("crearStatsWin",(usuarioSts) =>{crearStats(usuarioSts)})
        function crearStats(usuarioSts){

            const jsonData = fs.readFileSync("Stats.json")
            const jsonUsers = JSON.parse(jsonData);        
            const jsonUser = JSON.stringify(usuarioSts);

            jsonUsers.usuarios.push(jsonUser);
            const data = JSON.stringify(jsonUsers);
            fs.writeFileSync("Stats.json", data);
        }
        onEvent("buscaStatsWin",(Usersuma)=>{return buscaStatWin(Usersuma)})
        function buscaStatWin(Usersuma){
            const jsonData = fs.readFileSync("Stats.json" )
            const jsonUsers = JSON.parse(jsonData);       
            console.log(UserSuma);
        for(let i = 0; i < jsonUsers.usuarios.length; i++){
            const usr = JSON.parse(jsonUsers.usuarios[i]);
            let newStat = usr;
            console.log(newStat);
            if (Usersuma.user == usr.user){
                newStat.goles = usr.goles + Usersuma.goles;
                newStat.partidos = usr.partidos + Usersuma.partidos;
                newStat.wins = usr.wins + Usersuma.wins;
                if(newStat.diferenciaGol < Usersuma.diferenciaGol){
                    newStat.diferenciaGol = Usersuma.diferenciaGol;
                }
                console.log(newStat);
                const jsonUser = JSON.stringify(newStat);
                 jsonUsers.usuarios[i] = jsonUser;
                console.log(jsonUsers)
            }   
        }
        const data = JSON.stringify(jsonUsers);
        writeFileSync("Stats.json",data);
    }
    startServer();