function subir(e){
    var formData = new FormData(document.getElementById("publicar"));
    $.ajax({
        url : "../../PHP/Querys/Publish.php",
        type: "POST",
        data : formData,
        async: false,
                contentType: false,
                cache: false,
                processData: false,
        success : function(response){
            console.log(response);
        },
        error: function(obj,text,error) {
            console.error("error",obj.responseText);
        }
    });
    $("#publicar").trigger("reset");
    $("#sendPost").attr("disabled",true);
    $('#img_display').css('display','none');
    $('#img_display').attr('src', '#');
}

function comentar(e){
    var comentario = $("#comentar"+e).val;
    $.ajax({
        url : "../../PHP/Querys/Publish.php",
        type: "POST",
        data : formData,
        async: false,
                contentType: false,
                cache: false,
                processData: false,
        success : function(response){
            console.log(response);
        },
        error: function(obj,text,error) {
            console.error("error",obj.responseText);
        }
    });
    $("#comentar"+e).trigger("reset");
    $("#button"+e).attr("disabled",true);
    /*$('#img_display').css('display','none');
    $('#img_display').attr('src', '#');*/
}

function updatePubli(text,id){
    $.ajax({
        url : "../../PHP/Querys/Publish.php",
        type: "POST",
        data : {opcion: "update", id: id, texto: text},
        dataType: 'html',
        success : function(response){
            console.log(response);
        },
        error: function(obj,text,error) {
            console.error("error",obj.responseText);
        }
    });
}

function crearIntervalo(){
    intervalo = setInterval(function () {
        if($("#posts").children().length > 0){
            $("#posts").empty();
        }
        update_Posts();
    },60000);

    localStorage.setItem("intervalo",intervalo);
}

function editar(id){
    var intervalo = localStorage.getItem("intervalo");
    clearInterval(intervalo);
    swal({
        title: "Editar publicación",
        content: {
            element: 'input',
            attributes: {
                defaultValue: $("#post"+id).text()
            }
        },
        onClose: crearIntervalo
    }).then((valor) => {
        var text = valor;
        console.log(text);
        updatePubli(text,id);
        crearIntervalo();
    });
}


$(document).ready(function () {
    $("#publicar").on("submit", function (e) { 
        e.preventDefault();
        subir(e);
    });
});
