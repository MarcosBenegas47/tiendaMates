"use Client"

import { Productos } from "@/Productos";

const DashboardClient = ({data}:{data:Productos[]})=>{
    
    return(
        <section>
            <table>
                <thead>
                <tr>
                    <th>
                        Id
                    </th>
                    <th>Codigo</th>
                    <th>
                        imagen        
                    </th>
                    <th>
                        Descripcion
                    </th>
                    <th>Precio</th>
                    <th> Categoria</th>

                </tr>
                </thead>
                <tbody>
                {data.map(elem => (
                    <tr key={elem.id}>
                        <td>
                            {elem.id}
                        </td>
                        <td>{elem.codigo}</td>
                        <td>imagen.img</td>
                        <td>
                            {elem.descripcion}
                        </td>
                        <td>
                            {elem.p_Unitario_final}
                        </td>
                        <td>{elem.categoria}</td>
                        <td>{elem.cantidad}</td>
                        
                    </tr>
                ))}
                </tbody>
                
            </table>
            
    
        </section>
    )
}
export default DashboardClient;

    
