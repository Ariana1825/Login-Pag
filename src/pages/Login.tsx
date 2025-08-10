import "../styles/Login.css"
import { useState} from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import imagen from "../img/img-icono.png"
import type { AxiosError } from "axios"
import { UserService } from "../services/UserService"
import { Login as LoginAPI } from "../class/Login"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail]   = useState("")
  const [password, setPassword] = useState("")

  const mostrarAlerta = (msg = "Debe rellenar correctamente la casilla!") =>
    Swal.fire({ title: "Atención!", text: msg, icon: "error", confirmButtonText: "Entendido" })

  const CambiarCorreo = (ev : React.ChangeEvent<HTMLInputElement> ) => {setEmail(ev.target.value)}
  const CambiarPass = (ev : React.ChangeEvent<HTMLInputElement> ) => {setPassword(ev.target.value)}

  const Enviar = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (!email || !password)
        return mostrarAlerta("Completa correo y contraseña.")

    try {
      const objetoLogin = new LoginAPI(email, password)
      const token = await UserService.login(objetoLogin)
      localStorage.setItem("Token", token.token)

      await Swal.fire({ title: "¡Listo!", text: "Sesión iniciada correctamente.", icon: "success"})
      navigate("/Dashboard", { replace: true, state: { email, password } })
    } catch (error) {
      const err = error as AxiosError;
      const status = err.response?.status;
      const msg = (err.response?.data as any)?.error || err.message || "Error desconocido"
      mostrarAlerta(`Error ${status ?? ""}: ${msg}`)
    }
    
  }

  return (
    <div style={{ display: "flex" }}>
      <form onSubmit={Enviar} className="container-1">

        <div className="compra">
          <img src={imagen}></img>
                    <h3 className="title">Log In</h3>
                    <p className="p3">Don't have an account?
                        <a>Create an account.</a>
                    </p>

          <div className="inputs-1">

            <label>Email Adress</label>
            <input className="correo" type="email" onChange={CambiarCorreo} value={email} placeholder="Correo" />

             <label>Password</label>
            <input className="password" type="password" onChange={CambiarPass} value={password} placeholder="Contraseña" />
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
  )
}
