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

function mostrarMensajes(mensajes){
    var html ="";
    var ult_fecha ="";
    if(mensajes['Id_M'] === undefined){
        for(var i = 0; (mensajes.length - 1) > i ; i++){
            html += "<tr class='row mx-1'> <td class='w-100'> <div><div class='";
            if(mensajes[i]['Receptor'] == mensajes[(mensajes.length - 1)].toLowerCase()){
                html+="messageIzq p-absolute float-left rounded border bg-white border";
            }else if(mensajes[i]['Receptor'] != mensajes[(mensajes.length - 1)].toLowerCase()){
                html+="messageDer p-absolute float-right rounded border bg-white border";
            }
            html+="'><pre style='font-size: 15px;' class='mx-2 my-1'>"+mensajes[i]['Texto']+"</pre></div></td></tr> <tr class='row mx-3'><td class='w-100'><p style='font-size: 10px;' class='p-absolute m-0 ";
            if(mensajes[i]['Receptor'] == mensajes[(mensajes.length - 1)].toLowerCase()){
                html+="float-left";
            }else if(mensajes[i]['Receptor'] != mensajes[(mensajes.length - 1)].toLowerCase()){
                html+="float-right";
            }
            html+="'>"+mensajes[i]['F_Envio']+" ";
            if(mensajes[i]['Receptor'] != mensajes[(mensajes.length - 1)].toLowerCase()){
                if(mensajes[i]['F_Lectura'] != null){
                    html+="Leído";
                }else{
                    html+="No leído";
                }
            }
            html+="</p></div></td></tr>";
            if(i == (mensajes.length - 2)){
                ult_fecha = mensajes[i]['F_Envio'];
                $("#usuario").attr("data-ult_fecha",ult_fecha);
            }
        }
    }else if (mensajes['Id_M'] !== undefined){
        html += "<tr class='row mx-1'> <td class='w-100'> <div><div class='";
        if(mensajes['Receptor'] == mensajes[5].toLowerCase()){
            html+="messageIzq p-absolute float-left rounded border bg-white border";
        }else if(mensajes['Receptor'] != mensajes[5].toLowerCase()){
            html+="messageDer p-absolute float-right rounded border bg-white border";
        }
        html+="'><pre style='font-size: 15px;' class='mx-2 my-1'>"+mensajes['Texto']+"</pre></div></td></tr> <tr class='row mx-3'><td class='w-100'><p style='font-size: 10px;' class='p-absolute m-0 ";
        if(mensajes['Receptor'] == mensajes[5].toLowerCase()){
            html+="float-left";
        }else if(mensajes['Receptor'] != mensajes[5].toLowerCase()){
            html+="float-right";
        }
        html+="'>"+mensajes['F_Envio']+" ";
        if(mensajes['Receptor'] != mensajes[5].toLowerCase()){
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
    $("#chat").append(html);
}

function mostrarChats(chats){
    var html ="";
    if(datos[0]['Receptor'] !== undefined){
        for(var i = 0; datos.length > i ; i++){
            html+="<tr> <td><div class='w-100'>";
            html+="<img src='"+chats[i]['Foto']+"' class='rounded-circle mr-2 my-2 float-left d-block' width='55vh' height='55vh'>";
            html+="<div class='d-inline float-left mb-0 mt-2'>";
            html+="<p class='mb-1' style='font-size: 20px;'>"+chats[i]['Receptor']+"</p>";
            html+="<p class="mb-0">Hola!</p>";
            html+="";
            html+="";
            html+="";
            html+="";
            html+="";
        }
    }else if(datos[0]['Receptor'] === undefined){

    }
}

function recogerMensajes(fecha){
    if (fecha == ""){
        fecha = null;
    }
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/Messages.php",
        data: {opcion: "recibir", fecha: fecha},
        async: true,
        dataType: "json",
        success: function (data) {
            mostrarMensajes(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function recogerChats(){
    console.log("ejecuta");
    var user = $("#usuario").attr("data-usuario");
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/Messages.php",
        data: {opcion: "chats", user: user},
        async: true,
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

$("#enviarmensaje").submit(false);

$(document).ready(function(){
    document.getElementsByTagName("html")[0].style.visibility = "visible";
    $("#enviarmensaje").attr("disabled", "disabled");

    recogerMensajes(null);
    recogerChats();

    setInterval(function(){
        var ult_fecha = $("#usuario").attr("data-ult_fecha");
        recogerMensajes(ult_fecha);
    },1000);

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
        $.ajax({
            type: "POST",
            url: "../../PHP/Querys/Messages.php",
            data: {opcion: "enviar", user: user, message: mensaje},
            async: true,
            dataType: "html",
            success: function(){
                ult_fecha = $("#usuario").attr("data-ult_fecha");
                recogerMensajes(ult_fecha);
            },
            error: function(data){
                console.log(data);
            } 
        });
        $("#mensaje").val("");
    });
});