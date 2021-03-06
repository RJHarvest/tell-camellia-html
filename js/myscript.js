$(function() {

  // ------- Carousel ---- //
  $('.carousel').carousel({
    touch: true,
    interval: 4000,
    pause: false,
  });

  $('.carousel-testimonial').carousel({
    touch: true,
    pause: true,
  });

  $('.carousel-drink').carousel({
    touch: true,
    interval: 2500,
    pause: false,
  });

  // ------- AOS animation ------ //
  AOS.init({
    disable: 'mobile',
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    easing: 'ease',
    offset: 200,
    once: true,
  });

  // ------- JQUERY PARALLAX ---- //
  function initParallax() {
    $('#home').parallax("100%", 0.1);
    $('#image1').parallax("100%", 0.2);
    $('#image2').parallax("100%", 0.2);
    $('#image3').parallax("100%", 0.2);
    $('#aboutUs').parallax("100%", 0.1, 2);
    $('#menu').parallax("100%", 0.1, 2.4);
    $('#contact').parallax("100%", 0.1, 1.5);
  }

  if (window.innerWidth > 800 && window.innerHeight > 600) {
    initParallax();
    $('#image1').css('background-attachment', 'fixed');
    $('#image2').css('background-attachment', 'fixed');
    $('#image3').css('background-attachment', 'fixed');
    $('#aboutUs').css('background-attachment', 'fixed');
    $('#menu').css('background-attachment', 'fixed');
    $('#contact').css('background-attachment', 'fixed');
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
  $('#subscription').submit(function(e){
    e.preventDefault();
    let $form = $(this);
    const email = $form.find("input[name='email']").val();
    const validate = validation.validateSubscription(email);
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
          success: function() {
            $('#modal-message').append(successMessage);
            $('#modal').modal('show');
          },
          error: function() {
            $('#modal-message').append(failureMessage);
            $('#modal').modal('show');
          }
        });
        break;
    }
  });

  // ------- Message form ---- //
  $('#message').submit(function(e){
    e.preventDefault();
    let $form = $(this);
    const name = $form.find("input[name='name']").val();
    const email = $form.find("input[name='email2']").val();
    const message = $form.find("textarea[name='message']").val();
    const validate = validation.validateMessage(name, email, message);
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
          success: function() {
            $('#modal-message').append(successMessage);
            $('#modal').modal('show');
          },
          error: function() {
            $('#modal-message').append(failureMessage);
            $('#modal').modal('show');
          }
        });
        break;
    }
  });

});
