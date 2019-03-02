$.ajax({
    type: "POST",
    url: "/projectSocialNetwork/PHP/Sessions/Session_Exists.php",
    data: {action: "ejecutar"},
    async: true,
    dataType: "html",
    success: function(data){
                if (data == "yes"){
                    window.location.replace("../../HTML/html/inicio.html");
                }
            },
    error: function(){
        console.log("error");
    }
});

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

$(document).ready(function(){
    //Si la página esta por debajo del top, a la mitad o al final, te devuelve al inicio de la página
    if($('body, html').scrollTop() != 0){
        $('body,html').animate({scrollTop:0},800);
    }
    //Esto desactiva que se pueda subir el formulario al pulsar el botón sin pasar antes por las comprobaciones
    $('#registro').submit(false);

    function errorUsuarioExistente(){
        $.ajax({
            type: "POST",
            url: "/projectSocialNetwork/PHP/Sessions/Session_Exists.php",
            data: {action: "error"},
            async: true,
            dataType: "html",
            success: function(data){
                        console.log(data);
                        if (data == "usuario"){
                            var html = "<div class='alert alert-danger col-md-12' style='display: block; margin-top: 10px; margin-bottom: -5px;' id='error_registro'>"
                            html+="<strong>Error: </strong> Ya existe un usuario con ese nombre de usuario"
                            html+="</div>";
                            $("#alerta_passwd").after(html);
                            $("body").css("overflow","visible");
                        } else if (data == "email"){
                            var html = "<div class='alert alert-danger col-md-12' style='display: block; margin-top: 10px; margin-bottom: -5px;' id='error_registro'>"
                            html+="<strong>Error: </strong> Ya hay un usuario asociado a esa cuenta de correo"
                            html+="</div>";
                            $("#alerta_passwd").after(html);
                            $("body").css("overflow","visible");
                        }
                    },
            error: function(){
                console.log("error");
            }
        });
    }

    errorUsuarioExistente();
    //Todo esto es para que ver la imagen que subes y para borrarla
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

    /*
    ** En el momento en el que haga click al boton se lanzara el código
    */

    $("#send").click(function(){

        /*
        ** insertamos los valores del formulario en unas variables
        */
        var passwd1 = $("#passwd1").val();
        var passwd2 = $("#passwd2").val();
        var email = $("#email").val();
        var Nom_User = $("#nombre_user").val();

        //Se comprueba que no falte ningún dato obligatorio
        if((Nom_User.length * passwd1.length * passwd2.length * email.length) > 0){
            console.log(Nom_User.length * passwd1.length * passwd2.length * email.length);
            /*
            ** comprobamos si las contraseñas coinciden, si no, mostramos un alert
            */
            if(passwd1 == passwd2){
                $("#alerta_passwd").slideUp();

                /*
                ** comprobamos la longitud de las contraseñas
                */
                if(passwd1.length <= 7){
                    swal("Error", "tu contraseña debe contener mas de 7 caracteres", "warning");
                }
                else{

                    /*
                    ** Creamos una expresión regular para comprobar el Email. si al comparar el email
                    ** con la expresión no coincide, significa que el email no es correcto
                    */

                    //Me he tirado unas horas configurando el RegExp, pero lo he logrado, el filtro funciona

                    var filtro = new RegExp("[A-Za-z0-9!#$%&'*+/=? .^_`{|}~-]+@[A-Za-z0-9]+[.]+[a-z0-9]{2,6}?");
                    if (filtro.test(email)) {

                        /*
                        ** Comprobamos la longitud del nombre de usuario
                        */
                        if(Nom_User.length >= 2 && Nom_User.length <= 20){
                            $("#registro").unbind( "submit", true );
                            $("#registro").submit();
                            console.log("envia");
                        }
                        else{
                            if(Nom_User.length > 20){
                                swal("Error", "su nombre de usuario es demasiado largo", "error")
                            }
                            else{
                                swal("Error", "su nombre de usuario es demasiado corto", "error")
                            }
                        }
                    }
                    else {
                        swal("DENIED", "Su correo electrónico es incorrecto", "warning");
                    }
                }
            }
            else{
                //Cuando te muestre el error te deja hacer scroll porque si no, no puedes presionar el botón para subir el form
                $("#alerta_passwd").slideDown();
                $("body").css("overflow","visible");
            }
        } else {
            swal("DENIED", "Faltan campos obligatorios por rellenar", "warning");
        }
    })
})
