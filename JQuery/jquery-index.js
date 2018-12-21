function togleTarget(target){
    $("#com" + target).slideToggle();
};
function send(target){
    var html = "<div class='col-md-12'>";
    var imgUser = "img/arma-3-diver-logo-widescreen-wallpaper.jpg";
    var name = "diegogamer747";
    
    
    html += "<img height='40px' width='40px' src='" + imgUser + "' class='rounded-circle'>";
    
    html += "<label>&nbsp;" + name +"</label>";
    
    html += "<p class='mt-3 mb-3'>" + $.trim($("#textarea" + target).val());
    
    html += "<button class='btn float-right'><i class='far fa-heart'></i></button></p>";
    
    
    if($("#img" + target).val() != null){
        
        html  += "<img class='col-rounded' height='150px' src=" + $("#img" + target).val() + ">";
        
    };
    
    html += "</div>";
    
    $("#comment" + target).append(html);
};