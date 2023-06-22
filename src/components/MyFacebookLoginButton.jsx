
import {createButton} from "react-social-login-buttons";

const config = {
  text: "Iniciar sesión con Facebook",
  icon: "facebook",
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998" },
  activeStyle: { backgrounds: "#293e69" }
};
/** My Facebook login button. */
const MyFacebookLoginButton = createButton(config);

export default MyFacebookLoginButton;