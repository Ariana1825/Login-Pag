import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface LocationState {
  correo?: string;
  password?: string;
}

interface ApiResponse {
  id: string;
  createdAt: string;
}

export default function RptaBoard() {
  const location = useLocation();
  const { correo, password } = (location.state || {}) as LocationState;
  const [id, setId] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");

  useEffect(() => {
    if (!correo || !password) return;

    axios
      .post<ApiResponse>(
        "https://reqres.in/api/users",
        { name: correo, job: password },
        { headers: { "x-api-key": "reqres-free-v1" }, withCredentials: false }
      )
      .then(({ data }) => {
        setId(data.id);
        setCreatedAt(data.createdAt);
        console.log(data);
      })
      .catch(console.error);
  }, [correo, password]);

  if (!correo) {
    return <p>No hay datos</p>;
  }

  return (
    <div className="mini-container form">
      <div className="formulario-rpta">
        <table>
          <thead>
            <tr>
              <th>Respuesta del Dashboard</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Correo:</strong> {correo}</td></tr>
            <tr><td><strong>Contraseña:</strong> {password}</td></tr>
            <tr><td><strong>ID generado:</strong> {id}</td></tr>
            <tr><td><strong>Creado en:</strong> {createdAt}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
