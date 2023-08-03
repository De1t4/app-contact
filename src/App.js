import { useState } from 'react';
import './App.css';
import shortid from 'shortid';

function App(){
  const [ListaContacto, setListaContacto] = useState([])
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [telefono, setTelefono] = useState()
  const [email, setEmail] = useState()
  const [estado, setEstado] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState()
  const [imagen, setImagen] = useState("/images/defecto.png")
  const [estadoTema, setEstadoTema] = useState(false)

  const guardarContacto = (e) =>{
    e.preventDefault()

    if(!nombre || !nombre.trim() || !apellido || !apellido.trim() || !telefono || !telefono.trim() || !email || !email.trim()){
      return setEstado(true)
    }

    setListaContacto([
      ...ListaContacto, {id: shortid.generate(), nombre: nombre, apellido: apellido, telefono: telefono, email: email, imagen: imagen}
    ])
    setEstado(false)
    e.target.reset()
    setNombre('')
    setApellido('')
    setTelefono('')
    setEmail('')
    setImagen('/images/defecto.png')
  }
  const editarContacto = (datos) =>{
    setModoEdicion(true)
    setNombre(datos.nombre)
    setApellido(datos.apellido)
    setTelefono(datos.telefono)
    setEmail(datos.email)
    setId(datos.id)
    setImagen(datos.imagen)
  }

  const guardarModificacion = (e) =>{
    e.preventDefault()

    if(!nombre || !nombre.trim() || !apellido || !apellido.trim() || !telefono || !telefono.trim() || !email || !email.trim()){
      return setEstado(true)
    }

    const listaModificado = ListaContacto.map(datos => datos.id === id? {id, nombre, apellido, telefono, email, imagen}: datos)
    setListaContacto(listaModificado)
    setModoEdicion(false)
    setNombre("")
    setApellido("")
    setTelefono("")
    setEmail("")
    setImagen("/images/defecto.png")
    e.target.reset()
  }

  const eliminarContacto = (id) =>{
    const newLista = ListaContacto.filter(valor => valor.id !== id)
    setListaContacto(newLista)
  }

  const modificarImagen = (e) =>{
    const file = e.target.files[0]
    const nuevaImagen = URL.createObjectURL(file);
    setImagen(nuevaImagen)
  }

  const cambiarTema = () =>{
    setEstadoTema(!estadoTema);

  }

  return(
    <main class={estadoTema ? 'content-main-dark' : 'content-main-light'}>
      <div className="container mt-2 content-data">
        <div className='content-title' >
          <h1>CRUD APP</h1>
          <div className={`content-btn-dark ${estadoTema ? 'content-btn-light' : ''}`} onClick={cambiarTema}>
            <div className={estadoTema? 'btn-change-light': 'btn-change-dark'}></div>
          </div>
          {estadoTema ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/></svg>:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16"><path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>}
        </div>
        <hr/>
        <div className="row">
          <div className="col-8">
            <h4 className="text-center">Lista de Contactos</h4>
              <ul className="content-cards">
              { ListaContacto.length > 0 ? "": <h3>No hay contactos</h3>}
              {ListaContacto.map((datos, index)=>{
                return(
                  <li className="card-data" key={index}>
                    <div className={estadoTema ? 'card text-bg-dark': 'card text-bg-light'}>
                    <img src={datos.imagen} class="card-img-top imagen" alt="imagen-contacto" />
                      <div class="card-body">
                        <h5 class="card-title">Contacto ID: {datos.id}</h5>
                        <p class="card-text">Nombre: {datos.nombre}</p>
                        <p class="card-text">Apellido:{datos.apellido}</p>
                        <p class="card-text">Telefono: {datos.telefono}</p>
                        <p class="card-text">Email: {datos.email}</p>
                        <button className="btn btn-sm btn-danger float-right mx-2" onClick={()=>eliminarContacto(datos.id)}
                        >Eliminar</button>
                        <button className="btn btn-sm btn-warning float-right" onClick={()=>editarContacto(datos)}
                        > Editar</button>
                      </div>
                    </div>
                  </li>
                )
              })
              }
      
              </ul>
          </div>
          <div className="col-4">
            <h4 className="text-center">{modoEdicion ? 'Modificar Contacto' : 'Agregar Contacto'}</h4>
            <form onSubmit={modoEdicion ? guardarModificacion : guardarContacto}>
              <input
                type="text"
                className="form-control mb-2"
                onChange={(e) => setNombre(e.target.value)}
                maxLength={20}
                placeholder="Ingrese Nombre"></input>
              <input
                type="text"
                className="form-control mb-2"
                maxLength={20}
                onChange={(e) => setApellido(e.target.value)}
                placeholder="Ingrese Apellido"></input>
              <input
                type="number"
                className="form-control mb-2"
                maxLength={15}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ingrese Telefono"></input>
              <input
                type='email'
                className="form-control mb-2"
                maxLength={50}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese Email"></input>
                {
                 
                  modoEdicion?<label>Cambiar Imagen<input type="file" className='my-2'  onChange={modificarImagen}></input></label>: ""
                }
                {
                  modoEdicion? <button className="btn btn-warning btn-block" type="submit">Guardar</button>:
                  <button className={estadoTema ? 'btn btn-light btn-block' : 'btn btn-dark btn-block'} type="submit">Registrar</button>
                }
              </form>
              {
                estado ? <p className='alert alert-warning mt-2'>Faltan datos!!</p>: null
              }
          </div>
        </div>
      </div>
    </main>
  )
}

export default App;
