document.getElementById("add-new-photo").addEventListener("change",function(event){Buff_IMG1();},false);
document.getElementById("add-new-photo2").addEventListener("change",function(event){Buff_IMG2();},false);
document.getElementById("Button").addEventListener("click", function (event){ProcessImage();}, false);

    //VARAIBLE DONDE GUARDAREMOS LOS BUFFER DE LAS IMAGENES
    var imageBytesL=['',''];
    //FUNCION PARA TRATAR LA PRIMERA IMAGEN
    function Buff_IMG1(){
        var control = document.getElementById("add-new-photo");
        var file = control.files[0];
        if (file.size >= 5123179){
            // window.alert("La imagen pesa mas de 5mb")
            console.log("La imagen pesa mas de 5mbaaa");
        }else{
            var reader = new FileReader();
            reader.onload = (function (theFile){
                return function(e){
                    // 5123179
                    var img = document.createElement('img');
                    var image = null;
                    img.src = e.target.result;
                    var jpg = true;
                    try {
                        image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);
                    } catch (e) {
                        jpg = false;
                    }
                    if (jpg == false) {
                        try {
                        image = atob(e.target.result.split("data:image/png;base64,")[1]);
                        } catch (e) {
                        // alert("No es un archivo de imagen que Rekognition pueda procesar");
                        return;
                        }
                    }
                    var length = image.length;
                    imageBytes = new ArrayBuffer(length);
                    var ua = new Uint8Array(imageBytes);
                    for (var i = 0; i < length; i++) {
                        ua[i] = image.charCodeAt(i);
                    }
                    imageBytesL[0]=imageBytes;
                    // console.log("---> Buffer de la 1era IMAGEN");
                    //console.log(imageBytes);
                }
            })(file);
            reader.readAsDataURL(file);
            }
        
    }

    //FUNCION PARA TRATAR LA SEGUNDA IMAGEN
    function Buff_IMG2(){
        var control2 = document.getElementById("add-new-photo2");
        var file2 = control2.files[0];
        var reader2 = new FileReader();
        reader2.onload = (function (theFile){
            return function(e){
                var img = document.createElement('img');
                var image = null;
                img.src = e.target.result;
                var jpg = true;
                try {
                    image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);
                } catch (e) {
                    jpg = false;
                }
                if (jpg == false) {
                    try {
                        image = atob(e.target.result.split("data:image/png;base64,")[1]);
                    } catch (e) {
                    // alert("No es un archivo de imagen que Rekognition pueda procesar");
                    return;
                    }
                }
                var length = image.length;
                imageBytes = new ArrayBuffer(length);
                var ua = new Uint8Array(imageBytes);
                for (var i = 0; i < length; i++) {
                    ua[i] = image.charCodeAt(i);
                }
                imageBytesL[1] = imageBytes;
                // console.log("---> Buffer de la 2da IMAGEN");
                // console.log(imageBytes);
            }
        })(file2);
        reader2.readAsDataURL(file2);
    }

    //FUNCION QUE LLAMARA ALA FUNCION DE COMPARAR ROSTROS METIENDO LOS DOS PARAMETROS
    function ProcessImage() {
        AnonLog();
        Comparar_Rostros(imageBytesL[0],imageBytesL[1]);
    }

    //FUNCIONES QUE NECESITAMOS
    function Comparar_Rostros(buf,buf1){
        //console.log(buf);
        //console.log(buf1);

        const client = new AWS.Rekognition();
        const params = {
            SourceImage: {
                Bytes: buf
            },
            TargetImage: {
                Bytes: buf1
            },
            SimilarityThreshold: 0
        }
        client.compareFaces(params, function(err, response) {
            if (err) {
                console.log(err, err.stack); // an error occurred
            } else {
            var similarityL = []
            response.FaceMatches.forEach(data => {
                let position   = data.Face.BoundingBox
                let similarity = data.Similarity
                similarityL.push(similarity);
            }) // for response.faceDetails
            console.log(`La similitud es de: ${similarityL[0]}%`);
            // console.log(similarityL);
            console.log("Tipo de dato de similarity");

            console.log(typeof similarityL[0]);
            var  i = 0, text;
            similarity_str = similarityL[0].toString()
            similarity_str_sm = similarity_str.substring(0,4)
            text = `Resultado de la comparación: \n La semejanza es ${similarity_str_sm}%`;
            /* function typing(){
                if (i<text.length){
                    document.getElementById("opResult").innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing,20);
                }
            }
            typing(); */
            document.getElementById("opResult").innerHTML = `Resultado de la comparación: \n La semejanza es ${similarity_str_sm}%`;
            } // if
    });
};
    function AnonLog() {
        // Configure the credentials provider to use your identity pool
        AWS.config.region = 'us-east-1'; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-1:7e23fca7-de85-4b4a-9aaa-050f718a1efa',
        });
        // Make the call to obtain credentials
        AWS.config.credentials.get(function () {
        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
        });
  }