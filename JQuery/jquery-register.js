$.ajax({
    type: "POST",
    url: "/projectSocialNetwork/PHP/Sessions/Session_Exists.php",
    data: {action: "ejecutar"},
    async: true,
    dataType: "html",
    success: function(data){
                if (data == "yes"){
                    window.location.replace("../../HTML/html/index.html");
                }
            },
    error: function(){
        console.log("error");
    }
});

$(document).ready(function(){
    /*
    ** Imprime un error si el usuario que se intentó resgistrarse ya existía o ya se estaba utilizando esa dirección
       de correo
    */
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
                            var html = "<div class='alert alert-danger' id='error_registro'>"
                            html+="<strong>Error: </strong> Ya existe un usuario con ese nombre de usuario"
                            html+="</div>";
                            $("#alerta_passwd").after(html);
                        } else if (data == "email"){
                            var html = "<div class='alert alert-danger' id='error_registro'>"
                            html+="<strong>Error: </strong> Ya hay un usuario asociado a esa cuenta de correo"
                            html+="</div>";
                            $("#alerta_passwd").after(html);
                        }
                    },
            error: function(){
                console.log("error");
            }
        });
    }

    errorUsuarioExistente();

    /*
    ** En el momento en el que haga click al boton se lanzara el código
    */
	
	var enviar = function(passwd, email, Nom_User){
		/*
		** Crea un formulario y lo envía al PHP de registro
		*/
		var formulario = $("<form method='POST' action='../../PHP/Sessions/Sign_Up.php' >"+
		"<input type='hidden' name='Nom_User' value='"+Nom_User+"'>"+
		"<input type='hidden' name='email' value='"+email+"'>"+
		"<input type='hidden' name='passwd' value='"+passwd+"'>"+"</form>");
		$('body').append(formulario);
		$(formulario).submit();
    }

    $("#send").click(function(){
        
        /*
        ** insertamos los valores del formulario en unas variables
        */
        var passwd1 = $("#passwd1").val();
        var passwd2 = $("#passwd2").val();
        var email = $("#email").val();
        var Nom_User = $("#nombre_user").val();
        
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

                var filtro = new RegExp("[A-Za-z0-9!#$%&'*+/=? ^_`{|}~-]+@[A-Za-z0-9]+[.]+[a-z0-9]{2,6}?");
                if (filtro.test(email)) {
                    
                    /*
                    ** Comprobamos la longitud del nombre de usuario
                    */
                    if(Nom_User.length >= 2 && Nom_User.length <= 20){
						enviar(passwd1, email, Nom_User);
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
            $("#alerta_passwd").slideDown();
        }
    })
})