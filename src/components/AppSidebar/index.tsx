import { Accordion } from 'react-bootstrap';
import AppDesvio from '../AppDesvio';
import AppFase from '../AppFase';
import { connect, useSelector } from 'react-redux';
import { Fases } from '../../types/_fases';





//Método que cria no sidebar o accordion com os formularios para popular as fases
const phaseList = ( structure : JSX.Element[], numPhases : number | any, listPhases: Fases[] ) : void => {

    if (numPhases > 0){ 


        for(let i = 0; i < numPhases; i++){
            const id = `form-${i}`;            
         
            const phasedata : Fases = {
                id: listPhases[i]?.id || i.toString(),
                od: listPhases[i]?.od || 0,
                nome:  listPhases[i]?.nome || '',
                tipo: listPhases[i]?.tipo || '',
                dia:  listPhases[i]?.dia || 0,
                hanger: listPhases[i]?.hanger || 0,
                sapata:  listPhases[i]?.sapata || 0,
                toc: listPhases[i]?.toc || 0,
                mw: listPhases[i]?.mw || 0
            };
            structure.push( <AppFase id={id} key={i} appkey={i} phaseData={phasedata} ></AppFase>)
        } 
    }
}

//Método que cria no sidebar o accordion com os formularios para popular os desvios
const detourList = ( detourStructure : JSX.Element[], numDetours : number | any ) : void => {

    if(numDetours > 0){
         for(let j = 0; j < numDetours; j++){
            const id = `dform-${j}`;
            detourStructure.push( <AppDesvio id={id} key={j} appdef={j}  ></AppDesvio>)
        }
    }
}


const AppSidebar = () => {

   const numPhases: number = useSelector((state: any) => state.numPhases);
   const numDetours: number = useSelector( (state: any) => state.numDetours);
   const listPhases: Fases[] = useSelector( (state: any) => state.phase );



   
    const structure : JSX.Element[] = [];
    const detourStructure : JSX.Element[] = [];

     //Iterando e criando o nome de fases
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

