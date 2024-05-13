import { useState } from "react";
import { LOGO_LINK } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
    const [btnNameReact, setbtnNameReact] = useState("Login");
    const onlineStatus = useOnlineStatus();
    return (
        <div className="flex justify-between bg-pink-100 shadow-lg">
            <div className="logo-container">
                <img className="w-40" src={LOGO_LINK} />;
            </div>
            <div className="flex items-center">
                 <ul className="flex p-4 m-4">
                    <li className="px-4">Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
                    <li className="px-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/grocery">Grocery</Link>
                    </li>

                    <li>Cart</li>
                    <button 
                    className="login"
                    onClick={()=>{
                        btnNameReact === 'Login' ?
                        setbtnNameReact("Logout") :
                        setbtnNameReact("Login");
                    }}
                    >
                        {btnNameReact}</button>
                 </ul>
            </div>
        </div>
    )
}
export default Header;