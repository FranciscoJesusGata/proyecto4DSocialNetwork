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
    $("#fondo").hide();
}

function controlCommentButton(target){
    if(!$.trim($("#textarea"+target).val())){
        $("#button"+target).attr("disabled",true);
    }else{
        $("#button"+target).attr("disabled",false);
    }
}


function togleTarget(target){
    $("#com" + target).slideToggle();
};

function triggerFile(target){
    $("#img" + target).click();
}

function change_Img(input) {
    console.log(input);
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
        $('#img_display').attr('src', e.target.result);
        $('#img_display').css('display','inline-block');
    }

    reader.readAsDataURL(input.files[0]);
    }
}

function displayCommentImg(target){
    var file = $('img'+target)[0];

    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
        $('#img_display').attr('src', e.target.result);
        $('#img_display').css('display','inline-block');
    }

    reader.readAsDataURL(input.files[0]);
    }

    if($("#img_d_com"+target).attr("src") == "#"){
        $("#button"+target).attr("disabled",true);
    }else{
        $("#button"+target).attr("disabled",false);
    }
}

function mostrarComentarios(comentarios, id){
    if(comentarios[1]['id_P'] != undefined){
        for(var i = 0 ; i < comentarios.length; i++){
            var x = comentarios[i]["Fecha"].split(/[- :]/);
            var fecha_P_Completa = new Date(Date.UTC(x[0], x[1]-1, x[2], x[3], x[4], x[5]));
            var html = "<hr style='width: 110%; margin-left:-5%'> <div class = 'col-12 mb-3'>";
            if(comentarios[i]['Foto'] == "" || comentarios[i]['Foto'] == null){
              comentarios[i]['Foto'] = "../img/user.jpg";
            }
            html += "<img height='50px' width='50px' src='"+comentarios[i]['Foto']+"' class='rounded-circle mr-1'>";
            html+="<label class='h5'>"+comentarios[i]["Alias"]+"</label> <label class='ml-2' style='color:#808080;font-size: 18px'>"+comentarios[i]["Nombre_Usuario"]+"</label>"
            html+="<div class='m-3 col-10 d-inline-block'>";
            html+="<p style='font-size: 20px;' id='post"+comentarios[i]['id_C']+"' >"+comentarios[i]["Texto"]+"</p>";
            html+="</div>";
            html+="<div class='col-10 ml-3'>"+fecha_P_Completa.getDay()+"/"+fecha_P_Completa.getMonth()+"/"+fecha_P_Completa.getFullYear()+" "+fecha_P_Completa.getHours()+":"+fecha_P_Completa.getMinutes()+" "+"</div>";
            html+="<div class='mt-3 col-md-12' id='com"+comentarios[i]["id_P"]+"' style='display: none;'</div>";
            $("#com"+id).append(html);
        }
    }else if(comentarios['id_P'] != undefined){
        var x = comentarios["Fecha"].split(/[- :]/);
            var fecha_P_Completa = new Date(Date.UTC(x[0], x[1]-1, x[2], x[3], x[4], x[5]));
            var html = "<hr style='width: 110%; margin-left:-5%'> <div class = 'col-12 mb-3 ml-0'>";
            if(comentarios['Foto'] == "" || comentarios['Foto'] == null){
              comentarios['Foto'] = "../img/user.jpg";
            }
            html += "<img height='50px' width='50px' src='"+comentarios['Foto']+"' class='rounded-circle mr-1'>";
            html+="<label class='h5'>"+comentarios["Alias"]+"</label> <label class='ml-2' style='color:#808080;font-size: 18px'>"+comentarios["Nombre_Usuario"]+"</label>"
            html+="<div class='m-3 col-10 d-inline-block'>";
            html+="<p style='font-size: 20px;' id='post"+comentarios['id_C']+"' >"+comentarios["Texto"]+"</p>";
            html+="</div>";
            html+="<div class='col-10 ml-3'>"+fecha_P_Completa.getDay()+"/"+fecha_P_Completa.getMonth()+"/"+fecha_P_Completa.getFullYear()+" "+fecha_P_Completa.getHours()+":"+fecha_P_Completa.getMinutes()+" "+"</div>";
            
            $("#com"+id).append(html);
    }
}

function recopilarComentarios(id){
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/Show_Posts.php",
        async: true,
        data: { ejecutar: "comentarios", id: id},
        dataType: "json",
        success: function (response) {
            console.log(response);
            if (response[1] != undefined){
                mostrarComentarios(response, id);
            }
        },
        error: function(error){
            console.log(error['responseText']);
        }
    });
}

$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/User_Data.php",
        data: {opcion: "main"},
        dataType: "json",
        success: function (response) {
            tratarDatosUser(response);
        },
        error: function(){
          $("#fondo").hide();
        }
    });
    
    function mostrarPosts(posts){
        if(posts[1]['id_P'] != undefined){
            for(var i = 0 ; i < posts.length; i++){
                var x = posts[i]["F_Publicacion"].split(/[- :]/);
                var fecha_P_Completa = new Date(Date.UTC(x[0], x[1]-1, x[2], x[3], x[4], x[5]));
                var html = "<div class = 'col-12 mb-3 ml-0'>";
                if(posts[i]['Foto'] == "" || posts[i]['Foto'] == null){
                  posts[i]['Foto'] = "../img/user.jpg";
                }
                html += "<img height='50px' width='50px' src='"+posts[i]['Foto']+"' class='rounded-circle mr-1'>";
                html+="<label class='h5'>"+posts[i]["Alias"]+"</label> <label class='ml-2' style='color:#808080;font-size: 18px'>"+posts[i]["Nombre_Usuario"]+"</label>"
                if(posts[i]["Nombre_Usuario"].toLowerCase() == $("#nomUser").text().toLowerCase()){
                    html+="<div class='float-right'><button id='editar' onclick='editar("+posts[i]['id_P']+")' class='btn btn-outline-dark'>Editar</button> <button id='eliminar' onclick='eliminar("+posts[i]['id_P']+")' class='btn btn-outline-dark' >Eliminar</button></div>";
                }
                html+="</div>";
                html+="<div class='col-1 float-right d-inline-block mb-3'>";
                html+="<button id='like' class='btn btn btn-outline-dark float-right' onclick='like("+posts[i]["id_P"]+")'> "+posts[i]['Likes']+" <i class='far fa-heart'></i></button>";
                html+="<button id='comment' class='btn btn btn-outline-dark float-right mt-1' onclick='togleTarget("+posts[i]["id_P"]+");'> "+posts[i]['Comments']+" <i class='far fa-comment'></i></div>";
                html+="<div class='m-3 col-10 d-inline-block'>";
                html+="<p style='font-size: 20px;' id='post"+posts[i]['id_P']+"' >"+posts[i]["Texto"]+"</p>";
                if(posts[i]['multimedia']){
                    html+="<img class='col-rounded' width='60%' src='"+posts[i]['multimedia']+"'>";
                }
                html+="</div></div>";
                html+="<div class='col-10 ml-3'>"+fecha_P_Completa.getDay()+"/"+fecha_P_Completa.getMonth()+"/"+fecha_P_Completa.getFullYear()+" "+fecha_P_Completa.getHours()+":"+fecha_P_Completa.getMinutes()+" "+"</div>";
                html+="";
                html+="<div class='col' id='buttons"+posts[i]["id_P"]+"'>";
                html+="<div class='mt-3 col-md-12' id='com"+posts[i]["id_P"]+"' style='display: none;'>";
                html+="<textarea class='form-control' style='resize: none' rows='5' name='comentario' id='textarea"+posts[i]["id_P"]+"' onkeyup='controlCommentButton("+posts["id_P"]+")'></textarea>";
                html+="<br/><button class='btn btn-primary mr-3' onclick='comentar("+posts[i]['id_P']+");' id='button"+posts[i]['id_P']+"'>Enviar</button>";
                html+="<button type='button' class='btn btn-secundary' id='filebtn' onclick='triggerFile("+posts[i]['id_P']+")'>Subir imagen</button>";
                html+="<input type='file' style='display:none;' id='img"+posts[i]['id_P']+"' value='null' name='file' onchange='displayCommentImg("+posts[i]['id_P']+")'/>";
                html+="<img id='img_d_com"+posts[i]['id_P']+"' class = 'rounded ml-1' src='#' style='display:none; height: 10vh; width: 10vh;'></div>";
                html+="<hr style='width: 110%; margin-left:-5%'>";
                $("#posts").prepend(html);
                if(i == posts.length-1){
                    $("#info").attr("data-ult_fecha",posts[i]["F_Publicacion"]);
                }
            }
        }else if(posts['id_P'] != undefined){
            var x = posts["F_Publicacion"].split(/[- :]/);
            var fecha_P_Completa = new Date(Date.UTC(x[0], x[1]-1, x[2], x[3], x[4], x[5]));
            if(posts['Foto'] == "" || posts['Foto'] == null){
              posts['Foto'] = "../img/user.jpg";
            }
            var html = "<div class = 'col-12 mb-3 ml-0'>";
            if(posts['Foto'] == "" || posts['Foto'] == null){
              posts['Foto'] = "../img/user.jpg";
            }
            html += "<img height='50px' width='50px' src='"+posts['Foto']+"' class='rounded-circle mr-1'>";
            html+="<label class='h5'>"+posts["Alias"]+"</label> <label class='ml-2' style='color:#808080;font-size: 18px'>"+posts["Nombre_Usuario"]+"</label>"
            if(posts["Nombre_Usuario"].toLowerCase() == $("#nomUser").text().toLowerCase()){
                html+="<div class='float-right'><button id='editar' onclick='editar("+posts['id_P']+")' class='btn btn-outline-dark'>Editar</button> <button id='eliminar' onclick='eliminar("+posts['id_P']+")' class='btn btn-outline-dark' >Eliminar</button></div>";
            }
            html+="</div>";
            html+="<div class='col-1 float-right d-inline-block mb-3'>";
            html+="<button id='like' class='btn btn btn-outline-dark float-right'> "+posts['Likes']+" <i class='far fa-heart'></i></button>";
            html+="<button id='comment' class='btn btn btn-outline-dark float-right mt-1' onclick='togleTarget("+posts["id_P"]+");'> "+posts['Comments']+" <i class='far fa-comment'></i></div>";
            html+="<div class='m-3 col-10 d-inline-block'>";
            html+="<p style='font-size: 20px;' id='post"+posts['id_P']+"' >"+posts["Texto"]+"</p>";
            if(posts['multimedia']){
                html+="<img class='col-rounded' width='60%' src='"+posts['multimedia']+"'>";
            }
            html+="</div></div>";
            html+="<div class='col-10 ml-3'>"+fecha_P_Completa.getDay()+"/"+fecha_P_Completa.getMonth()+"/"+fecha_P_Completa.getFullYear()+" "+fecha_P_Completa.getHours()+":"+fecha_P_Completa.getMinutes()+" "+"</div>";
            html+="";
            html+="<div class='col' id='buttons"+posts["id_P"]+"'>";
            html+="<div class='mt-3 col-md-12' id='com"+posts["id_P"]+"' style='display: none;'>";
            html+="<textarea class='form-control' style='resize: none' rows='5' name='comentario' id='textarea"+posts["id_P"]+"' onkeyup='controlCommentButton("+posts["id_P"]+")'></textarea>";
            html+="<br/><button class='btn btn-primary mr-3' onclick='comentar("+posts['id_P']+");' id='button"+posts['id_P']+"'>Enviar</button>";
            html+="<button type='button' class='btn btn-secundary' id='filebtn' onclick='triggerFile("+posts['id_P']+")'>Subir imagen</button>";
            html+="<input type='file' style='display:none;' id='img"+posts['id_P']+"' value='null' name='file' onchange='displayCommentImg("+posts['id_P']+")'/>";
            html+="<img id='img_d_com"+posts['id_P']+"' class = 'rounded ml-1' src='#' style='display:none; height: 10vh; width: 10vh;'></div>";
            html+="<hr style='width: 110%; margin-left:-5%'>";
                $("#posts").prepend(html);
                $("#info").attr("data-ult_fecha",posts["F_Publicacion"]);
                recopilarComentarios(posts['id_P']);
        }

        $("#fondo").hide();
    }

    window.update_Posts = function (){
        $.ajax({
            type: "POST",
            url: "../../PHP/Querys/Show_Posts.php",
            async: true,
            data: { ejecutar: "onload"},
            dataType: "json",
            success: function (response) {
                console.log(response);
                if (response[1] != undefined){
                    mostrarPosts(response);
                }
            },
            error: function(error){
                console.log(error['responseText']);
            }
        });
    }

    update_Posts();

    var intervalo = setInterval(function () {
        if($("#posts").children().length > 0){
            $("#posts").empty();
        }
        update_Posts();
    },60000);

    localStorage.setItem("intervalo",intervalo);

    $("#img1").change(function () {
        change_Img(this);
        if($("#img1").attr("src") == "#"){
        $("#sendPost").attr("disabled",true);
        }else{
            $("#sendPost").attr("disabled",false);
        }
    });

    $("#post").keyup(function () { 
        if(!$.trim($("#post").val())){
            $("#sendPost").attr("disabled",true);
        }else{
            $("#sendPost").attr("disabled",false);
        }
    });

    $("#tiempo").on("change", function(){
        if($("#tiempo").val() == "MONTH"){
            if($("#cantidad").val() > 12){
                $("#cantidad").val("12");
            }
            $("#cantidad").attr("max", "12");
        }else{
            $("#cantidad").attr("max", "30");
        }
    })
});
