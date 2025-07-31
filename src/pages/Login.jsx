import "../styles/Login.css"
import { useState } from "react"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import imagen from "../img/img-icono.png"

export default function Login() {
  const navigate = useNavigate()
  const [correo, setCorreo]   = useState("")
  const [password, setPassword] = useState("") // ← agregado

  const mostrarAlerta = (msg = "Debe rellenar correctamente la casilla!") =>
    Swal.fire({ title: "Atención!", text: msg, icon: "error", confirmButtonText: "Entendido" })

  const CambiarCorreo = (e) => setCorreo(e.target.value)    
  const CambiarPass = (e) => setPassword(e.target.value)

  const Enviar = async (e) => {
    e.preventDefault()
    if (!correo || !password)
        return mostrarAlerta("Completa correo y contraseña.")

    try {
      const { data } = await axios.post(
        "https://reqres.in/api/login",
        { email: correo, password },                       
        { headers: { "x-api-key": "reqres-free-v1" }, withCredentials: false }
      )
      // Éxito: data.token existe
      await Swal.fire({ title: "¡Listo!", text: "Sesión iniciada correctamente.", icon: "success" })
      navigate("/Dashboard", { replace: true, state: { correo,password, token: data.token } })
    } catch (err) {
      const status = err.response?.status
      const msg = err.response?.data?.error || err.message || "Error desconocido"
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
            <input className="correo" type="email" onChange={CambiarCorreo} value={correo} placeholder="Correo" />

             <label>Password</label>
            <input className="password" type="password" onChange={CambiarPass} value={password} placeholder="Contraseña" />
          </div>

          <div className="inputs-2">
            <input type="checkbox" />
            <p>Stay signed in for 2 weeks</p>
          </div>
          <button className="btn" type="submit">Log In</button>
          <a>Forgot your password?</a>
        </div>
      </form>
    </div>
  )
}
