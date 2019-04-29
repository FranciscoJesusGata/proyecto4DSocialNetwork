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

  $("#input_img_perfil").change(function () {
      change_Img_Perfil(this);
  });

  $("#clear_img_perfil").click(function(){
      $("#input_img_perfil").val('');
      $('#img_perfil').removeAttr('src');
      $('#icono').css('display','block');
      $('#img_perfil').css('display','none');
  });

  $("#input_img_encabezado").change(function () {
      change_Img_Encabezado(this);
  });

  $("#clear_img_encabezado").click(function(){
      $("#input_img_encabezado").val('');
      $('#img_encabezado').removeAttr('src');
      $('#icono_e').css('display','block');
      $('#img_encabezado').css('display','none');
  });

  $("#input_img_tema").change(function () {
      change_Img_Tema(this);
  });

  $("#clear_img_tema").click(function(){
      $("#input_img_tema").val('');
      $('#img_tema').removeAttr('src');
      $('#icono_t').css('display','block');
      $('#img_tema').css('display','none');
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
}

function getPeticiones() {
  $.ajax({
      type: "POST",
      url: "../../PHP/Querys/NotificacionesAdv.php",
      data: {type: "AdvSeg"},
      async: true,
      dataType: "html",
      success: function(result){
                  console.log(result);
                  var data = jQuery.parseJSON(result);
                  if (typeof data !== 'undefined' && data.length > 0) {
                    var show = "";
                      for (var i = 0; i < data.length; i++) {
                        show += "<tr><td>";
                        show += data[i]['Nombre_Usuario'] + " ";
                        show += "</td><td>";
                        show += "<div class='btn-group'><button class='btn btn-primary' onclick='acceptPeticion(";
                        show += "\"" + data[i]['Nombre_Usuario'] + "\", \"";
                        show += data[i]['Nombre_Seguido'];
                        show += "\")'><i class='fas fa-check'></i></button>";
                        show += "<button class='btn btn-danger' onclick='denyPeticion(\"";
                        show += data[i]['Nombre_Usuario'] + "\", \"";
                        show += data[i]['Nombre_Seguido'];
                        show += "\")'><i class='fas fa-times'></i></button></div>";
                        show += "</td></tr>";
                      }
                    $("#peticiones").html(show)
                  }
              },
      error: function(){
          swal("Error", "Se haproducido un error al tratar de obtener las peticiones de seguimiento", "error");
          console.log("error");
      }
  });
}

function tratarDatosUser(datos){
    console.log(datos);
    var Alias = datos["Alias"];
    var Nombre = datos["Nombre_Usuario"];
    var Fotosrc = datos["Foto"];
    var Encabezado = datos["Cabecera"];
    var Tema = datos["Tema"]
    var Biografia = datos["Biografia"];
    var Followers = datos["Seguidores"];
    var Following = datos["Seguidos"];

    if(Tema != ""){
      $("#Tema").html('<img class="fotoComun" id="fotoPerfil" src="' + Tema + '">');
    } else {
      $("#Tema").html('<h1 class="icono-general"><i class="fas fa-palette"></i></h1>');
    }

    if(Encabezado != ""){
      $("#Encabezado").html('<img class="fotoComun" id="fotoEncabezado" src="' + Encabezado + '">');
    } else {
      $("#Encabezado").html('<h1 class="icono-general"><i class="fas fa-image"></i></h1>');
    }

    if(Fotosrc != ""){
      $("#fotoPerfil").html('<img class="fotoPerfil" id="fotoPerfil" src="' + Fotosrc + '">');
    } else {
      $("#fotoPerfil").html('<h1 style="padding-top:30%"><i class="fas fa-camera"></i></h1>');
    }

    $("#biografia").val(Biografia)
    $("#alias").val(Alias);
    $("#nomUser").text(Nombre);
    $("#followers").text(Followers);
    $("#following").text(Following);
}

function denyPeticion(nomUser, nomSeguido) {
    swal({
      title: "Cancelar peticion de seguimiento",
      text: "Estas seguro de que quieres cancelar la petición de" + nomUser,
      icon: "warning",
      buttons: true,
      buttons: ["Cancelar", "Aceptar"],
    })
    .then((check) => {
      if (check) {
        swal("Petición de seguimiento cancelada", {
          icon: "success",
        });
        loadAll();
      } else {
      }
    });
    //swal()
}

function acceptPeticion(nomUser, nomSeguido) {
    swal({
      title: "Aceptar peticion de seguimiento",
      text: "Estas seguro de que quieres aceptar a " + nomUser + " como tu seguidor",
      icon: "warning",
      buttons: true,
      buttons: ["Cancelar", "Aceptar"],
    })
    .then((check) => {
      if (check) {
        swal("Petición de seguimiento aceptada", {
          icon: "success",
        });
        loadAll();
      } else {
      }
    });
}

function loadAll() {
  getPeticiones();
  getDataFromUser();
}

function save(){

}


function change_Img_Perfil(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
        $('#img_perfil').attr('src', e.target.result);
        $('#icono').css('display','none');
        $('#img_perfil').css('display','block');
    }

    reader.readAsDataURL(input.files[0]);
    }
}

function change_Img_Encabezado(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
        $('#img_encabezado').attr('src', e.target.result);
        $('#icono_e').css('display','none');
        $('#img_encabezado').css('display','block');
    }

    reader.readAsDataURL(input.files[0]);
    }
}

function change_Img_Tema(input) {
    if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
        $('#img_tema').attr('src', e.target.result);
        $('#icono_t').css('display','none');
        $('#img_tema').css('display','block');
    }

    reader.readAsDataURL(input.files[0]);
    }
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

    loadAll();
    document.getElementsByTagName("html")[0].style.visibility = "visible";

});
