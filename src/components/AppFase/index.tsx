import { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { Fases } from '../../types/_fases';
import { connect, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'; 
import { toRoman } from '../ConvertToRoman';
import { AppState } from '../../contexts/MainContext';


interface Props {
    id: string,
    appkey: number,
    phaseData : Fases;
}

const mapStateToProps = (state: any) => ({
    isloaded: state.isloaded,
    currentState: state.phase
});



const AppFase = (props: Props) => {

    //Valor corrente da fase usado como referência
   // var currentfaseData = useSelector((state: AppState ) => state.phase);   

    const initialFaseData: Fases = {
        'id': "0",
        'od': 0,
        'nome': '',
        'tipo': '',
        'dia': 0,
        'hanger': 0,
        'sapata': 0,
        'toc': 0,
        'mw': 0   
    };

    const id_obj =  props.appkey + 1;

    const [faseData, setFaseData] = useState({id: id_obj});
  

    const id_eventkey = `${ props.appkey } `;    
    const item_id = `${initialFaseData.id}`;
    const nomeFase = `Fase ${toRoman( id_obj )}`;


    const dispatch = useDispatch();


    var isloaded = useSelector((state: AppState ) => state?.isloaded);

    
    const validaUpdateData: boolean = isloaded && (props.phaseData !== undefined);   
  
    const handleTipoChange = (event: any) => {
        
        setFaseData(prevFaseData => ({
            ...prevFaseData,
             tipo : event.target.value
        }));
    };

    const handleODChange = (event: any) => {
        setFaseData(prevFaseData => ({
            ...prevFaseData,
             od : event.target.value
        }));     
    };

    const handleNomeChange = (event: any) => {
        setFaseData(prevFaseData => ({
            ...prevFaseData,
             nome : `Fase ${event.target.value}`
        }));
    };

    const handleDiaChange = (event: any) => {
        setFaseData(prevFaseData => ({
            ...prevFaseData,
             dia : event.target.value
        }));

    };

    const handleHangerChange = (event: any) => {
        setFaseData(prevFaseData => ({
            ...prevFaseData,
             hanger : event.target.value
        }));
    };

    const handleSapataChange = (event: any) => {
        setFaseData(prevFaseData => ({
            ...prevFaseData,
             sapata : event.target.value
        }));

    };

    const handleTOCChange = (event: any) => {
        setFaseData(prevFaseData => ({
            ...prevFaseData,
             toc : event.target.value
        }));
        
    };

    const handleMWChange = (event: any) => {
        setFaseData(prevFaseData => ({
            ...prevFaseData,
             mw : event.target.value
        }));
    };    
   

    const checkout = (event: any) => {                    
        dispatch({ type: 'INCREMENT_BY_AMOUNT', payload: faseData });
    }
     

    return (

        <Accordion.Item eventKey={ id_eventkey }>
        <Accordion.Header><h6>{nomeFase}</h6></Accordion.Header>
        <Accordion.Body>
                        
          <Form>
            <input type='hidden' name={item_id} />

            {/** Diâmetro externo do revestimento  */}
            <Form.Group className="mb-3" controlId={ props.id } aria-label='diametro externo' aria-required='true'>
                <Form.Label>OD</Form.Label>
                <Form.Select aria-label="OD"  onChange={handleODChange}  aria-required='true' required defaultValue={validaUpdateData ? props.phaseData.od : 0}>
                <option value="0">Open this select menu</option>
                <option value="1">5 1/2"</option>
                <option value="2">7"</option>
                <option value="3">9 5/8"</option>
                <option value="4">10 3/4"</option>
                <option value="5">13 3/8"</option>
                <option value="6">16"</option>
                <option value="7">18 5/8"</option>
                <option value="8">20"</option>
                <option value="9">22"</option>
                <option value="10">30"</option>                
                </Form.Select>
            </Form.Group>

            {/** Nome da fase  */}
            <Form.Group className="mb-3" controlId={ props.id } onChange={handleNomeChange}>
                <Form.Label>Nome</Form.Label>
                <Form.Select aria-label="Nome" aria-required='true' required defaultValue={validaUpdateData ? 1 : 0}>
                <option value="0">Open this select menu</option>                
                <option value={id_obj}>{nomeFase}</option>
                
                </Form.Select>
            </Form.Group>

            {/** Tipo de revestimento  */}
            <Form.Group className="mb-3" controlId={ props.id } onChange={handleTipoChange}>
                <Form.Label>Tipo</Form.Label>
                <Form.Select aria-label="Tipo" aria-description='tipo de revestimento' aria-required='true' defaultValue={validaUpdateData ? props.phaseData.tipo : "0"} required>            
                <option value="0">Escolha um</option>
                <option value="1">Surface Casing</option> 
                <option value="2">Intermediate Casing</option>            
                <option value="3">Production Casing</option>
                <option value="4">Liner</option>
                <option value="5">Extension Casing</option>

                <option value="6">Suspension Casing</option>
                <option value="7">Abandonment Casing</option>
                <option value="8">Recompletion Casing</option>
                <option value="9"> Isolation Casing </option>
                </Form.Select>
            </Form.Group>

              {/** Diâmetro do poço  */}
            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleDiaChange} aria-required='true'>
                <Form.Label>Dia</Form.Label>
                <Form.Control type="text" placeholder="Dia" aria-required="true" defaultValue={ validaUpdateData ? props.phaseData.dia : 0} required />
            </Form.Group>

              {/** Topo da fase  */}
             <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleHangerChange} aria-required='true'>
                <Form.Label>Hanger</Form.Label>
                <Form.Control type="text" placeholder="Hanger" aria-required='true' defaultValue={validaUpdateData ? props.phaseData.hanger : 0} required />
            </Form.Group>

            {/** Base da fase  */}
            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleSapataChange} aria-required='true'>
                <Form.Label>Sapata</Form.Label>
                <Form.Control type="text" placeholder="Sapata" aria-required="true" defaultValue={validaUpdateData ? props.phaseData.sapata : 0} required />
            </Form.Group>

            {/** Topo do cimento  */}
            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleTOCChange} aria-required='true'>
                <Form.Label>TOC</Form.Label>
                <Form.Control type="text" placeholder="TOC" aria-required="true" defaultValue={validaUpdateData ? props.phaseData.toc : 0} required />
            </Form.Group>

             {/** Peso do fluído  */}
            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleMWChange} aria-required='true'>
                <Form.Label>Mw</Form.Label>
                <Form.Control type="text" placeholder="MW" aria-required="true" defaultValue={validaUpdateData ? props.phaseData.mw : 0} required />
            </Form.Group>

            <button className='btn btn-primary btn-large' type='button' onClick={checkout}>Atualizar</button>

        </Form>
         
        </Accordion.Body>
      </Accordion.Item>
       
    );
};

export default connect(mapStateToProps) ( AppFase );