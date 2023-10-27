import { Accordion } from 'react-bootstrap';
import AppDesvio from '../AppDesvio';
import AppFase from '../AppFase';
import { connect, useSelector } from 'react-redux';




//Método que cria no sidebar o accordion com os formularios para popular as fases
const phaseList = ( structure : JSX.Element[], numPhases : number | any ) : void => {

    for(let i = 0; i < numPhases; i++){
        const id = `form-${i}`;
        structure.push( <AppFase id={id} key={i} appkey={i} ></AppFase>)
    }
}

//Método que cria no sidebar o accordion com os formularios para popular os desvios
const detourList = ( detourStructure : JSX.Element[], numDetours : number | any ) : void => {
    for(let j = 0; j < numDetours; j++){
        const id = `dform-${j}`;
        detourStructure.push( <AppDesvio id={id} key={j} appdef={j}  ></AppDesvio>)
    }
}


const AppSidebar = () => {

   const numPhases = useSelector((state: any) => state.numPhases);
   const numDetours = useSelector( (state: any) => state.numDetours);

    const structure : JSX.Element[] = [];
    const detourStructure : JSX.Element[] = [];

     //Iterando e criando o nome de fases
    phaseList( structure, numPhases );    

    //Iterando e criando o nome de desvios
    detourList( detourStructure, numDetours );  

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

