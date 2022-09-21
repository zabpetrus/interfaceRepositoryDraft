
export default function Desvio(props : any)
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
              <label>L</label>
              <input type="text" className="form-control" id="l1" placeholder="L" />
              </div>

              <div className="mb-3">
              <label>Radio</label>
              <input type="text" className="form-control" id="radio1" placeholder="Radio" />
              </div>
            
              <div className="mb-3">
              <label>Teta</label>
              <input type="text" className="form-control" id="teta1" placeholder="teta" />
              </div>

              <div className="mb-3">
              <label>Azimut</label>
              <input type="text" className="form-control" id="azimut1" placeholder="azimut" />
              </div>

          </div>
        </div>
      </div>
    );
}