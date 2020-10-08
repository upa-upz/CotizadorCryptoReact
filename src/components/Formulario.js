import React,{ useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Error from './Error';

// Custom Hooks
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';

// Prop-Types
import PropTypes from 'prop-types';

// Component Styled
const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px; 
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;



const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // state del listado de criptomonedas
    const [listaCripto, guardarCriptomendas] = useState([]);
    const [error, guardarError] = useState(false)


    const MONEDAS = [
        { codigo: 'USD',nombre: 'Dolar de Estados Unidos'},
        { codigo: 'MXN',nombre: 'Peso Mexicano'},
        { codigo: 'EUR',nombre: 'Euro'},
        { codigo: 'GBP',nombre: 'Libra Esterlina'},
        { codigo: 'ARP',nombre: 'Peso Argentino'}
    ]


    // Utilizar useMoneda
    const [ moneda, SelectMonedas] = useMoneda('Elije tu Moneda', '',MONEDAS);

    // Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('elije tu criptomopneda','',listaCripto);


    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await Axios.get(url);

           guardarCriptomendas(resultado.data.Data);
        }
        consultarAPI();

    }, []);

    // Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        // Validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        // Pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje="Todos los Campos son Obligatorios" />: null}

            <SelectMonedas />

            <SelectCripto /> 

            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
     );
}

Formulario.propTypes = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptomoneda: PropTypes.func.isRequired
}

export default Formulario;