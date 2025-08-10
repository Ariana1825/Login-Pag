import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import type { ChangeEvent, FormEvent } from "react";
import { AxiosError } from "axios";
import { UserService } from "../services/UserService";
import "../styles/DashBoard.css";
import userimg from "../img/avatar.png";
import menu from "../img/menu.png";
import { Users } from "../class/Users";

export default function DashBoard() {
  const location = useLocation();
  const { email } = location.state || {};
  const correito = email ? email.toLowerCase() : "";

  const [correo, setCorreo] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [mostrar, setMostrar] = useState<boolean>(() => {
    const guardado = localStorage.getItem("mostrarFormulario");
    return guardado === "true";
  });
  const [usuarios, setUsuarios] = useState<Users[]>([]);

  const navigate = useNavigate();

  const mostrarAlerta = (msg: string) => window.alert(msg);

  // Cargar usuarios y posible usuario a editar
  useEffect(() => {
    const listaGuardada = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (Array.isArray(listaGuardada)) setUsuarios(listaGuardada);

    const editado = localStorage.getItem("editados");
    if (editado) {
      const usuarioEdit = JSON.parse(editado);
      setCorreo(usuarioEdit.name || "");
      setContraseña(usuarioEdit.job || "");
    }
  }, []);

  // Verificar token
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/Login", { replace: true });
    }
  }, [navigate]);

  const Cambiar = (ev: ChangeEvent<HTMLInputElement>) =>
    setCorreo(ev.target.value);

  const CambiarContra = (ev: ChangeEvent<HTMLInputElement>) =>
    setContraseña(ev.target.value);

  const Enviar = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!correo || !contraseña)
      return mostrarAlerta("Completa correo y contraseña");

    try {
      const objetoUser = new Users(correo, contraseña);
      const response = await UserService.CrearUser(objetoUser);

      if (response) {
        let lista = JSON.parse(localStorage.getItem("usuarios") || "[]");
        if (!Array.isArray(lista)) lista = [];

        const editado = localStorage.getItem("editados");
        if (editado) {
          // Modo edición: reemplazar usuario existente
          const usuarioEdit = JSON.parse(editado);
          lista = lista.map((u: any) =>
            u.id === usuarioEdit.id
              ? { ...u, name: correo, job: contraseña }
              : u
          );
          localStorage.removeItem("editados");
        } else {
          // Modo nuevo: solo agregar si el ID no existe
          if (!lista.some((u: any) => u.id === response.id)) {
            lista.push(response);
          } else {
            return mostrarAlerta("Este usuario ya existe.");
          }
        }

        localStorage.setItem("usuarios", JSON.stringify(lista));
        navigate("rptaboard", { replace: true });
        window.location.reload();
      }
    } catch (err) {
      const error = err as AxiosError;
      const status = error.response?.status;
      const msg =
        (error.response?.data as any)?.error ||
        error.message ||
        "Error desconocido";
      mostrarAlerta(`Error ${status ?? ""}: ${msg}`);
    }
  };

  const formulario = () => {
    const nuevoEstado = !mostrar;
    setMostrar(nuevoEstado);
    localStorage.setItem("mostrarFormulario", String(nuevoEstado));
  };

  return (
    <div className="container">
      <div className="menu">
        <div className="perfil">
          <img className="user-img" src={userimg}></img>
          <h1>USUARIO</h1>
          <h3>{correito}</h3>
        </div>
        <div className="menu-2">
          <button onClick={formulario}>Email</button>
          <a>Home</a>
          <a>messages</a>
          <a>notification</a>
          <a>location</a>
          <button
            onClick={() => {
              localStorage.removeItem("usuarios");
              window.location.reload();
            }}
          >
            Clear LocalStorage
          </button>
        </div>
      </div>

      <div className="dashboard">
        <div className="dash-1">
          <h1>Dashboard User</h1>
          <img className="menu-img" src={menu}></img>
        </div>
        <div className="dash-2">
          {mostrar && (
            <div className="mini-container">
              <form className="formulario" onSubmit={Enviar}>
                <label>Añade tu correo electrónico.</label>
                <input
                  type="email"
                  onChange={Cambiar}
                  value={correo}
                ></input>
                <label>Añade tu contraseña.</label>
                <input
                  type="password"
                  onChange={CambiarContra}
                  value={contraseña}
                ></input>
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
