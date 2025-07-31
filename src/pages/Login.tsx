import "../styles/Login.css"
import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import imagen from "../img/img-icono.png"


interface LoginResponse {
  token: string;
}

export default function Login() {
  const navigate = useNavigate()

  const [correo, setCorreo] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const mostrarAlerta = (msg = "Debe rellenar correctamente la casilla!") =>
    Swal.fire({
      title: "Atención!",
      text: msg,
      icon: "error",
      confirmButtonText: "Entendido",
    });

  const CambiarCorreo = (e: ChangeEvent<HTMLInputElement>) => setCorreo(e.target.value)
  const CambiarPass = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const Enviar = async (e: FormEvent) => {
    e.preventDefault()

    if (!correo || !password) {
      return mostrarAlerta("Completa correo y contraseña.")
    }

    try {
      const { data } = await axios.post<LoginResponse>(
        "https://reqres.in/api/login",
        { email: correo, password },
        {
          headers: { "x-api-key": "reqres-free-v1" },
          withCredentials: false,
        }
      );

      await Swal.fire({
        title: "¡Listo!",
        text: "Sesión iniciada correctamente.",
        icon: "success",
      });

      navigate("/Dashboard", {
        replace: true,
        state: { correo, password, token: data.token },
      });
    } catch (err) {
      const error = err as AxiosError
      const status = error.response?.status
      const msg =
        (error.response?.data as any)?.error || error.message || "Error desconocido";
      mostrarAlerta(`Error ${status ?? ""}: ${msg}`)
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <form onSubmit={Enviar} className="container-1">
        <div className="compra">
          <img src={imagen} alt="Ícono" />

          <h3 className="title">Log In</h3>

          <p className="p3">
            Don't have an account?
            <a href="#"> Create an account.</a>
          </p>

          <div className="inputs-1">
            <label>Email Address</label>
            <input
              className="correo"
              type="email"
              onChange={CambiarCorreo}
              value={correo}
              placeholder="Correo"
              required
            />

            <label>Password</label>
            <input
              className="password"
              type="password"
              onChange={CambiarPass}
              value={password}
              placeholder="Contraseña"
              required
            />
          </div>

          <div className="inputs-2">
            <input type="checkbox" />
            <p>Stay signed in for 2 weeks</p>
          </div>

          <button className="btn" type="submit">Log In</button>
          <a href="#">Forgot your password?</a>
        </div>
      </form>
    </div>
  );
}
