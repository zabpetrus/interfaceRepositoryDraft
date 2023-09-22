import { createContext, useState, useContext, ChangeEvent } from 'react';


type StateContextData ={
  od: string;
  nome: string;
  tipo: string;
  dia: string;
  hanger : string;
  sapata: string;
  toc: string;
  mw: string;
  L: string;
  radio: string;
  teta: string;
  azimut: string;
  handleLChange: (event: ChangeEvent<HTMLInputElement>) => void; 
  handleRadioChange: (event: ChangeEvent<HTMLInputElement>) => void; 
  handleTetaChange: (event: ChangeEvent<HTMLInputElement>) => void; 
  handleAzimutChange: (event: ChangeEvent<HTMLInputElement>) => void; 
  
  handleODChange: (event: ChangeEvent<HTMLInputElement>) => void; 
  handleNomeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTipoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDiaChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleHangerChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSapataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleTOCChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleMWChange: (event: ChangeEvent<HTMLInputElement>) => void;    
}

interface StateContextProps {
  children: any | undefined
}

export const StateContext = createContext( {} as StateContextData );



export default function StateContextProvider({ children }: StateContextProps){

  //referentes a fase
  const [od, setOD] = useState('selecione');
  const handleODChange = (event: ChangeEvent<HTMLInputElement>) => {  setOD(event.target.value);   };

  const [nome, setNome] = useState('selecione');
  const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {  setNome(event.target.value);   };

  const [tipo, setTipo] = useState('selecione');
  const handleTipoChange = (event: ChangeEvent<HTMLInputElement>) => {  setTipo(event.target.value);   };

  const [dia, setDia] = useState('');
  const handleDiaChange = (event: ChangeEvent<HTMLInputElement>) => {  setDia(event.target.value);   };

  const [hanger, setHanger] = useState('');
  const handleHangerChange = (event: ChangeEvent<HTMLInputElement>) => {  setHanger(event.target.value);   };

  const [sapata, setSapata] = useState('');
  const handleSapataChange = (event: ChangeEvent<HTMLInputElement>) => {  setSapata(event.target.value);   };

  const [toc, setTOC] = useState('');
  const handleTOCChange = (event: ChangeEvent<HTMLInputElement>) => {  setTOC(event.target.value);   };

  const [mw, setMw] = useState('');
  const handleMWChange = (event: ChangeEvent<HTMLInputElement>) => {  setMw(event.target.value);   };

  //Referentes aos desvios

  const [L, setL] = useState('');
  const handleLChange = (event: ChangeEvent<HTMLInputElement>) => {  setL(event.target.value);   };

  const [radio, setRadio] = useState('');
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {  setRadio(event.target.value);   };

  const [teta, setTeta] = useState('');
  const handleTetaChange = (event: ChangeEvent<HTMLInputElement>) => {  setTeta(event.target.value);   };

  const [azimut, setAzimut] = useState('');
  const handleAzimutChange = (event: ChangeEvent<HTMLInputElement>) => {  setAzimut(event.target.value);   };




  return (
    <StateContext.Provider value={{  
        od, 
        nome, 
        tipo, 
        dia, 
        hanger, 
        sapata, 
        toc, 
        mw,
        L,
        radio,
        teta,
        azimut,    
        handleODChange, 
        handleNomeChange, 
        handleTipoChange, 
        handleDiaChange, 
        handleHangerChange, 
        handleSapataChange,
        handleTOCChange,
        handleMWChange,
        handleLChange,
        handleRadioChange,
        handleTetaChange,
        handleAzimutChange,    
        }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () =>{
  return useContext(StateContext);
}




