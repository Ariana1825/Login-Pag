import "../styles/ComprasDetalle.css"
import imgPago from "../img/pago.jpg"
import imgBanco from "../img/banco.jpg"

export default function ComprasDetalle(){
    //script 

    return (
        <div className="container-2">
            <div className="mini-container primero">
                <div className="cabeza">
                    <h2>Otro Monto</h2>
                    <i className="bi bi-exclamation-circle-fill"></i>
                </div>
                
                <p>Recuerda que para poder realizar adelanto de pago y pagos a capital tienes que estar al día en tus cuotas.</p>

                <img src={imgPago}></img>
                <button>¡Ingresar otro monto ahora!</button>
            </div>

            <div className="mini-container segundo">
                <h2>Hola 08998418, este es el detalle de tus cuotas.</h2>
                <p>Selecciona las que quieras cancelar a trabés de nuestros medio de pago en línea.</p>
                <p>Código de crédito 0008388534 - 000</p>
                <div className="pag">
                    <button>A pagar</button>
                    <p>Pagados</p>
                </div>
                <table className="tabla">
      <thead>
        <tr>
          <th>ㅤㅤㅤ</th>
          <th>Cuota</th>
          <th>Vencimiento</th>
          <th>Monto Total</th>
        </tr>
      </thead>

      <tbody>
        
          <tr>
            <td><input type="checkbox" ></input></td>
            <td>2</td>
            <td>10/07/2025</td>
            <td>1075.1</td>
          </tr>
          <tr>
            <td><input type="checkbox"></input></td>
            <td>3</td>
            <td>11/08/2025</td>
            <td>1075.1</td>
          </tr>
          <tr>
            <td><input type="checkbox"></input></td>
            <td>4</td>
            <td>10/09/2025</td>
            <td>1075.1</td>
          </tr>
          <tr>
            <td><input type="checkbox"></input></td>
            <td>5</td>
            <td>10/10/2025</td>
            <td>1075.1</td>
          </tr>
          <tr>
            <td><input type="checkbox"></input></td>
            <td>6</td>
            <td>10/10/2025</td>
            <td>1075.1</td>
          </tr>
          <tr>
            <td><input type="checkbox"></input></td>
            <td>7</td>
            <td>10/10/2025</td>
            <td>1075.1</td>
          </tr>
          <tr>
            <td><input type="checkbox"></input></td>
            <td>8</td>
            <td>10/10/2025</td>
            <td>1075.1</td>
          </tr>
          <tr>
            <td><input type="checkbox"></input></td>
            <td>9</td>
            <td>10/10/2025</td>
            <td>1075.1</td>
          </tr>
       
      </tbody>
    </table>

    <div className="mini-container cuarto">
                <div className="resumen">
                    <h2>Resumen</h2>
                    <p>1 Cuouta (ITF incluído)</p>
                </div>

                <div>
                    <h2>Total</h2>
                    <p>S/</p>
                    <p>1075.15</p>
                </div>
                <button>Pagar</button>
            </div>
            </div>

            <div className="mini-container tercero">
                 <div className="cabeza">
                    <h2>Cancelación Total</h2>
                    <i className="bi bi-exclamation-circle-fill"></i>
                </div>
                <p>Recuerda que para poder realizar adelanto de pago y pagos a capital tienes que estar al día en tus cuotas.</p>

                <img src={imgBanco}></img>
                <button>¡Ingresar otro monto ahora!</button>
            </div>

            
        </div>
    )
}