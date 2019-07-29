// ------- GOOGLE MAP ---- //
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 22.2822323, lng: 114.1524102},
    zoom: 18
  });

  const contentString = '<p class="color-secondary subheading">H CODE, LG / FLOOR, 45 POTTINGER STREET, CENTRAL</p>';

  let infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 300
  });

  let marker = new google.maps.Marker({
      position: {lat: 22.2822323, lng: 114.1524102},
      icon: 'img/icon/tell_camellia_marker.png',
      title: "Tell Camellia"
  });

  // To add the marker to the map, call setMap();
  marker.setMap(map);
  infowindow.open(map, marker);
  marker.addListener('click', () =>{
    infowindow.open(map, marker);
  });
}

$(function() {

  // ------- Carousel ---- //
  $('.carousel').carousel({
    touch: true,
  });

  // ------- AOS animation ------ //
  AOS.init({
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    easing: 'ease',
    offset: 200,
    once: true,
  });

  // ------- RELLAX ------ //
  const rellax = new Rellax('.rellax', {
    center: true,
  });

  // ------- JQUERY PARALLAX ---- //
  function initParallax() {
    $('#home').parallax("100%", 0.1);
    $('#image1').parallax("100%", 0.2);
    $('#image2').parallax("100%", 0.2);
    $('#image3').parallax("100%", 0.2);
  }
  if (window.innerWidth > 800 && window.innerHeight > 600) {
    initParallax();
  }

  // ------- form validation ---- //
  const validation = new Validation();

  // ------- modal messages ---- //
  const successMessage = `<p>Thank you for subscribing to Tell Camellia!</p>
  <p>Be sure to check out your email for the latest news and event updates.</p>`;
  const failureMessage = '<p>Subscription failed! Please check your Internet connection!</p>';
  const emptyFieldMessage = '<p>Please check to see that the form is complete!</p>';
  const invalidTypeMessage = '<p>Please provide valid context!</p>';

  // ------- Subscription form ---- //
  $('#subscription').submit(async (e) =>{
    e.preventDefault();
    let $form = $(this);
    const email = $form.find("input[name='email']").val();
    const validate = await validation.validateSubscription(email);
    // clear modal appended modal messages
    $('#modal-message').empty();

    switch (validate) {
      case 'empty field':
        $('#modal-message').append(emptyFieldMessage);
        $('#modal').modal('show');
        break;
      case 'invalid email':
        $('#modal-message').append(invalidTypeMessage);
        $('#modal').modal('show');
        break;
      case true:
        $.ajax({
          type: 'POST',
          url: 'script/subscribe.php',
          data: { email },
          success: () => {
            $('#modal-message').append(successMessage);
            $('#modal').modal('show');
          },
          error: () => {
            $('#modal-message').append(failureMessage);
            $('#modal').modal('show');
          }
        });
        break;
    }
  });

  // ------- Message form ---- //
  $('#message').submit(async (e) =>{
    e.preventDefault();
    let $form = $(this);
    const name = $form.find("input[name='name']").val();
    const email = $form.find("input[name='email2']").val();
    const message = $form.find("textarea[name='message']").val();
    const validate = await validation.validateMessage(name, email, message);
    // clear modal appended modal messages
    $('#modal-message').empty();

    switch (validate) {
      case 'empty field':
        $('#modal-message').append(emptyFieldMessage);
        $('#modal').modal('show');
        break;
      case 'invalid name':
        $('#modal-message').append(invalidTypeMessage);
        $('#modal').modal('show');
        break;
      case 'invalid email':
        $('#modal-message').append(invalidTypeMessage);
        $('#modal').modal('show');
        break;
      case 'invalid message':
        $('#modal-message').append(invalidTypeMessage);
        $('#modal').modal('show');
        break;
      case true:
        $.ajax({
          type: 'POST',
          url: 'script/message.php',
          data: { name, email, message },
          success: () => {
            $('#modal-message').append(successMessage);
            $('#modal').modal('show');
          },
          error: () => {
            $('#modal-message').append(failureMessage);
            $('#modal').modal('show');
          }
        });
        break;
    }
  });

});
