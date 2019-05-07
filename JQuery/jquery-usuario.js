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

function getDataFromUser() {

  $.ajax({
      type: "POST",
      url: "../../PHP/Querys/User_Data.php",
      data: {opcion: "main"},
      dataType: "json",
      success: function (response) {
          tratarDatosUser(response);
      }
  });
}


function tratarDatosUser(datos){
    $("#auxData").val(JSON.stringify(datos));
    var Alias = datos["Alias"];
    var Nombre = datos["Nombre_Usuario"];
    var Fotosrc = datos["Foto"];
    var Encabezado = datos["Cabecera"];
    var Tema = datos["Tema"]
    var Biografia = datos["Biografia"];
    var Followers = datos["Seguidores"];
    var Following = datos["Seguidos"];

    if(Tema != ""){
      $("#Tema").html('<img class="fotoComun" id="fotoTema" src="' + Tema + '">');
      $("#seccion-background").hide();
      $("body").addClass('image-background');
      $("body").css("background-image", "url("+ Tema +")");
    } else {
      $("#Tema").html('<h1 class="icono-general"><i class="fas fa-palette"></i></h1>');
      $("#seccion-background").show();
      $("body").addClass('no-image-background');
      $("body").css("background-image", "");
    }
    
    if(Encabezado != ""){
      $("#Encabezado").addClass('encabezado-background');
      $("#Encabezado").css("background-image", "url("+ Encabezado +")");
    }
    
    if(Fotosrc != ""){
      $('#fotoPerfil').attr('src', Fotosrc);
    } else {
      $('#fotoPerfil').attr('src', "../img/user.jpg");
    }

    $("#biografia").text(Biografia)
    $("#alias").text(Alias);
    $("#nomUser").text(Nombre);
    $("#followers").text(Followers);
    $("#following").text(Following);
}

function loadAll() {
  getDataFromUser();
}

$(document).ready(function(){
    
    loadAll();
    document.getElementsByTagName("html")[0].style.visibility = "visible";

});