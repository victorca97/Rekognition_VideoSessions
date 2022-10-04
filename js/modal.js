//Funciones para mostrar el modal que dice si se cargo CORRECTAMENTE o NO una Imagen
function showModal(card) {
  $("#" + card).show();
  $(".modal").addClass("show");
}

function closeModal() {
  $(".modal").removeClass("show");
  console.log("Se remueve la clase show")
  setTimeout(function () {
    $(".modal .modal-card").hide();
    console.log("Se esconde el mensaje")
  }, 300);
}

// UTILIZA LAS OTRAS FUNCIONES
function loading(status, tag) {
  if (status) {
    $("#loading .tag").text(tag);
    showModal("loading");
  }
  else {
    closeModal();
  }
}

function showMessage(message) {
  $("#Message .tag").text(message);
  showModal("Message");
}