import { FormLabel } from "react-bootstrap";

export default function Fase( props : any )
{       
    return(
        <div className="accordion-item">
              <h2 className="accordion-header" id={`${props.id}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={'#' +`${props.targetfield}`} aria-expanded="false" aria-controls={`${props.targetfield}`}>
                  {props.children}
                </button>
              </h2>
              <div id={`${props.targetfield}`} className="accordion-collapse collapse" aria-labelledby={`${props.id}`} data-bs-parent={'#' +`${props.parentfield}`}>
                    
                    <div className="accordion-body">
                    
                        <div className="mb-3">
                            <label>OD</label>
                            <select id="od1" className="form-select" aria-label="OD Valores">
                                <option defaultValue="" >Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Nome</label>
                            <select id="nome1" className="form-select" aria-label="Nome Valores">
                            <option defaultValue="" >Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Tipo</label>
                            <select id="tipo1" className="form-select" aria-label="OD Valores">
                                <option defaultValue="" >Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Dia</label>
                            <input type="text" className="form-control" id="dia1" placeholder="dia" />
                        </div>

                        <div className="mb-3">
                            <FormLabel>Hanger</FormLabel>
                            <input type="text" className="form-control" id="hanger1" placeholder="hanger1" />
                        </div>
                        
                        <div className="mb-3">
                            <FormLabel>Sapata</FormLabel>
                            <input type="text" className="form-control" id="sapata1" placeholder="sapata1" />
                        </div>

                        <div className="mb-3">
                            <FormLabel>TOC</FormLabel>
                            <input type="text" className="form-control" id="toc1" placeholder="toc1" />
                        </div>
                        
                        <div className="mb-3">
                            <FormLabel>Mw</FormLabel>
                            <input type="text" className="form-control" id="mw1" placeholder="mw1" />
                        </div>

                   </div> { /** end accordion-body */}

              </div> { /*** end targetfield */}

        </div>
    )
}