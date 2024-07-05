(function(){
    emailjs.init('rEkiW8fWxuKIjsn4b');
  })();
  
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    var name = document.getElementById('name');
    var lastName = document.getElementById('lastName');
    var mail = document.getElementById('mail');
    var number = document.getElementById('number');
  
    emailjs.send('service_useswcj', 'template_zpib4p7', {
      to_name: name.value,
      to_lastName: lastName.value,
      to_mail: mail.value,
      to_number: number.value
    }).then(function(response) {
      console.log('Correo enviado exitosamente!', response.status, response.text);
      name.value = '';
      lastName.value = '';
      mail.value = '';
      number.value = '';
  
      var confirmationMessage = document.getElementById('confirmationMessage');
      confirmationMessage.innerText = '¡Gracias! Tus datos se han enviado con éxito.';
      confirmationMessage.style.color = 'black';
      setTimeout(function() {
       confirmationMessage.style.color = '#EFFAF2';
       }, 10000);
    }, function(error) {
        console.log('Falló el envío del correo...', error);
        var confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.innerText = 'Ha ocurrido un problema. Por favor, intenta más tarde.';
        confirmationMessage.style.color = 'red';
        setTimeout(function() {
            confirmationMessage.style.color = '#EFFAF2';
            }, 10000);
    });
  });
  