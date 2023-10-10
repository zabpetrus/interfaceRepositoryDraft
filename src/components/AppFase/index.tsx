import { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { Fases } from '../../types/_fases';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux'; 


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
    const id_obj = `${props.appkey + 1}`;
    const item_id = `${initialFaseData.id}`;


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
        <Accordion.Header>Fase {id_obj}</Accordion.Header>
        <Accordion.Body>
                        
          <Form>
            <input type='hidden' name={item_id} />


            <Form.Group className="mb-3" controlId={ props.id }>
                <Form.Label>OD</Form.Label>
                <Form.Select aria-label="OD"  onChange={handleODChange} >
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId={ props.id } onChange={handleNomeChange}>
                <Form.Label>Nome</Form.Label>
                <Form.Select aria-label="Nome">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId={ props.id } onChange={handleTipoChange}>
                <Form.Label>Tipo</Form.Label>
                <Form.Select aria-label="Tipo" aria-description='tipo de poço direcional'>            
                <option>Escolha um</option>
                <option value="1">Tipo I</option>
                <option value="2">Tipo II</option>
                <option value="3">Tipo III</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleDiaChange}>
                <Form.Label>Dia</Form.Label>
                <Form.Control type="text" placeholder="Dia" />
            </Form.Group>

             <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleHangerChange}>
                <Form.Label>Hanger</Form.Label>
                <Form.Control type="text" placeholder="Hanger" />
            </Form.Group>

            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleSapataChange}>
                <Form.Label>Sapata</Form.Label>
                <Form.Control type="text" placeholder="Sapata" />
            </Form.Group>

            <Form.Group className="mb-3" controlId={ props.id } onBlurCapture={handleTOCChange}>
                <Form.Label>TOC</Form.Label>
                <Form.Control type="text" placeholder="lTOC" />
            </Form.Group>

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