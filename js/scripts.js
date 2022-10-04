$(document).ready(function(){
    // QUITAR EL MODAL - FUNCION ANTIGUA
    /* $(".modal").on("click", function (e) {
        if (($(e.target).hasClass("modal-main") || $(e.target).hasClass("close-modal")) && $("#loading").css("display") == "none") {
            console.log("Se ejecutara la funcion CLOSEMODAL");
            closeModal();
        }}); */

    // SI SE HACE CLICK EN EL LOGO DE LA CAMARA SE HARA CLICK EN EL INPUT QUE ESTA ESCONDIDO
    $(document).on("click", "#add-photo", function(){
        $("#add-new-photo").click();
    });
    $(document).on("click", "#add-photo2", function(){
        $("#add-new-photo2").click();
    });

    // SE EJECUTARA ESTA FUNCION CADA VEZ QUE CAMBIAR ALGO EN EL INPUT
    $(document).on("change", "#add-new-photo", function () {

        console.log(this.files);
        var files = this.files;
        var element;
        var supportedImages = ["image/jpeg", "image/png", "image/gif"];
        var seEncontraronElementoNoValidos = false;
        var seEncontraronElmentosPesados = false;
        //i < files.length
        for (var i = 0; i < 1; i++) {
            element = files[i];
            console.log(files[i].size)
            //Comprobaremos que no supere las 5mb para que pueda ser procesado por Rekognition
            if (files[i].size<5123179){
                // createPreview(element);
                console.log("Tamaño de archivo permitido")
            }else{
                console.log("Tamaño de archivo NO permitido")
                seEncontraronElmentosPesados = true;
                break;
            }
            if (supportedImages.indexOf(element.type) != -1) {
                createPreview(element);
                console.log('Tipo de archivo permitido')
                $('#add-photo').parent().css({'display':'none'});
            }
            else {
                seEncontraronElementoNoValidos = true;
                console.log('Tipo de archivo NO permitido')
                break;
            }
        }
        if (seEncontraronElmentosPesados) {
            window.alert("El archivo es muy pesado");
        }
        else if (seEncontraronElementoNoValidos){
            showMessage("El tipo de archivo no es valido.");
            setTimeout(function(){
                if (($(".modal-main").hasClass("modal-main") || $(".modal-main").hasClass("close-modal")) && $("#loading").css("display") == "none") {
                    console.log("Se ejecutara la funcion CLOSEMODAL");
                    closeModal();
                }
            },1000);
        }
        else {
            //SALTA EL MENSAJE CUANDO SE LOGRA SUBIR CORRACTEMENTE TODO, Y LUEGO SE LE AÑADIRA QUE CIERRE EL MENSAJE
            //LUEGO DE UN 1 SEGUNDO
            showMessage("El archivo se subio correctamente.");
            setTimeout(function(){
                if (($(".modal-main").hasClass("modal-main") || $(".modal-main").hasClass("close-modal")) && $("#loading").css("display") == "none") {
                    console.log("Se ejecutara la funcion CLOSEMODAL");
                    closeModal();
                }
            },1000);
        }
    });

    $(document).on("change", "#add-new-photo2", function () {
        console.log(this.files);
        var files = this.files;
        var element;
        var supportedImages = ["image/jpeg", "image/png", "image/gif"];
        var seEncontraronElementoNoValidos = false;
        var seEncontraronElmentosPesados = false;

        //files.length
        for (var i = 0; i < 1; i++) {
            element = files[i];
            //Comprobaremos que no supere las 5mb para que pueda ser procesado por Rekognition
            if (files[i].size<5123179){
                console.log("Tamaño de archivo permitido")
            }else{
                console.log("Tamaño de archivo NO permitido")
                seEncontraronElmentosPesados = true;
                break;
            }
            if (supportedImages.indexOf(element.type) != -1) {
                createPreview2(element);
                console.log("Tipo de archivo permitido")
                $('#add-photo2').parent().css({'display':'none',}); 
            }
            else {
                seEncontraronElementoNoValidos = true;
                console.log("Tipo de archivo NO permitido");
                break;
            }
        }

        if (seEncontraronElmentosPesados) {
            window.alert("El archivo es muy pesado")
        }
        else if(seEncontraronElementoNoValidos){
            showMessage("El tipo de archivo no es valido.");
            setTimeout(function(){
                if (($(".modal-main").hasClass("modal-main") || $(".modal-main").hasClass("close-modal")) && $("#loading").css("display") == "none") {
                    console.log("Se ejecutara la funcion CLOSEMODAL");
                    closeModal();
                }
            },1000);
        }
        else {
            showMessage("La imagen se subio correctamente.");
            setTimeout(function(){
                if (($(".modal-main").hasClass("modal-main") || $(".modal-main").hasClass("close-modal")) && $("#loading").css("display") == "none") {
                    console.log("Se ejecutara la funcion CLOSEMODAL");
                    closeModal();
                }
            },1000);
        }
    });
    // -> Cachamos el evento change

    // ELIMINAR LAS PREVISUALIZACIONES DE LAS IMAGENES
    $(document).on("click", "#Images .image-container", function(e){
        $(this).parent().remove();
        $('#add-photo').parent().css({'display':'',}); 
        //document.getElementById("opResult").innerHTML = ``;   
        location.reload();
        //console.log(imageBytesL);
    });

    $(document).on("click", "#Images .image-container2", function(e){
        $(this).parent().remove();
        $('#add-photo2').parent().css({'display':'',});
        //document.getElementById("opResult").innerHTML = ``;
        location.reload();
        //console.log(imageBytesL);
    });
});