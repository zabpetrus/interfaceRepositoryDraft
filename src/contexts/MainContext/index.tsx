// MainContext.ts
import { PayloadAction, configureStore } from '@reduxjs/toolkit';
import { Fases } from '../../types/_fases';
import { Desvios } from '../../types/_desvios';
import { populatePhaseList } from '../../components/AppBlocks';


const TOGGLE_2D = 'TOGGLE_2D';
const TOGGLE_3D = 'TOGGLE_3D';


export interface AppState {
  isActive2D: boolean;
  isActive3D: boolean;
  isloaded: boolean;
  phase: Fases[];
  desvio: Desvios[];
  numPhases: number;
  numDetours: number;
}

interface ToggleAction {
  type: typeof TOGGLE_2D | typeof TOGGLE_3D;
}

const seev = populatePhaseList( 3 );

const initialState: AppState = {
  isActive2D: true,
  isActive3D: true,
  isloaded: false,
  phase: [],
  desvio: [],
  numPhases: 3,
  numDetours: 0
};





function mainReducer(state = initialState, action: ToggleAction | PayloadAction | any ): AppState {
  switch (action.type) {

    //ativa e desativa para a janela 2D
    case TOGGLE_2D:
    return { ...state, isActive2D: !state.isActive2D };

    //ativa e desativa para a janela 3D
    case TOGGLE_3D:
      return { ...state, isActive3D: !state.isActive3D }; 

    case 'LOAD_FILE_STATS':
      return { ...state, isloaded: !state.isloaded }; 
    
    //aumenta o numero de fases em uma unidade
    case 'INCREMENTAR_FASE':
      const novoValorphase = state.numPhases + 1;
      const novoNumPhases = novoValorphase <= 8 ? novoValorphase : 8;
      return { ...state, numPhases: novoNumPhases }

    //aumenta o numero de desvios em uma unidade
    case 'INCREMENTAR_DESVIO':
      const novoValordesvio = state.numDetours + 1;
      const novoNumDetours = novoValordesvio <= 8 ? novoValordesvio : 8; // Limitando a 8
      return { ...state, numDetours: novoNumDetours };

    //Adiciona o objeto fase em uma lista de fases
    case 'INCREMENT_BY_AMOUNT':
      if (state.phase.length >= 8) {
        return state; // Retorna o estado atual sem fazer alterações
      }
    const existsInPhase = state.phase.some(item => item.id === action.payload.id);
    const appendInPhase = [...state.phase, action.payload];

    const substituicao = state.phase.map( item => (item.id === action.payload.id) ? action.payload : item ) 
    const updatedPhase = !existsInPhase ? appendInPhase : substituicao;
    return { ...state, phase: updatedPhase };

    //Adiciona o objeto desvio a uma lista de desvios
    case 'INCREMENT_DESVIO_AMOUNT':
      if (state.desvio.length >= 8) { 
        return state; // Retorna o estado atual sem fazer alterações
      }
      const existsInDesvio = state.desvio.some(item => item.id === action.payload.id);
      return { ...state, desvio: !existsInDesvio ? [...state.desvio, action.payload] : state.desvio.map( item => item.id === action.payload.id ? action.payload : item )};   
  
      //Carrega as fases de um arquivo json 
    case 'LOAD_DATA_FASE':      
      return { ...state, phase: action.payload };

      //carrega os devios de um arquivo json
    case 'LOAD_DATA_DESVIO':
        return { ...state, desvio: action.payload };
    
    //carrega o numero de fases manualmente ou da leitura de um objeto fases
    case 'FASE_NUMPHASES':
      return { ...state, numPhases: (typeof(action.payload) === 'number')? action.payload : action.payload.length };  

    //carrega o numero de desvios manualmente ou da leitura de um objeto fases
    case 'DETOUR_NUMDETOURS':
        return { ...state, numDetours: (typeof(action.payload) === 'number')? action.payload : action.payload.length };            

    default:
      return state;
  }
}

export const incrementarFase = () => ({
  type: 'INCREMENTAR_FASE',
});

export const incrementarDesvios = () => ({
  type: 'INCREMENTAR_DESVIO',
});


const store = configureStore({ reducer: mainReducer } );
export default store;


