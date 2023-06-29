
export function handleRegister() {
  localStorage.removeItem('loggedInUser');
}

export function handleFacebookLogin() {
  if (!window.FB) return;
  window.FB.login(function(response) {
    if (!window.FB) return;

    if (response.status === 'connected') {
      facebookLoginCallback(response);
    } else {
      window.FB.login(facebookLoginCallback, { scope: 'public_profile,email' });
    }
  }, { scope: 'public_profile' });
}
const facebookLoginCallback = (response) => {
  if(response.status === 'connected') {
    window.FB.api('/me', { fields: 'id, name, email, picture.type{small, large}{url}' }, function(userData)  {
      const { id, name, picture } = userData;
      const user = { id, name, picture: picture.data.url };
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Utiliza la clave 'loggedInUser'
    });
  }
}


