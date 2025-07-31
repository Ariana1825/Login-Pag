import "../styles/Pago.css"
import {useState} from "react"
import ComprasDetalle from "./ComprasDetalle"
import Swal from 'sweetalert2'

export default function Pago(){
    //Funciones que tendrá la página
    let dniVerificacion = "61152185"
    const [dni, setDni] = useState("")
    const [mostrar,setMostrar] = useState(false)

    const mostrarAlerta = () => {
    Swal.fire({
      title: 'Atención!',
      text: 'Debe rellenar correctamente la casilla!"',
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
  };
    
    const Cambiar = (e) =>{
        setDni(e.target.value)
    }

    const Comprar = (e) =>{
        e.preventDefault()
        if (!dni) {
            mostrarAlerta()
        } else if(dni === dniVerificacion){
            setMostrar(true);
        }
    }
return (
    <div style={{display: "flex"}}>
        {!mostrar && (
            <form  onSubmit={Comprar} className="container-1">
       
       { /* Parrafiño*/}
        <div className="parrafo">
            <p className="p1">Paga</p>
            <p className="p2">tu compra</p>
            <p className="descuento">Sin salir de casa</p>
        </div>

        { /* Compras */}
        <div className="compra">
            <h3 className="title">PAGA TU COMPRA AQUÍ</h3>
            <p className="p3">Hazlo de manera rápida, sencilla y 100% online.</p>
            <label className="numtel">Ingresa tu número de teléfono.</label>
            <div className="inputs-1">
                
                <input className="lista"list="pago" name="pago"/>
                <datalist id="pago">
                    <option value="Número"/>
                    <option value="DNI"/>       
                </datalist>
                
                <input className="num"type="text" onChange={Cambiar} value={dni}/>


            </div>
            <div className="inputs-2">
                <input type="checkbox"/>
                <p>He leído, comprendo y autorizo el <a>tratamiento de datos personales</a></p>
            </div>
            <div className="inputs-2">
                <input type="checkbox"/>
                <p >He leído, comprendo y autorizo los <a>Términos y Condiciones</a></p>
            </div>
            <button className="btn" type="submit">Comprar</button>
            <h4>¿Cómo funciona?</h4>
            <ul>
                <li>1. Revisa tu oferta o cuotas pendientes a cancelar.</li>
                <li>2. Selecciona el canal de pago.</li>
                <li>3. Realiza el pago a través del canal seleccionado.</li>
                <li>4. Consigue tu constancia de no adeudo (solo clientes que cancelen su crédito).</li>
            </ul>
        </div>
    </form>
    )}
    {mostrar && <ComprasDetalle />}
    </div>
    
    
    
)
}