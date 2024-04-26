import classes from "./Courses.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import {api} from "../../store/requests/api.js";
import Course from "../Course/Course.jsx";

const Courses = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${api}/lesson/grammar`).then((response) => {
            setCourses(response.data)
        })
    }, []);

    console.log(courses)
    return (
        <div className={classes.Courses}>
            <Course courses={courses}/>
            {/*<div className={classes.Course}>*/}
            {/*    <h2 className={classes.Course__title}>eewrewr</h2>*/}
            {/*    {courses.map((item) => (*/}
            {/*        <ul className={classes.Course__lessons} key={item.id}>*/}

            {/*            <li className={classes.lesson}>*/}
            {/*                <h3 className={classes.lesson__title}>{item.title}</h3>*/}
            {/*                <Link className={classes.lesson__link} to={`/coursedetail/${item.id}`}>*/}
            {/*                    Изучить*/}
            {/*                </Link>*/}
            {/*            </li>*/}
            {/*        </ul>*/}
            {/*    ))}*/}
            {/*</div>*/}

        </div>
    );
};

export default Courses;
