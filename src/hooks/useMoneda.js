import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';


// Componente Styled
const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;
const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    appearance: none;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
`;

const useMoneda = (label, stateInicial, opciones) => {

    // State de nuestro hook
    const [state, actualizarState] = useState(stateInicial);

    const Seleccionar = () => {
    
        return (
            <Fragment>
                <Label>{label}</Label>
                <Select
                    onChange={e => actualizarState(e.target.value)}
                    value={state}
                >
                    <option value="">-- Seleccione --</option>
                    {opciones.map(opcion => (
                        <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                    ))}
                </Select>
            </Fragment>

        );
    }   
    
    // Retornar state, interfaz y funcion que modifica el state
    return [state, Seleccionar, actualizarState];
}

export default useMoneda;

