import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

const AuthNav = () => {
  return (
    <div className={css.authNav}>
      <NavLink
        className={({ isActive }) =>
          clsx(css.navLink, isActive && css.activeLink)
        }
        to="/register"
      >
        Register
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          clsx(css.navLink, isActive && css.activeLink)
        }
        to="/login"
      >
        {" "}
        Login
      </NavLink>{" "}
    </div>
  );
};
export default AuthNav;
