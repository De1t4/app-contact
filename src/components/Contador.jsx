import React, { useState } from "react";

export default function Contador(){
    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [lista, setLista] = useState([])

    const registrarDatos = (e) =>{
    e.preventDefault()
    if(!nombre.trim()){
    console.log("Nombre vacio")
    return
    }
    if(!apellido.trim()){
    console.log("Apellido vacio")
    return
    }
    console.log("Los datos son los siguientes... "+ nombre + " " + apellido)


    setLista(
    [
        ...lista, {nombre: nombre, apellido: apellido}
    ]
    )

    setNombre('')
    setApellido('')
    e.target.reset()
    }
    return (
    <div className="App" style={{textAlign: 'initial'}}>
        <h1>Formalario</h1>
        <form onSubmit={registrarDatos}>
        <label style={{display: 'block'}}>Nombre: </label>
        <input
            onChange={(e)=> setNombre(e.target.value)}
        />
        <label style={{display: 'block'}}>Apellido:</label>
        <input
            onChange={(e)=> setApellido(e.target.value)}
        />
        <button style={{display: 'block'}}>Subir Datos</button>
        </form>
        <ul>
        {
            lista.map((datos, index)=>(
            <li key={index}>
                Hola mi nombre es: {datos.nombre} y mi apellido: {datos.apellido}
            </li>
            ))
        }
        </ul>
    </div>
    
    );
}