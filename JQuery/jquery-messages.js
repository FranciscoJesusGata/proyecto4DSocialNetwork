$.ajax({
    type: "POST",
    url: "../../PHP/Sessions/Session_Exists.php",
    data: {action: "ejecutar"},
    async: true,
    dataType: "html",
    success: function(data){
                if (data == "no"){
                    window.location.replace("../../HTML/html/login.html");
                }
            },
    error: function(){
        console.log("error");
    }
});

function mensajeVisto(){
    var emisor = $("#usuario").attr("data-usuario");
    $.ajax({
        type: "post",
        url: "../../PHP/Querys/Messages.php",
        data: {emisor: emisor, opcion: "visto"},
        dataType: "html",
        error: function (response){
            console.log(response);
        }
    });
}

function mostrarMensajes(mensajes, sesion){
    var html ="";
    var ult_fecha ="";
    console.log(sesion);
    if(mensajes['Id_M'] === undefined){
        for(var i = 0; (mensajes.length-1) >= i ; i++){
            html += "<tr class='row mx-1'> <td class='w-100'> <div><div class='";
            if(mensajes[i]['Emisor'].toLowerCase() != sesion.toLowerCase()){
                html+="messageIzq p-absolute float-left rounded border bg-white border";
            }else if(mensajes[i]['Emisor'].toLowerCase() == sesion.toLowerCase()){
                html+="messageDer p-absolute float-right rounded border bg-white border";
            }
            html+="'><pre style='font-size: 15px;' class='mx-2 my-1'>"+mensajes[i]['Texto']+"</pre></div></td></tr> <tr class='row mx-3'><td class='w-100'><p style='font-size: 10px;' class='p-absolute m-0 ";
            if(mensajes[i]['Emisor'].toLowerCase() != sesion.toLowerCase()){
                html+="float-left";
            }else if(mensajes[i]['Emisor'].toLowerCase() == sesion.toLowerCase()){
                html+="float-right";
            }
            html+="'>"+mensajes[i]['F_Envio']+" ";
            if(mensajes[i]['Emisor'].toLowerCase() == sesion.toLowerCase()){
                if(mensajes[i]['F_Lectura'] != null){
                    html+="Leído";
                }else{
                    html+="No leído";
                }
            }
            html+="</p></div></td></tr>";
            if(i == (mensajes.length - 1)){
                ult_fecha = mensajes[i]['F_Envio'];
                $("#usuario").attr("data-ult_fecha",ult_fecha);
            }
        }
    }else if (mensajes['Id_M'] !== undefined){
        html += "<tr class='row mx-1'> <td class='w-100'> <div><div class='";
        if(mensajes['Emisor'] == sesion.toLowerCase()){
            html+="messageIzq p-absolute float-left rounded border bg-white border";
        }else if(mensajes['Emisor'] != sesion.toLowerCase()){
            html+="messageDer p-absolute float-right rounded border bg-white border";
        }
        html+="'><pre style='font-size: 15px;' class='mx-2 my-1'>"+mensajes['Texto']+"</pre></div></td></tr> <tr class='row mx-3'><td class='w-100'><p style='font-size: 10px;' class='p-absolute m-0 ";
        if(mensajes['Receptor'] == sesion.toLowerCase()){
            html+="float-left";
        }else if(mensajes['Receptor'] != sesion.toLowerCase()){
            html+="float-right";
        }
        html+="'>"+mensajes['F_Envio']+" ";
        if(mensajes['Emisor'] != sesion.toLowerCase()){
            if(mensajes['F_Lectura'] != null){
                html+="Leído";
            }else{
                html+="No leído";
            }
        }
        html+="</p></div></td></tr>";
        ult_fecha = mensajes['F_Envio'];
        $("#usuario").attr("data-ult_fecha",ult_fecha);
    }
    mensajeVisto();
    $("#chat").append(html);
    if(html != ""){
        scrollFinal();
    }
}

function mostrarChats(chats){
    var html ="";
    if(chats[0]['Receptor'] !== undefined && chats[0]['Receptor'] !== null){
        for(var i = 0; (chats.length-2) > i ; i++){
            html+="<tr> <td><div class='w-100 h-100' onclick='cambiar(\""+chats[i]['Receptor']+"\",\""+i+"\")'>";
            html+="<img src='"+chats[i]['Foto']+"' id='foto"+i+"' class='rounded-circle mr-2 my-2 float-left d-block' width='55vh' height='55vh'>";
            html+="<div class='d-inline float-left mb-0 mt-2'>";
            html+="<p class='mb-1' id='nombre"+i+"' style='font-size: 20px;'>"+chats[i]['Receptor']+"</p>";
            html+="<p class='mb-0' style='max-width: 165px;'>"+chats[chats.length-2][i]+"</p></div>";
            if(parseInt(chats[chats.length-1][i]) > 0){
                html+="<div class='m-notification bg-success float-right align-self-center mt-4 d-block text-white justify-content-center'>"+chats[chats.length-1][i]+"</div></div></td></tr>";
            }else{
                html+="<div class='m-notification float-right align-self-center mt-4 d-block'></div></div></td></tr>";
            }
        }
    }else if(chats[0]['Receptor'] === undefined && chats['Receptor'] !== null){
        html+="<tr> <td><div class='w-100'>";
        html+="<img src='"+chats['Foto']+"' class='rounded-circle mr-2 my-2 float-left d-block' width='55vh' height='55vh'>";
        html+="<div class='d-inline float-left mb-0 mt-2'>";
        html+="<p class='mb-1' style='font-size: 20px;'>"+chats['Receptor']+"</p>";
        html+="<p class='mb-0'>"+chats['Texto']+"</p></div>";
        html+="<div class='m-notification bg-success float-right align-self-center mt-4 d-block text-white justify-content-center'>"+chats['mensajes_nuevos']+"</div></div></td></tr>";
    }
    $("#chats").prepend(html);
}

function recogerMensajes(fecha,user){
    if (fecha == ""){
        fecha = null;
    }
    if (user == ""){
        user = null;
    }
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/Messages.php",
        data: {opcion: "recibir", fecha: fecha, receptor: user},
        async: true,
        dataType: "json",
        success: function (data) {
            if(data['data'] !== undefined){
                console.log(data['data']);
                $("#abierto-nombre").text(data['data']['Receptor']);
                $("#abierto-img").attr("src",data['data']['Foto']);
                $("#usuario").attr("data-usuario", data['data']['Receptor']);
            }
            mostrarMensajes(data['mensajes'],data['sesion']);
        },
        error: function (data) {
            if(data['responseText'] != ""){
                console.log(data['responseText']);
            }
        }
    });
}

function recogerChats(){
    var user = $("#usuario").attr("data-usuario");
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/Messages.php",
        data: {opcion: "chats", user: user},
        async: true,
        dataType: "json",
        success: function (data) {
            mostrarChats(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function scrollFinal() {
    var chat = $('#chat-container');
    var height = chat[0].scrollHeight;
    chat.scrollTop(height);
}

function cambiar(usuario,id) {
    $("#usuario").attr("data-usuario", usuario);
    $("#usuario").attr("data-ult_fecha", "");
    $("#chat tr").remove();
    var img = $("#foto"+id).attr("src");
    var nombre = $("#nombre"+id).text();
    $("#abierto-img").attr("src",img);
    $("#abierto-nombre").text(nombre);
    recogerMensajes(null,$("#usuario").attr("data-usuario"));
}

$("#enviarmensaje").submit(false);

$(document).ready(function(){
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    $("#enviarmensaje").attr("disabled", "disabled");

    recogerMensajes(null);
    recogerChats();

    setInterval(function(){
        var ult_fecha = $("#usuario").attr("data-ult_fecha");
        var usuario = $("#usuario").attr("data-usuario");
        recogerMensajes(ult_fecha,usuario);
    },3000);

    $("#mensaje").keyup(function () {
        if(!$.trim($("#mensaje").val())){
            $("#enviarmensaje").attr("disabled",true);
        }else {
            $("#enviarmensaje").attr("disabled", false);
        }
    });

    $("#enviarmensaje").click( function (e) {
        e.preventDefault();
        var user = $("#usuario").attr("data-usuario");
        var mensaje = $("#mensaje").val();
        console.log(user+" "+mensaje);
        if(mensaje.length > 0){
            $.ajax({
                type: "POST",
                url: "../../PHP/Querys/Messages.php",
                data: {opcion: "enviar", user: user, message: mensaje},
                async: true,
                dataType: "html",
                success: function(result){
                    console.log(result);
                    ult_fecha = $("#usuario").attr("data-ult_fecha");
                    var user = $("#usuario").attr("data-usuario");
                    recogerMensajes(ult_fecha,user);
                },
                error: function(data){
                    console.log(data);
                } 
            });
        }
        $("#mensaje").val("");
        $("#enviarmensaje").attr("disabled","disabled");
    });
});