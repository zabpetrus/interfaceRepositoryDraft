import { Accordion } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import { Fases } from '../../types/_fases';
import { phaseList, detourList } from '../AppBlocks';






const AppSidebar = () => {

   const numPhases: number = useSelector((state: any) => state.numPhases);
   const numDetours: number = useSelector( (state: any) => state.numDetours);
   const listPhases: Fases[] = useSelector( (state: any) => state.phase );



   
    const structure : JSX.Element[] = [];
    const detourStructure : JSX.Element[] = [];

     //Iterando e criando o nome de fases e criando um acordeon com os valores
    phaseList( structure, numPhases, listPhases  );    

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

