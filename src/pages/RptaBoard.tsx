import { useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Users } from "../class/Users"

export default function RptaBoard() {
  const location = useLocation()
  const { name, job, id, createdAt } = location.state || {}
  const [usuarios, setUsuarios] = useState<Users[]>([]);
  const navigate = useNavigate(); 
  

  useEffect(() => {
    const RecuperarUsuario : Users[] = JSON.parse(localStorage.getItem("usuarios") || "[]");

    if (name && job && id && createdAt) {

      const nuevo = new Users(name, job)
      nuevo.UserCompleto(name, job, id, createdAt)

      const actualizados = [...RecuperarUsuario, nuevo];
        localStorage.setItem("usuarios", JSON.stringify(actualizados));
        setUsuarios(actualizados);
    } else {
      setUsuarios(RecuperarUsuario);
    }
  }, [])

  const eliminarUsuario = (id: string) => {
  const nuevosUsuarios = usuarios.filter(u => u.id !== id);
  setUsuarios(nuevosUsuarios);
  localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
}
const editarUsuario= (id : string) =>{
  const usuarioAEditar = usuarios.find(u => u.id === id)
  if (usuarioAEditar) {
    localStorage.setItem("editados", JSON.stringify(usuarioAEditar));
    navigate("/Dashboard");
}
}

  if(usuarios.length === 0) {
    return <div className="mini-container rpta-vacia">
      <h1>Lista</h1>
      <p>VACÍO</p>
      </div>
  }

  return (

      <div className="formulario-rpta">
        <h1>Lista</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Password</th>
              <th>CreatedAt</th>
              <th>ㅤ</th>
              <th>ㅤ</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) =>(
             <tr key={usuario.id!}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.job}</td>
              <td>{usuario.createdAt}</td>
              <td><button className="btn-funcion" onClick={() => eliminarUsuario(usuario.id!)}>💥</button></td>
              <td><button className="btn-funcion" onClick={() => editarUsuario(usuario.id!)}>📨</button></td>
            </tr>  ))}
          </tbody>
        </table>
      </div>
 
  );
}

