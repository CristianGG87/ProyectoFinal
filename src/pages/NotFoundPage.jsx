import { Link } from "react-router-dom";
import Header from "../components/Header";
export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <section>
        <h1>Not Found </h1>
        <Link to={"/"}> Volver al inicio </Link>
      </section>
    </>
  );
};
