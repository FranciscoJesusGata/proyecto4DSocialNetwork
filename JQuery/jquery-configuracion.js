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
  $("#fondo").show();

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

    if (typeof Tema === "string") {
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
    } else {
        if (Tema.files && Tema.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            $("#Tema").html('<img class="fotoComun" id="fotoTema" src="' + e.target.result + '">');
            $("#seccion-background").hide();
            $("body").addClass('image-background');
            $("body").css("background-image", "url("+ e.target.result +")");
          }
          reader.readAsDataURL(Tema.files[0]);
        }
    }
    
    if (typeof Encabezado === "string") {
        if(Encabezado != ""){
          $("#Encabezado").html('<img class="fotoComun" id="fotoEncabezado" src="' + Encabezado + '">');
        } else {
          $("#Encabezado").html('<h1 class="icono-general"><i class="fas fa-image"></i></h1>');
        }
    } else {
        if (Encabezado.files && Encabezado.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            $("#Encabezado").html('<img class="fotoComun" id="fotoEncabezado" src="' + e.target.result + '">');
          }
          reader.readAsDataURL(Encabezado.files[0]);
        }
    }
    
    if (typeof Fotosrc === "string") {
        if(Fotosrc != ""){
          $("#fotoPerfil").html('<img class="fotoPerfil" id="fotoPerfil" src="' + Fotosrc + '">');
        } else {
          $("#fotoPerfil").html('<h1 class="icono-general"><i class="fas fa-camera"></i></h1>');
        }
    } else {
        if (Fotosrc.files && Fotosrc.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            $("#fotoPerfil").html('<img class="fotoPerfil" id="fotoPerfil" src="' + e.target.result + '">');
          }
          reader.readAsDataURL(Fotosrc.files[0]);
        }
    }

    /*if(Fotosrc != ""){
      $("#fotoPerfil").html('<img class="fotoPerfil" id="fotoPerfil" src="' + Fotosrc + '">');
    } else {
      $("#fotoPerfil").html('<h1 style="padding-top:30%"><i class="fas fa-camera"></i></h1>');
    }*/

    $("#biografia").val(Biografia)
    $("#alias").val(Alias);
    $("#nomUser").text(Nombre);
    $("#followers").text(Followers);
    $("#following").text(Following);
    $("#fondo").hide();
}

function loadAll() {
  getDataFromUser();
}

$(document).ready(function(){
  
    ///////////// TEMA /////////////
    
    $("#File-Tema").on("change", function(){
      var oldValue = JSON.parse($("#auxData").val());
      oldValue['Tema'] = this;
      $("#saveTema").val("true");
      tratarDatosUser(oldValue)
    });
  
    $("#Tema").click(function(){
      $("#File-Tema").click();
    });
    
    $("#clear-Tema").click(function(){
      $("#File-Tema").val("");
      var oldValue = JSON.parse($("#auxData").val());
      oldValue['Tema'] = "";
      $("#saveTema").val("true");
      tratarDatosUser(oldValue);
    });
    
    ///////////// ENCABEZADO /////////////
    
    $("#File-Encabezado").on("change", function(){
      var oldValue = JSON.parse($("#auxData").val());
      oldValue['Cabecera'] = this;
      $("#saveCab").val("true");
      tratarDatosUser(oldValue)
    });
        
    $("#Encabezado").click(function(){
      $("#File-Encabezado").click();
    });
    
    $("#clear-Encabezado").click(function(){
      $("#File-Encabezado").val("");
      var oldValue = JSON.parse($("#auxData").val());
      oldValue['Cabecera'] = "";
      $("#saveCab").val("true");
      tratarDatosUser(oldValue);
    });
    
    ///////////// FOTO DE PERFIL /////////////
    
    $("#File-Perfil").on("change", function(){
      var oldValue = JSON.parse($("#auxData").val());
      oldValue['Foto'] = this;
      $("#saveFoto").val("true");
      tratarDatosUser(oldValue)
    });
    
    $("#fotoPerfil").click(function(){
      $("#File-Perfil").click();
    });
    
    $("#clear-perfil").click(function(){
      $("#File-Perfil").val("");
      var oldValue = JSON.parse($("#auxData").val());
      oldValue['Foto'] = "";
      $("#saveFoto").val("true");
      tratarDatosUser(oldValue);
    });
    
    loadAll();
    document.getElementsByTagName("html")[0].style.visibility = "visible";

});
