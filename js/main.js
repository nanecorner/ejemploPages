(function() {
  emailjs.init('rEkiW8fWxuKIjsn4b');
})();

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
  var name = document.getElementById('name').value;
  var mail = document.getElementById('mail').value;
  var number = '+52' + document.getElementById('number').value;
  const NUMBER = '+524422306467'

  fetch('https://thawing-mesa-75969-77a2012df85e.herokuapp.com/send-whatsapp', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          to: NUMBER,
          body: `Hola ${name}, pronto alguno de nuestros asesores se comunicara contigo al ${number}. Crea tu cuenta en https://nanecorner.github.io/home.html. Saludos de parte del team DiploTech.`
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          document.getElementById('confirmationMessage').style.display = 'block';
          setTimeout(function() {
              document.getElementById('confirmationMessage').style.display = 'none';
          }, 10000);
      } else {
          console.error('Error al enviar el mensaje de WhatsApp');
      }
  })
  .catch(error => console.error('Error:', error));

  emailjs.send('service_useswcj', 'template_zpib4p7', {
      to_name: name,
      to_mail: mail
  }).then(function(response) {
      console.log('Correo enviado exitosamente!', response.status, response.text);
      document.getElementById('name').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('mail').value = '';
      document.getElementById('number').value = '';

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
