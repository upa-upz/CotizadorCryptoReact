import React from 'react';
import styled from '@emotion/styled';

// Prop-Types
import PropTypes from 'prop-types';

const MensajeEerror = styled.p`
    background-color: #b7322c;
    padding: 1rem;
    color: #fff;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Bebas Neue', cursive; 
    border-radius: 10px;
`;


const Error = ({mensaje}) => {
    return ( 
        <MensajeEerror>{mensaje}</MensajeEerror>
     );
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}
 
export default Error;