import React,{ useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import Error from './components/Error'



const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
  `;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);
  const [error, guardarError] = useState(false)

  useEffect( () => {

    const cotizarCriptomoneda = async () => {
      // Evitamos la ejecucion la primera vez
      if(moneda === '') return;

      // Consultar la api
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // Mostrar el Spinner
      guardarCargando(true);

      // Ocultar el Spinner
      setTimeout(()=> {

        // Cambiar el estado de cargando
        guardarCargando(false);

        // console.log(guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]));

        // Guardar Cotizacion
        try {
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          guardarError(false);
        } catch (error) {
          console.error(error);
          console.log('Error al cargar')
          guardarError(true);
        }
        
        
      }, 2000);

      
    }
    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  //Mostrar Spinner o Resultado
  const componente = (cargando) ? <Spinner /> :  <Cotizacion resultado={resultado}/>;
  const errorResultado = (error) ? <Error mensaje="Error al cargar... Intente de Nuevo" /> : componente;

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>COTIZA CRIPTOMONEDAS AL INSTANTE</Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        
        {errorResultado}
        

      </div>
    </Contenedor>
  );
}




export default App;