import { NavLink,  BrowserRouter as Router, } from "react-router-dom";
const Header = () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    return (
        <div className="uk-navbar-container">
            <div className="uk-navbar-left">
                <div className="uk-navbar-item uk-logo">
                {userInfo ? 'Chào ' + userInfo.name : "Login"}  !
                </div>

                <ul className="uk-navbar-nav">
                    <li>
                    <NavLink to="/" className="uk-nav-link" >
                        Dashboard
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/sale" className="uk-nav-link" >
                        Bán hàng
                    </NavLink>
                    </li>
                    <li>
                    <NavLink to="/orders" className="uk-nav-link">
                        Đơn hàng
                    </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Header;