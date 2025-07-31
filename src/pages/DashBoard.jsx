import { useState , useEffect} from "react" 
import { Outlet } from "react-router-dom"
import "../styles/DashBoard.css"
import userimg from "../img/avatar.png"
import menu from "../img/menu.png"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import axios from "axios" // ← FIX: importar axios

export default function DashBoard(){
    const location = useLocation()
    const {correo, password} = location.state || {}
    let correito = correo ? correo.toLowerCase() : "";
    const [email, setEmail] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [mostrar, setMostrar] = useState(false)
    const navigate = useNavigate()

    const mostrarAlerta = (msg) => window.alert(msg) // ← FIX: definir función usada

    useEffect(() => {
        if (!correo || !password) {
        navigate("/Login", { replace: true });
    }
}, [navigate]);

    const Cambiar =(e)=>{
        setEmail(e.target.value)
    }
    const CambiarContra =(e)=>{
        setContraseña(e.target.value)
    }

    const Enviar = async (e) =>{ // ← FIX: async
        e.preventDefault()
        if (!correo || !password)
        return mostrarAlerta("Completa correo y contraseña.")

        try { // ← FIX: login correcto + api key
          const { data } = await axios.post(
           "https://reqres.in/api/login",
            { email, password: contraseña },
            { headers: { "x-api-key": "reqres-free-v1" }, withCredentials: false }
          )
          navigate("rptaboard", { 
            replace: true, 
            state: { correo: email, password: contraseña, token: data.token } 
          })
        } catch (err) {
          const status = err.response?.status
          const msg = err.response?.data?.error || err.message || "Error desconocido"
          mostrarAlerta(`Error ${status ?? ""}: ${msg}`)
        }
        setMostrar(false)
    }

    const formulario =()=>{
        setMostrar(true)
    }

    return (
        <div className="container">

            <div className="menu">
                <div className="perfil">
                    <img className="user-img"src={userimg}></img>
                    <h1>USUARIO</h1>
                    <h3>{correito}</h3>
                </div>
                <div className="menu-2">
                    <button onClick={formulario}>Email</button>
                    <a>Home</a>
                    <a>messages</a>
                    <a>notification</a>
                    <a>location</a>
                    <a>graph</a>
                </div>
            </div>

            <div className="dashboard">
                <div className="dash-1">
                    <h1>Dashboard User</h1>
                    <img className="menu-img"src={menu}></img>
                </div>
                <div className="dash-2">
                    {mostrar &&<div className="mini-container">
                        <form className="formulario"onSubmit={Enviar}>
                                <label>Añade tu correo electrónico.</label>
                                <input type="email" onChange={Cambiar} value={email}></input> {/* ← FIX: usar estado */}
                                <label>Añade tu contraseña.</label>
                                <input type="password" onChange={CambiarContra} value={contraseña}></input>
                                <button type="submit">Mandar</button>
                            </form>
                    </div>}
                    
                        <Outlet />
                    
                </div>
            </div>
        </div>
    )
}