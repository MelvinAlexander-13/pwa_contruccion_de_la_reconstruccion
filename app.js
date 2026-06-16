// ==============================
// ELEMENTOS HTML
// ==============================

const estado = document.getElementById("estado");
const conexion = document.getElementById("conexion");
const ip = document.getElementById("ip");
const latencia = document.getElementById("latencia");
const hora = document.getElementById("hora");



// ==============================
// ESTADO INTERNET
// ==============================


function actualizarEstado(){


    if(navigator.onLine){


        estado.textContent =
        "🟢 Conectado a Internet";


        estado.className =
        "online";


    }else{


        estado.textContent =
        "🔴 Sin conexión";


        estado.className =
        "offline";


    }


}



window.addEventListener(
    "online",
    actualizarEstado
);


window.addEventListener(
    "offline",
    actualizarEstado
);



actualizarEstado();





// ==============================
// TIPO DE CONEXIÓN
// ==============================


function mostrarConexion(){


    const red =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;



    if(red){


        conexion.textContent =
        "📶 Tipo de conexión: "
        + red.effectiveType;


    }else{


        conexion.textContent =
        "📶 Tipo de conexión: No disponible";


    }


}



mostrarConexion();






// ==============================
// OBTENER IP PUBLICA
// ==============================


async function obtenerIP(){


    try{


        const respuesta =
        await fetch(
            "https://api.ipify.org?format=json"
        );


        const datos =
        await respuesta.json();



        ip.textContent =
        "🌍 IP Pública: "
        + datos.ip;



    }catch(error){


        ip.textContent =
        "🌍 IP Pública: No disponible";


        console.error(error);


    }


}



obtenerIP();







// ==============================
// PRUEBA DE LATENCIA
// ==============================


async function probarRed(){


    const inicio =
    performance.now();



    try{


        await fetch(
            "https://api.ipify.org?format=json",
            {
                cache:"no-store"
            }
        );



        const fin =
        performance.now();



        latencia.textContent =
        "⚡ Latencia: "
        + Math.round(fin - inicio)
        + " ms";



        hora.textContent =
        "🕒 Última prueba: "
        + new Date()
        .toLocaleString();



    }catch(error){


        latencia.textContent =
        "⚡ Error de conexión";


    }


}









// ==============================
// SERVICE WORKER PWA
// ==============================


if("serviceWorker" in navigator){


    window.addEventListener(
        "load",
        ()=>{


            navigator.serviceWorker.register(
                "service-worker.js"
            )


            .then(registro=>{


                console.log(
                    "Service Worker activo:",
                    registro.scope
                );


            })


            .catch(error=>{


                console.error(
                    "Error Service Worker:",
                    error
                );


            });



        }
    );


}









// ==============================
// INSTALACION PWA
// ==============================


let deferredPrompt;



const installBtn =
document.getElementById(
    "installBtn"
);





window.addEventListener(
"beforeinstallprompt",
(e)=>{


    e.preventDefault();


    deferredPrompt = e;


    if(installBtn){


        installBtn.hidden = false;


    }


});






if(installBtn){


installBtn.addEventListener(
"click",
async()=>{


    if(!deferredPrompt){

        return;

    }



    deferredPrompt.prompt();



    const resultado =
    await deferredPrompt.userChoice;



    console.log(
        "Instalación:",
        resultado.outcome
    );



    deferredPrompt = null;


    installBtn.hidden = true;


});


}






window.addEventListener(
"appinstalled",
()=>{


    console.log(
        "Aplicación instalada"
    );



    if(installBtn){

        installBtn.hidden = true;

    }


});









// ==============================
// SOPORTE IPHONE
// ==============================


function esIOS(){


    return /iphone|ipad|ipod/i
    .test(
        navigator.userAgent
    );


}




const iosMessage =
document.getElementById(
    "iosMessage"
);





if(esIOS() && iosMessage){


    iosMessage.hidden = false;


}