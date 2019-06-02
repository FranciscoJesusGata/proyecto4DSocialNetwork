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

function tratarDatosUser(datos){
    var Alias = datos["Alias"];
    var Nombre = datos["Nombre_Usuario"];
    var Fotosrc = datos["Foto"];
    var Followers = datos["Seguidores"];
    var Following = datos["Seguidos"];
    var Tema = datos["Tema"];

    if(Tema == "" || Tema == null){
      $("body").addClass('no-image-background');
    } else {
      $("#seccion-background").hide();
      $("body").addClass('image-background');
      $("body").css("background-image", "url("+ Tema +")");
    }
    if(Fotosrc == "" || Fotosrc == null){
      $("#fotoPerfil").attr("src","../img/user.jpg");
    } else {
      $("#fotoPerfil").attr("src",Fotosrc);
    }
    $("#alias").text(Alias);
    $("#nomUser").text(Nombre);
    $("#followers").text(Followers);
    $("#following").text(Following);
}

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

function cambiosChats(datos){
    var historial = $("#chats").children().length;
    var usuarios = datos.splice(datos-3,2);
    var mensajes = datos.splice(0,usuarios.length);
    var ult_mensajes = mensajes[0];
    var notificationes = mensajes[1];
    for(var i = 0; i < usuarios.length; i++){
        for(var j = 0; i < historial.length; j++){
            if((usuarios[i]['Receptor'].toLowerCase == $("#nombre"+j).text().toLowerCase) && (notificationes[i] > 0)){
                $("#mensajes_nuevos"+j).text(mensajes[i]);
                $("#mensajes_nuevos"+j).attr("class","m-notification bg-success float-right align-self-center mt-4 d-block text-white justify-content-center");
            }else if(usuarios[i]['Receptor'].toLowerCase != $("#nombre"+j).text().toLowerCase){
                var html ="<tr> <td><div class='w-100 h-100' onclick='cambiar(\""+usuarios[i]['Receptor']+"\",\""+(historial+1)+"\")'>";
                html+="<img src='"+usuarios[i]['Foto']+"' id='foto"+i+"' class='rounded-circle mr-2 my-2 float-left d-block' width='55vh' height='55vh'>";
                html+="<div class='d-inline float-left mb-0 mt-2'>";
                html+="<p class='mb-1' id='nombre"+(historial+1)+"' style='font-size: 20px;'>"+usuarios[i]['Receptor']+"</p>";
                html+="<p class='mb-0' style='max-width: 165px; text-truncate'>"+ult_mensajes[i]+"</p></div>";
                if(parseInt(chats[chats.length-1]) > 0){
                    html+="<div class='m-notification bg-success float-right align-self-center mt-4 d-block text-white justify-content-center'>"+notificationes[0]+"</div></div></td></tr>";
                }else{
                    html+="<div class='m-notification float-right align-self-center mt-4 d-block'></div></div></td></tr>";
                }
            }
        }
    }
}


function emptyChatHistory(num){
    if($("#chats tbody").children().length == 0 && num == 0){
        $("#chat_content").children().css("display", "none");
        var html="<div id='chat-vacio' class='col-12 w-100 align-self-center' style='position: absolute;'><p class='h2 text-center text-muted w-100'>No tienes ninguna conversación</p><br><p class='text-center text-muted mt-0 w-100'>¡Empieza a hablar con otros usuarios!</p></div>"
        $("#chat_content").append(html);
        var html2="<div id='historial-vacio'class='w-100 align-self-center' style='position: absolute;'><p class='text-center text-muted w-100'>No has iniciado ninguna conversación</p></div>"
        $("#chats-wrap").append(html2);
    }
}

function mostrarMensajes(mensajes, sesion){
    if($("#chat-content").children().css('display') == "none"){
        $("#chat-vacio").remove();
        $("#historial-vacio").remove();
        $("#chat_content").children().css("display", "");
    }
    var html ="";
    var ult_fecha ="";
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
    emptyChatHistory(mensajes.length);
}

function mostrarChats(chats){
    var html ="";
    if(chats[0]['Receptor'] !== undefined && chats[0]['Receptor'] !== null){
        for(var i = 0; (chats.length-2) > i ; i++){
            html+="<tr> <td><div class='w-100 h-100' onclick='cambiar(\""+chats[i]['Receptor']+"\",\""+i+"\")'>";
            html+="<img src='"+chats[i]['Foto']+"' id='foto"+i+"' class='rounded-circle mr-2 my-2 float-left d-block' width='55vh' height='55vh'>";
            html+="<div class='d-inline float-left mb-0 mt-2'>";
            html+="<p class='mb-1' id='nombre"+i+"' style='font-size: 20px;'>"+chats[i]['Receptor']+"</p>";
            html+="<p class='mb-0' style='max-width: 165px; text-truncate'>"+chats[chats.length-2][i]+"</p></div>";
            if(parseInt(chats[chats.length-1][i]) > 0){
                html+="<div id='mensajes_nuevos"+i+"' class='m-notification bg-success float-right align-self-center mt-4 d-block text-white justify-content-center'>"+chats[chats.length-1][i]+"</div></div></td></tr>";
            }else{
                html+="<div id='mensajes_nuevos"+i+"' class='m-notification float-right align-self-center mt-4 d-block'></div></div></td></tr>";
            }
        }
    }else if(chats[0]['Receptor'] === undefined && chats['Receptor'] !== null){
        html+="<tr> <td><div class='w-100 h-100' onclick='cambiar(\""+chats['Receptor']+"\",\""+i+"\")'>";
            html+="<img src='"+chats['Foto']+"' id='foto"+i+"' class='rounded-circle mr-2 my-2 float-left d-block' width='55vh' height='55vh'>";
            html+="<div class='d-inline float-left mb-0 mt-2'>";
            html+="<p class='mb-1' id='nombre"+i+"' style='font-size: 20px;'>"+chats['Receptor']+"</p>";
            html+="<p class='mb-0' style='max-width: 165px; text-truncate'>"+chats[chats.length-2][0]+"</p></div>";
            if(parseInt(chats[chats.length-1]) > 0){
                html+="<div class='m-notification bg-success float-right align-self-center mt-4 d-block text-white justify-content-center'>"+chats[chats.length-1][0]+"</div></div></td></tr>";
            }else{
                html+="<div class='m-notification float-right align-self-center mt-4 d-block'></div></div></td></tr>";
            }
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
                $("#abierto-nombre").text(data['data']['Receptor']);
                $("#abierto-img").attr("src",data['data']['Foto']);
                $("#usuario").attr("data-usuario", data['data']['Receptor']);
            }
            mostrarMensajes(data['mensajes'],data['sesion']);
        },
        error: function (data) {
        }
    });
}

function recogerChats(orden){
    var user = $("#usuario").attr("data-usuario");
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/Messages.php",
        data: {opcion: "chats"},
        async: true,
        dataType: "json",
        success: function (data) {
            mostrarChats(data);
            cambiosChats(data);
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
    var notification = $("#mensajes_nuevos"+id);
    $("#abierto-img").attr("src",img);
    $("#abierto-nombre").text(nombre);
    notification.attr("class","m-notification float-right align-self-center mt-4 d-block");
    notification.text("");
    recogerMensajes(null,$("#usuario").attr("data-usuario"));
}

$("#enviarmensaje").submit(false);

$(document).ready(function(){
    $("#fondo").hide();
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
    
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/User_Data.php",
        data: {opcion: "main"},
        dataType: "json",
        success: function (response) {
            tratarDatosUser(response);
        }
    });

    $("#enviarmensaje").click( function (e) {
        e.preventDefault();
        var user = $("#usuario").attr("data-usuario");
        var mensaje = $("#mensaje").val();
        if(mensaje.length > 0){
            $.ajax({
                type: "POST",
                url: "../../PHP/Querys/Messages.php",
                data: {opcion: "enviar", user: user, message: mensaje},
                async: true,
                dataType: "html",
                success: function(result){
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