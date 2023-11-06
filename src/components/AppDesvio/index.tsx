import { Accordion, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toRoman } from '../ConvertToRoman';

interface Props {
    id: string,
    appdef: number
}


const AppDesvio= (props: Props) => {

      const id_obj = props.appdef + 1;

    const [desvioData, setDesvioData] = useState({ id: id_obj });

    const id_eventkey = `${ props.appdef } `;   
    //const item_id = `${initialFaseData.id}`;
    const nomeDesvio = `Fase_${toRoman( id_obj )}`;

    const dispatch = useDispatch()
  
    const handleLChange = (event: any) => {
        setDesvioData(prevDesvioData => ({
            ...prevDesvioData,
             L : event.target.value
        }));
    };

    const handleRadioChange = (event: any) => {
        setDesvioData(prevDesvioData => ({
            ...prevDesvioData,
            Radio : event.target.value
        }));
    }

    const handleTetaChange = (event: any) => {
        setDesvioData(prevDesvioData => ({
            ...prevDesvioData,
            teta : event.target.value
        }));
    }

    const handleAzimutChange = (event: any) => {
        setDesvioData(prevDesvioData => ({
            ...prevDesvioData,
            azimut : event.target.value
        }));
    }

    const addElement = () => {
        dispatch({ type: 'INCREMENT_DESVIO_AMOUNT', payload: desvioData });       
     }

    const desvioCheckout = (event: any) => {
        addElement();       
     }
 
    

    return (

        <Accordion.Item eventKey={ id_eventkey }>
        <Accordion.Header><h6>{nomeDesvio}</h6></Accordion.Header>
        <Accordion.Body>
            
          <Form>
            
            <Form.Group className="mb-3" controlId={ props.id }>
                <Form.Label>L</Form.Label>
                <Form.Control type="text" placeholder="L" onChange={handleLChange} aria-required="true" required />
            </Form.Group>

             <Form.Group className="mb-3" controlId={ props.id }>
                <Form.Label>Radio</Form.Label>
                <Form.Control type="text" placeholder="Radio" onChange={handleRadioChange} aria-required="true" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId={ props.id }>
                <Form.Label>Teta</Form.Label>
                <Form.Control type="text" placeholder="Teta" onChange={handleTetaChange} aria-required="true" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId={ props.id }>
                <Form.Label>Azimut</Form.Label>
                <Form.Control type="text" placeholder="Azimut" onChange={handleAzimutChange} aria-required="true" required />
            </Form.Group>   

            <button className='btn btn-primary btn-large' type='button' onClick={desvioCheckout}>Atualizar</button>         

        </Form>
         
        </Accordion.Body>
      </Accordion.Item>
       
    );
};

export default AppDesvio;