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

function comentar(id){
    var comentario = $("#textarea"+id).val();
    $.ajax({
        url : "../../PHP/Querys/Publish.php",
        type: "POST",
        data: {comentario: comentario, id: id},
        dataType: 'html',
        success : function(response){
            console.log(response);
        },
        error: function(obj,text,error) {
            console.error("error",obj.responseText);
        }
    });
}

function like(id){
    $.ajax({
        url : "../../PHP/Querys/Publish.php",
        type: "POST",
        data: {opcion: 'like', id: id},
        dataType: 'html',
        success : function(response){
            console.log(response);
        },
        error: function(obj,text,error) {
            console.error("error",obj.responseText);
        }
    });
}

function updatePubli(text,id){
    $.ajax({
        url : "../../PHP/Querys/Publish.php",
        type: "POST",
        data : {opcion: "update", id: id, texto: text},
        dataType: 'html',
        error: function(obj,text,error) {
            console.error("error",obj.responseText);
        }
    });
}

function deletePubli(id){
    $.ajax({
        url : "../../PHP/Querys/Publish.php",
        type: "POST",
        data : {opcion: "delete", id: id},
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
        updatePubli(text,id);
        crearIntervalo();
    });
}

function eliminar(id){
    swal({
        title: "¿Desead eliminar esta publicación?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            deletePubli(id);
        }
    });
}


$(document).ready(function () {
    $("#publicar").on("submit", function (e) { 
        e.preventDefault();
        subir(e);
    });
});
