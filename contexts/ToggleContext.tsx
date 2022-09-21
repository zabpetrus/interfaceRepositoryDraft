import React from 'react';
import { createContext, useState, useContext, ReactNode } from 'react';


type WindowContextData = {
  isActive2D: boolean;
  isActive3D: boolean;
  toggleElement: (element: boolean, id : string) => void;
  removeItemClass: (id: string) => void;
  handleChange2D : () => void;
  handleChange3D : () => void;
};

type WindowContextProviderProps = {
  children: ReactNode;
};

export const ToggleContext = createContext({} as WindowContextData)

export function ToggleContextProvider({ children } : WindowContextProviderProps)
{   
    const [isActive2D, setActive2D] = useState(false);    
    const [isActive3D, setActive3D] = useState(false); 
   
    function handleChange3D(){           
        setActive3D(!isActive3D);
    }
      
    function handleChange2D(){    
      setActive2D(!isActive2D);
    }    
    
    function toggleElement( element : boolean, id : string ) : void{

      //Dado o id de um determinado elemento -> recebe uma string referente ao id do elemento 
      const el = document.getElementById(id);
    
      if(element){
       el?.classList.add("hidden");
      }else{
        el?.classList.remove("hidden");
        el?.classList.add("flex-fill");        
      }
      
    }

    function removeItemClass( id : string ): void{

      const el = document.getElementById(id);
    
      if (el?.classList.contains('hidden')) {
        el.classList.remove('hidden');
      }
      
      if (el?.classList.contains('flex-fill')) {
        el.classList.remove('flex-fill');
      }     
    }



    return(
        <ToggleContext.Provider value={{ 
          handleChange3D,
          handleChange2D,        
          removeItemClass,
          toggleElement,       
          isActive2D,
          isActive3D }}>
                {children}
        </ToggleContext.Provider>
    );
}

export const useToogleContext = () =>{
    return useContext(ToggleContext);
}