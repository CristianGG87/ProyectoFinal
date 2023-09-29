import { useState } from 'react';
import { registerUserService } from '../services';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './RegisterPage.css';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [error, setError] = useState('');
    const handleForm = async (e) => {
        e.preventDefault();
        setError('');
        if (pass1 !== pass2) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            await registerUserService({ userName, email, password: pass1 });
            navigate('/login');
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <>
            <Header />
            <section className="register">
                <h1>Registro</h1>
                <form onSubmit={handleForm} className="register-form">
                    <fieldset>
                        <label htmlFor="userName">Nombre de usuario: </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            required
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email">Correo Electronico: </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="pass1">Contraseña: </label>
                        <input
                            type="password"
                            id="pass1"
                            name="pass1"
                            required
                            onChange={(e) => setPass1(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="pass2">Repita la contraseña: </label>
                        <input
                            type="password"
                            id="pass2"
                            name="pass2"
                            required
                            onChange={(e) => setPass2(e.target.value)}
                        />
                    </fieldset>
                    <button>Registrar</button>
                    {error ? <p>{error}</p> : null}
                </form>
            </section>
        </>
    );
};
