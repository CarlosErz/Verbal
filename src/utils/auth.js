export function handleRegister() {
  localStorage.removeItem('loggedInUser');
}

export function handleFacebookLogin() {
  if (!window.FB) return;

  window.FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      facebookLoginCallback(response.authResponse);
    } else {
      window.FB.login(function(loginResponse) {
        if (loginResponse.authResponse) {
          facebookLoginCallback(loginResponse.authResponse);
        } else {
          console.log('Facebook login failed.');
        }
      }, { scope: 'public_profile' });
    }
  });
}

const facebookLoginCallback = (authResponse) => {
  const { accessToken } = authResponse;
  localStorage.setItem('facebookAccessToken', accessToken);
  fetchUserData();
};

const fetchUserData = () => {
  window.FB.api('/me', { fields: 'id, name, picture.type{small, large}{url}' }, function(userData) {
    if (userData && !userData.error) {
      const { id, name, picture } = userData;
      const user = { id, name, picture: picture.data.url };
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
      console.log('Error fetching user data from Facebook API.');
    }
  });
};
