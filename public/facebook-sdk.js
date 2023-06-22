/* global FB */

window.fbAsyncInit = function() {
  FB.init({
    appId: '3582555598695211',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v17.0'
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
