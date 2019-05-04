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

    if(Tema == ""){
      $("body").addClass('no-image-background');
    } else {
      $("#seccion-background").hide();
      $("body").addClass('image-background');
      $("body").css("background-image", "url("+ Tema +")");
    }
    $("#fotoPerfil").attr("src",Fotosrc);
    $("#alias").text(Alias);
    $("#nomUser").text(Nombre);
    $("#followers").text(Followers);
    $("#following").text(Following);
}

function togleTarget(target){
    $("#com" + target).slideToggle();
};

function triggerFile(target){
    $("#img" + target).click();
}

function change_Img(input) {
    
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
        $('#img_display').attr('src', e.target.result);
        $('#img_display').css('display','inline-block');
    }

    reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function(){
    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/User_Data.php",
        data: {opcion: "main"},
        dataType: "json",
        success: function (response) {
            tratarDatosUser(response);
        }
    });
    
    function mostrarPosts(posts){
        if(posts[0] != 'undefined'){
            for(var i = 0 ; i < posts.length ; i++){
                console.log(posts[i]['Foto']);
                var html = "<div class='w-100 d-block mb-5'>";
                html += "<div class = 'col-12 mb-3 ml-0'>";
                html += "<img height='50px' width='50px' src='"+posts[i]['Foto']+"' class='rounded-circle mr-1'>";
                html+="<label style='font-size: 20px'>"+posts[i]["Alias"]+"</label></div>";
                html+="<div class='col-1 float-right d-inline-block'>";
                html+="<button id='like' class='btn btn btn-outline-dark float-right'> 0 <i class='far fa-heart'></i></button>";
                html+="<button id='comment' class='btn btn btn-outline-dark float-right mt-1' onclick='togleTarget("+posts[i]["id_P"]+");'> 0 <i class='far fa-comment'></i></div>";
                html+="<div class='mt-3 ml-2 col-10 d-inline-block'>";
                html+="<p style='font-size: 20px;'>"+posts[i]["Texto"]+"</p>";
                html+="</div>";
                html+="</div>";
                html+="<div class='col' id='buttons"+posts[i]["id_P"]+"'>";
                html+="<div class='col-md-12' id='com"+posts[i]["id_P"]+"' style='display: none;'>";
                html+="<textarea class='form-control' style='resize: none' rows='5' id='textarea"+posts[i]["id_P"]+"'></textarea>";
                html+="<br/><button class='btn btn-primary mr-3' onclick='send("+posts[i]['id_P']+");' id='button"+posts[i]['id_P']+"'>Enviar</button>";
                html+="<button type='button' class='btn btn-secundary' id='filebtn' onclick='triggerFile("+posts[i]['id_P']+")'>Subir imagen</button>";
                html+="<input type='file' style='display:none;' id='img"+posts[i]['id_P']+"' value='null' name='file'/></div>";
                html+="<hr class='w-100'>";
                $("#posts").prepend(html);
            }
        }
    }

    $.ajax({
        type: "POST",
        url: "../../PHP/Querys/Show_Posts.php",
        data: { ejecutar: "onload"},
        dataType: "json",
        success: function (response) {
            console.log(response);
            mostrarPosts(response);
        }
    });

    document.getElementsByTagName("html")[0].style.visibility = "visible";


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
