// MainContext.ts
import { PayloadAction, configureStore } from '@reduxjs/toolkit';
import { Fases } from '../../types/_fases';
import { Desvios } from '../../types/_desvios';


const TOGGLE_2D = 'TOGGLE_2D';
const TOGGLE_3D = 'TOGGLE_3D';

export interface DiaAppState{
  phase: Fases[];
  desvio: Desvios[];
}

export interface AppState {
  isActive2D: boolean;
  isActive3D: boolean;
  phase: Fases[];
  desvio: Desvios[];
  numPhases: number;
  numDetours: number;
}

interface ToggleAction {
  type: typeof TOGGLE_2D | typeof TOGGLE_3D;
}

const initialState: AppState = {
  isActive2D: true,
  isActive3D: true,
  phase: [],
  desvio: [],
  numPhases: 3,
  numDetours: 3
};


function mainReducer(state = initialState, action: ToggleAction | PayloadAction | any ): AppState {
  switch (action.type) {

    //ativa e desativa para a janela 2D
    case TOGGLE_2D:
    return { ...state, isActive2D: !state.isActive2D };

    //ativa e desativa para a janela 3D
    case TOGGLE_3D:
      return { ...state, isActive3D: !state.isActive3D }; 
    
    //aumenta o numero de fases em uma unidade
    case 'INCREMENTAR_FASE':
      return { ...state, numPhases: state.numPhases + 1 }

    //aumenta o numero de desvios em uma unidade
    case 'INCREMENTAR_DESVIO':
      return { ...state, numDetours: state.numDetours + 1 }

    //Adiciona o objeto fase em uma lista de fases
    case 'INCREMENT_BY_AMOUNT':
      return { ...state, phase: [...state.phase, action.payload] };

    //Adiciona o objeto desvio a uma lista de desvios
    case 'INCREMENT_DESVIO_AMOUNT':
        return { ...state, desvio: [...state.desvio, action.payload] }; 
   
    //Incompleta. verifica se tem um valor no array e atualiza (find não funciona)
    case 'UPDATE_FASE_AMOUNT':
      return { ...state, desvio: [...state.desvio, action.payload] };
    
      //Incompleta. verifica se tem um valor no array e atualiza (find não funciona)
    case 'UPDATE_DESVIO_AMOUNT':
      return { ...state, desvio: [...state.desvio, action.payload] };
        
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
