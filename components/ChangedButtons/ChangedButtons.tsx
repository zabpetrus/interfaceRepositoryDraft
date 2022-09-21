import { useEffect } from 'react';
import { useToogleContext } from '../../contexts/ToggleContext';


export default function ChangedButtons(){

    const { isActive2D, isActive3D, toggleElement, handleChange2D, handleChange3D } = useToogleContext();

     useEffect( () => {
        toggleElement( isActive3D, 'section3D');    
        toggleElement(isActive2D, 'section2D');     
    });

    return(
        <div className="col-12 col-lg-auto mb-3 mt-0 mb-lg-0 me-lg-3 text-center ">
            <button className="btn btn-danger" onClick={handleChange2D}>2D</button>
            <button className="btn btn-primary" onClick={handleChange3D} >3D</button>
        </div>
    )
}