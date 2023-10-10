import { Accordion } from 'react-bootstrap';
import AppDesvio from '../AppDesvio';
import AppFase from '../AppFase';
import { connect, useSelector } from 'react-redux';
import React, { useRef } from 'react';

interface Props {
}


const AppSidebar = (props: Props) => {

   const numPhases = useSelector((state: any) => state.numPhases);
   const numDetours = useSelector( (state: any) => state.numDetours);

    const structure = [];
    const detourStructure = [];
 
    //Iterando e criando o nome de fases
    for(let i = 0; i < numPhases; i++){
        const id = `form-${i}`;
        structure.push( <AppFase id={id} key={i} appkey={i} ></AppFase>)
    }

    //Iterando e criando o nome de desvios
    for(let j = 0; j < numDetours; j++){
        const id = `dform-${j}`;
        detourStructure.push( <AppDesvio id={id} key={j} appdef={j}  ></AppDesvio>)
    }

    return (

   <div className='p-2'>
    
    <Accordion>
        <Accordion.Header><h6>Fases</h6></Accordion.Header>
        <Accordion.Body>
            <Accordion defaultActiveKey="0" >
                {structure}
            </Accordion>            
        </Accordion.Body>       
    </Accordion>
      
        <hr/>
    <Accordion>    
        <Accordion.Header><h6>Desvios</h6></Accordion.Header>
        <Accordion.Body>
            <Accordion defaultActiveKey="1">
            {detourStructure} 
             </Accordion>
        </Accordion.Body>       
    </Accordion>
        <hr/>
   </div>         
     
    );
};

export default connect()(AppSidebar);

