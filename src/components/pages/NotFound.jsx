import notFoundImage from "../../assets/404.webp";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={notFoundImage} alt="Erreur 404" />
    </div>
  );
};

export default NotFound;
