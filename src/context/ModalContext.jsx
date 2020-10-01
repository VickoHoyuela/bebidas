import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios';

//Crear context
export const ModalContext = createContext();

const ModalProvider = (props) => {

  //state Provider
  const [idreceta, guardarIdReceta] = useState(null)
  const [receta, guardarReceta] = useState({})
 
  // Una vez que tenemos una receta, llamar a la API

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const resultado = await axios.get(url)
      guardarReceta(resultado.data.drinks[0])
    }
    obtenerReceta()
  }, [idreceta])
  return (
    <ModalContext.Provider
      value={{
        guardarIdReceta
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;