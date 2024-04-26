import classes from "./Navbar.module.scss"
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={classes.Navbar}>
            <div>
                <ul className={classes.nav_logo}>
                    <li>
                        <NavLink to={"/"}><h4>KYRGYZ-AI</h4></NavLink>
                    </li>
                </ul>

                <ul className={classes.nav}>
                    <li>
                        <NavLink to={"/videopage"}>Видео</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/audiopage"}>Аудио</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/bookpage"}>Книги</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/coursepage"}>Уроки</NavLink>
                    </li>
                    {/*<li>*/}
                    {/*    <NavLink to={"/login"}>Войти</NavLink>*/}
                    {/*</li>*/}


                </ul>
            </div>
        </nav>
    )
}

export default Navbar