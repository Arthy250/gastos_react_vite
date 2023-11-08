import { useEffect, useState } from 'react';
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje';
import { generarId } from '../helpers';

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [id, setid] = useState('');
    const [fecha, setFecha] = useState('')

    const ocultarModal = () => {
        setGastoEditar({});
        setAnimarModal(false);

        setTimeout(() => {
        setModal(false);
        }, 500);
    }
    
    useEffect(() => {
      if(Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre);
        setCantidad(gastoEditar.cantidad);
        setCategoria(gastoEditar.categoria);
        setid(gastoEditar.id);
        setFecha(gastoEditar.fecha);
      }
    }, []);


    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios');

            setTimeout(() => {
                setMensaje('')
            }, 3000);

            return;
        }

        guardarGasto({
            nombre,
            cantidad,
            categoria,
            id,
            fecha
        });
    }

    

  return (
    <div className='modal'>
        <div className='cerrar-modal'>
            <img src={CerrarBtn} alt='Cerrar modal' onClick={ocultarModal} />
        </div>

        <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? 'animar' : 'cerrar' }`}
        >
            <legend>{gastoEditar.id ? 'Editar gasto' : 'Nuevo Gasto'}</legend>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor='nombre'>Nombre gasto</label>
                <input
                    type='text'
                    id='nombre'
                    placeholder='Agrega el nombre del gasto'
                    value={nombre}
                    onChange={ e => setNombre(e.target.value)}
                />
            </div>
            
            <div className='campo'>
                <label htmlFor='cantidad'>Cantidad</label>
                <input
                    type='number'
                    id='cantidad'
                    placeholder='Agrega la cantidad'
                    value={cantidad}
                    onChange={ e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor='categoria'>Categoría</label>
                <select
                    name='categoria'
                    id='categoria'
                    value={categoria}
                    onChange={ e => setCategoria(e.target.value)}
                >
                    <option value=''>-- Seleccione --</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='gastos'>Gastos varios</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>
                </select>
            </div>

            <input type='submit' value={gastoEditar.id ? 'Guardar cambios' : 'Añadir gasto'} />
        </form>
    </div>
  )
}

export default Modal