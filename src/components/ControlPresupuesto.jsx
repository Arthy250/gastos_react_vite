import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, setPresupuesto, gastos, setGastos, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, stePorcentaje] = useState(0);
    const [color, setColor] = useState('');
    const [modificarPresupuesto, setModificarPresupuesto] = useState(false);
    const [nuevoPresupuesto, setNuevoPresupuesto] = useState('');

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    useEffect(() => {
        // Calcular presupuesto
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0 );
        const totalDisponible = presupuesto - totalGastado;

        // Calcular porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(0);
        
        setDisponible(totalDisponible);
        setGastado(totalGastado);
        
        setTimeout(() => {
            stePorcentaje(nuevoPorcentaje);

            if(nuevoPorcentaje > 75){
                setColor('#dc2626');
            } else if(nuevoPorcentaje > 50) {
                setColor('#f1cd2e');
            } else {
                setColor('#2ad15b');
            }
            
        }, 1000);

    }, [gastos, presupuesto]);

    const handleResetearApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

        if(resultado){
            setPresupuesto(0);
            setGastos([]);
            setIsValidPresupuesto(false);
        }
    }

    const handleModificarPresupuesto = () => {
        setModificarPresupuesto(true);
    }

    const handleActualizarPresupuesto = e => {
        e.preventDefault();

        if(nuevoPresupuesto != ''){
            setPresupuesto(Number(nuevoPresupuesto));
        }

        setNuevoPresupuesto('');
        setModificarPresupuesto(false);
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

        <div>
            <CircularProgressbar 
                value={porcentaje}
                text={`${porcentaje}% gastado`}
                styles={buildStyles({
                    pathColor:`${color}`,
                    textColor:`${color}`,
                    trailColor:'#f5f5f5',
                    pathTransitionDuration: 1
                })}
            />
        </div>

        <div className='contenido-presupuesto'>

            <button className="reset-app" type='button' onClick={handleResetearApp}>Resetear App</button>

            <button className="modificar-presupuesto" type='button' onClick={handleModificarPresupuesto}>Editar presupuesto</button>

            {modificarPresupuesto && 
               (
                <form onSubmit={handleActualizarPresupuesto} className="editar-presupuesto">
                    <div className='campo'>
                        <input
                            min='0'
                            className='nuevo-presupuesto'
                            type='number'
                            placeholder='Agrega tu presupuesto'
                            value={nuevoPresupuesto}
                            onChange={ e => setNuevoPresupuesto(e.target.value)}
                        />
                        <input className="inputNuevoPresupuesto" type='submit' value={nuevoPresupuesto != '' ? 'Actualizar' : 'Cancelar'} />
                    </div>
                </form>
               )
            }
            
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible <= 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto