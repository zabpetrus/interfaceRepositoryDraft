import './Navbar.module.scss';
import Link  from 'next/link';
import { ReactFragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Fase from '../Fase/Fase';
import React from 'react';
import { romanize } from 'react-roman';
import Desvio from '../Desvio/Desvio';

 const fase = (i : number) => {
    let now = Math.floor(Date.now());
    var un_id = now += i;
    var label = 'FASE ' + romanize(i);
    return React.createElement( Fase, { id: un_id, targetfield: 'flush-'+ un_id, parentfield: 'accordionFases', num: i }, [label]);
}

const desvio  = (i : number) => {
    let now = Math.floor(Date.now());
    var un_id = 'D' + (now += i);
    var label = 'DESVIO ' + romanize(i);
    return React.createElement( Desvio, { id: un_id, targetfield: 'flush-d-'+ un_id, parentfield: 'accordionDesvios', num: i }, [label]);
}

export default function Navbar(){ 

   
    const list = [];
    const desviosList = [];

    for(var i = 1; i < 4; i++){
     
      desviosList.push( desvio(i) );
      list.push( fase(i) );          
    }
  
    const [ num, setNum ] = useState(i);
    const [ numD, setNumD ] = useState(i);

  
    const [ fases , setFases ] : any = useState(list);
    const [ desvios , setDesvios ] : any = useState(desviosList);
   
    const appendFase = () =>{
      var temp = fase( num );
      setFases([ ... fases, temp]);
      setNum( num + 1 );      
    } 

    const appendDesvio = () =>{
        var temp = desvio(numD);
        setDesvios([ ... desvios, temp ]);
        setNumD( numD + 1 );
    }
     
    const tempr =  fases.map( (item: ReactFragment) =><>{item}</>);
    const temprds = desvios.map( (item: ReactFragment) =><>{item}</>);
  
    useEffect(() => {    
      ReactDOM.hydrate( tempr, document.getElementById('accordionFases'));
      ReactDOM.hydrate( temprds, document.getElementById('accordionDesvios'));
    });      
    
   
    return(
        <>
            <ul id='navbar' className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                
                <li className={'dropdown nav-item'}>
                    <Link href="/" >
                        <a className="nav-link px-2 nav-link dropdown-toggle" id='adicionar' role="button"  data-bs-toggle="dropdown" aria-expanded="false" >Adicionar</a>
                    </Link>
                    
                    <ul className={"dropdown-menu text-small"} aria-labelledby="adicionar">
                        <li><Link  href="/"><a className={"dropdown-item"} onClick={appendFase} >Fase</a></Link></li>
                        <li><Link  href="/"><a className={"dropdown-item"} onClick={appendDesvio}>Desvio</a></Link></li>                        
                    </ul>
                </li>

                <li><Link href="/" ><a className="nav-link px-2 link-dark" >Interface</a></Link></li>
                <li><Link href="/" ><a className="nav-link px-2 link-dark" >Editar</a></Link></li>
                <li><Link href="/" ><a className="nav-link px-2 link-dark">Sobre</a></Link></li>
            </ul>           
        </>        
          
    )
}