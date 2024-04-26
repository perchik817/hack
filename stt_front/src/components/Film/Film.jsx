import { Link } from "react-router-dom";
import classes from "./Film.module.scss";

const Film = (props) => {
  const { imgUrl, title, id } = props;

  return (
    <Link to={`/videodetail/${id}`} className={classes.Film}>
      <img src={imgUrl} alt="poster" className={classes.Film__poster} />
      <h3 className={classes.Film__title}>{title}</h3>
    </Link>
  );
};

export default Film;
