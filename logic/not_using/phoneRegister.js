const admin = require('firebase-admin');
const serviceAccount = require('./honeyfather-35f32-firebase-adminsdk-d6gcc-dabdcf3046.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://honeyfather-35f32.firebaseio.com', // Replace with your database URL
});

function checkCode(phoneNumber) {
  // You can set up reCAPTCHA verification options here if needed
  const recaptchaOptions = {};

  admin.auth().signInWithPhoneNumber(phoneNumber, new admin.auth.RecaptchaVerifier('recaptcha-container', recaptchaOptions))
    .then((confirmationResult) => {
      const code = prompt('Enter the code sent to your phone:');
      return confirmationResult.confirm(code);
    })
    .then((result) => {
      console.log('User signed in:', result.user);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

module.exports = { checkCode };
