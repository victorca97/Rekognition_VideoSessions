//Genera las previsualizaciones
function createPreview(file) {
    var imgCodified = URL.createObjectURL(file);
    var img = $('<div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
    $(img).insertBefore("#add-photo-container");
}
//Genera las previsualizaciones
function createPreview2(file) {
    var imgCodified = URL.createObjectURL(file);
    var img = $('<div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12"><div class="image-container2"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
    $(img).insertBefore("#add-photo-container2");
}