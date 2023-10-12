import { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { Fases } from '../../types/_fases';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'; 
import { toRoman } from '../ConvertToRoman';


interface Props {
    id: string,
    appkey: number,
}


const AppFase = (props: Props) => {

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

    const [faseData, setFaseData] = useState({});

    const id_eventkey = `${ props.appkey } `;
    const id_obj = `${ toRoman( props.appkey + 1) }`;
    const item_id = `${initialFaseData.id}`;
    const nomeFase = `Fase ${id_obj}`;


    const dispatch = useDispatch()
  
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
             nome : event.target.value
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
     // alert( JSON.stringify(faseData)); 
    

    const checkout = (event: any) => {
       
       setFaseData( prevFaseData => ( { ...prevFaseData, id: id_obj}))
       dispatch({ type: 'INCREMENT_BY_AMOUNT', payload: faseData });
    }




    return (

        <Accordion.Item eventKey={ id_eventkey }>
        <Accordion.Header><h6>{nomeFase}</h6></Accordion.Header>
        <Accordion.Body>
                        
          <Form>
            <input type='hidden' name={item_id} />

            {/** Diâmetro externo do revestimento  */}
            <Form.Group className="mb-3" controlId={ props.id } aria-label='diametro externo'>
                <Form.Label>OD</Form.Label>
                <Form.Select aria-label="OD"  onChange={handleODChange}>
                <option>Open this select menu</option>
                <option value="5 1/2">5 1/2"</option>
                <option value="7">7"</option>
                <option value="9 5/8">9 5/8"</option>
                <option value="10 3/4">10 3/4"</option>
                <option value="13 3/8">13 3/8"</option>
                <option value="16">16"</option>
                <option value="18 5/8">18 5/8"</option>
                <option value="20">20"</option>
                <option value="30">30"</option>                
                </Form.Select>
            </Form.Group>

            {/** Nome da fase  */}
            <Form.Group className="mb-3" controlId={ props.id } onChange={handleNomeChange}>
                <Form.Label>Nome</Form.Label>
                <Form.Select aria-label="Nome">
                <option>Open this select menu</option>                
                <option value="1">{nomeFase}</option>
                
                </Form.Select>
            </Form.Group>

            {/** Tipo de revestimento  */}
            <Form.Group className="mb-3" controlId={ props.id } onChange={handleTipoChange}>
                <Form.Label>Tipo</Form.Label>
                <Form.Select aria-label="Tipo" aria-description='tipo de revestimento'>            
                <option>Escolha um</option>
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
            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleDiaChange}>
                <Form.Label>Dia</Form.Label>
                <Form.Control type="text" placeholder="Dia" />
            </Form.Group>

              {/** Topo da fase  */}
             <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleHangerChange}>
                <Form.Label>Hanger</Form.Label>
                <Form.Control type="text" placeholder="Hanger" />
            </Form.Group>

            {/** Base da fase  */}
            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleSapataChange}>
                <Form.Label>Sapata</Form.Label>
                <Form.Control type="text" placeholder="Sapata" />
            </Form.Group>

            {/** Topo do cimento  */}
            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleTOCChange}>
                <Form.Label>TOC</Form.Label>
                <Form.Control type="text" placeholder="lTOC" />
            </Form.Group>

             {/** Peso do fluído  */}
            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleMWChange}>
                <Form.Label>Mw</Form.Label>
                <Form.Control type="text" placeholder="MW" />
            </Form.Group>

            <button className='btn btn-primary btn-large' type='button' onClick={checkout}>Atualizar</button>

        </Form>
         
        </Accordion.Body>
      </Accordion.Item>
       
    );
};

export default connect() ( AppFase );