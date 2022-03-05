import { useState } from "react";
import loginApi from "../api/login";
import { useLocation, useNavigate } from "react-router";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    loginApi
      .login(username, password)
      .then((res) => {
        setLoading(false);
        const localStorage = window.localStorage;
        localStorage.setItem("user", JSON.stringify( res.data ));
        if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.error.message);
      });
  };
  return (
    <div className="login">
      <div className="uk-container">
        <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-center">
          <h3 className="uk-card-title">Login</h3>
          <form className="uk-form-stacked">
            <div className="uk-margin">
              { error && 
              <div data-uk-alert>{error}<a className="uk-alert-close" data-uk-close></a></div> }
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Username
              </label>
            </div>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="form-stacked-text">
                Password
              </label>
            </div>
            <div className="uk-margin">
              <input
                className="uk-input"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="uk-margin">
              <button
                className="uk-button uk-button-primary"
                onClick={(e) => handleSubmit(e)}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
