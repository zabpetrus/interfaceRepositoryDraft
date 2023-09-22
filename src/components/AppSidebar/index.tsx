import { Accordion } from 'react-bootstrap';
import AppDesvio from '../AppDesvio';
import AppFase from '../AppFase';
import { connect, useSelector } from 'react-redux';

interface Props {
}


const AppSidebar = (props: Props) => {


   const numPhases = useSelector((state: any) => state.numPhases);
   const numDetours = useSelector( (state: any) => state.numDetours);

    const structure = [];
    const detourStructure = [];
 

    for(let i = 0; i < numPhases; i++){
        const id = `form-${i}`;
        structure.push( <AppFase id={id} key={i} appkey={i} ></AppFase>)
    }

    for(let j = 0; j < numDetours; j++){
        const id = `dform-${j}`;
        detourStructure.push( <AppDesvio id={id} key={j} appdef={j}  ></AppDesvio>)
    }

    return (

   <div className='p-2'>
       <h2>Fases</h2>
        <Accordion defaultActiveKey="0" >
             {structure}
        </Accordion>
        <hr/>
        <h2>Desvios</h2>
        <Accordion defaultActiveKey="1">
            {detourStructure} 
        </Accordion>
        <hr/>
   </div>         
     
    );
};

export default connect()(AppSidebar);

