import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import type { ChangeEvent, FormEvent } from "react"
import { AxiosError } from "axios"
import { login } from "../services/users";
import '../styles/DashBoard.css'
import userimg from "../img/avatar.png"
import menu from '../img/menu.png'


interface LocationState {
  correo?: string;
  password?: string;
}

export default function DashBoard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { correo, password } = (location.state || {}) as LocationState

  const correito = correo ? correo.toLowerCase() : ""
  const [email, setEmail] = useState<string>("")
  const [contraseña, setContraseña] = useState<string>("")
  const [mostrar, setMostrar] = useState<boolean>(false)

  const mostrarAlerta = (msg: string) => window.alert(msg)

  useEffect(() => {
    if (!correo || !password) {
      navigate("/Login", { replace: true })
    }
  }, [correo, password, navigate])

  const Cambiar = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const CambiarContra = (e: ChangeEvent<HTMLInputElement>) => {
    setContraseña(e.target.value)
  }

  const Enviar = async (e: FormEvent) => {
  e.preventDefault()

  if (!correo || !password) return mostrarAlerta("Completa correo y contraseña.")

  try {
    const data = await login(email, contraseña);

    navigate("rptaboard", {
      replace: true,
      state: { correo: email, password: contraseña, token: data.token },
    })
  } catch (err) {
    const error = err as AxiosError
    const status = error.response?.status
    const msg =
      (error.response?.data as any)?.error || error.message || "Error desconocido"
    mostrarAlerta(`Error ${status ?? ""}: ${msg}`)
  }

  setMostrar(false)
}

  const formulario = () => {
    setMostrar(true)
  };

  return (
    <div className="container">
      <div className="menu">
        <div className="perfil">
          <img className="user-img" src={userimg} alt="Avatar de usuario" />
          <h1>USUARIO</h1>
          <h3>{correito}</h3>
        </div>
        <div className="menu-2">
          <button onClick={formulario}>Email</button>
          <a href="#">Home</a>
          <a href="#">Messages</a>
          <a href="#">Notification</a>
          <a href="#">Location</a>
          <a href="#">Graph</a>
        </div>
      </div>

      <div className="dashboard">
        <div className="dash-1">
          <h1>Dashboard User</h1>
          <img className="menu-img" src={menu} alt="Menú" />
        </div>

        <div className="dash-2">
          {mostrar && (
            <div className="mini-container">
              <form className="formulario" onSubmit={Enviar}>
                <label>Añade tu correo electrónico.</label>
                <input
                  type="email"
                  onChange={Cambiar}
                  value={email}
                  required
                />
                <label>Añade tu contraseña.</label>
                <input
                  type="password"
                  onChange={CambiarContra}
                  value={contraseña}
                  required
                />
                <button type="submit">Mandar</button>
              </form>
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
