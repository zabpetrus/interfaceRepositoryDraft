import { Accordion, Form } from 'react-bootstrap';
import { Desvios } from '../../types/_desvios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    id: string,
    appdef: number
}


const AppDesvio= (props: Props) => {

    const initialFaseData: Desvios = {
        'id': '',
        'L': 0,
        'radio': 0,
        'teta': 0,
        'azimut': 0,
    };

    const [desvioData, setDesvioData] = useState({});

    const id_eventkey = `${ props.appdef } `;
    const id_obj = `${props.appdef + 1}`;
    const item_id = `${initialFaseData.id}`;

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

    const desvioCheckout = (event: any) => {
       
        setDesvioData( prevDesvioData => ( { ...prevDesvioData, id: item_id}))
        dispatch({ type: 'INCREMENT_DESVIO_AMOUNT', payload: desvioData });
     }
 
    

    return (

        <Accordion.Item eventKey={ id_eventkey }>
        <Accordion.Header>Desvio {id_obj}</Accordion.Header>
        <Accordion.Body>
            
          <Form>
            
            <Form.Group className="mb-3" controlId={ props.id }>
                <Form.Label>L</Form.Label>
                <Form.Control type="text" placeholder="L" onChange={handleLChange} />
            </Form.Group>

             <Form.Group className="mb-3" controlId={ props.id }>
                <Form.Label>Radio</Form.Label>
                <Form.Control type="text" placeholder="Radio" onChange={handleRadioChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId={ props.id }>
                <Form.Label>Teta</Form.Label>
                <Form.Control type="text" placeholder="Teta" onChange={handleTetaChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId={ props.id }>
                <Form.Label>Azimut</Form.Label>
                <Form.Control type="text" placeholder="Azimut" onChange={handleAzimutChange} />
            </Form.Group>   

            <button className='btn btn-primary btn-large' type='button' onClick={desvioCheckout}>Atualizar</button>         

        </Form>
         
        </Accordion.Body>
      </Accordion.Item>
       
    );
};

export default AppDesvio;