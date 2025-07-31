import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios" 
export default function RptaBoard() {
  const location = useLocation()
  const { correo, password } = location.state || {}
  const [email, setEmail] = useState("")
  const [fixedPassword] = useState(password || "")
  const [id, setId] = useState("")          
  const [createdAt, setCreatedAt] = useState("") 
  
  useEffect(() => {
    if (!correo || !password) return
    axios.post(
      "https://reqres.in/api/users",
      { name: correo, job: password }, 
      { headers: { "x-api-key": "reqres-free-v1" }, withCredentials: false }
    )
    .then(({ data }) => {
      setId(data.id)
      setCreatedAt(data.createdAt)
      console.log(data)
    })
    .catch(console.error)
  }, [correo, password])

  if (!correo) {
    return <p>No hay datos</p>
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
            <tr>{correo}</tr>
            <tr>{password}</tr>
            <tr>{id}</tr>
            <tr>{createdAt}</tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}