import { useContext, useState } from "react";
import { loginUserService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    
    try {
      const data = await loginUserService({email, password});

      login(data);
      navigate("/");
    } catch (error) {
        setError(error.message)
    }
  }

  return (
    <section>
      <h1>Iniciar Sesion</h1>
      <form onSubmit={handleForm}> 
        <fieldset>
          <label htmlFor="email">Correo electronico: </label>
          <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Contraseña: </label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
        </fieldset>
        <button>Iniciar Sesion</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
