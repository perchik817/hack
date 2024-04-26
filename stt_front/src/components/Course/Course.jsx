import classes from "./Course.module.scss";
import {Link} from "react-router-dom";

const Course = (props) => {

    return (
        <div className={classes.Course}>
            <h2 className={classes.Course__title}>А1 Начинающий уровень</h2>
            {/* eslint-disable-next-line react/prop-types */}
            {props.courses.map((item) => (
                <ul className={classes.Course__lessons} key={item.id}>
                    <li className={classes.lesson}>
                        <h3 className={classes.lesson__title}>{item.title}</h3>
                        <Link className={classes.lesson__link} to={`/coursedetail/${item.id}`}>
                            Изучить
                        </Link>
                    </li>
                </ul>
            ))}
        </div>
    );
};

export default Course;
