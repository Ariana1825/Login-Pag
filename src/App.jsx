import { BrowserRouter,Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx"
import DashBoard from "./pages/DashBoard.jsx"
import RptaBoard from "./pages/RptaBoard.jsx"



function App(){
    
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/Login" element= {<Login />}/>
            <Route path="/Dashboard" element={<DashBoard />}>
            <Route path="rptaboard" element={<RptaBoard />} />
            </Route>
        </Routes>
        </BrowserRouter>
        
    )
}
export default App