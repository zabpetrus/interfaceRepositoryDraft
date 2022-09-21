import React, {  } from 'react';
import styles from './Sidebar.module.scss'



export default function Sidebar(this: any)
{  

  return(
      <section className={`col-md-3 dg-2-hex `+ (styles.sidebar)}>
        <div className='row'>
        <div className='space'>&nbsp;</div>
          <div className='resources'>

              <h1 className='dg-4-rgba'>Fases</h1>     
            
              <div className="accordion accordion-flush " id="accordionFases" > </div>
  
                
              <h1 className='dg-4-rgba'>Desvios</h1>    

              <div className="accordion accordion-flush" id="accordionDesvios">  </div>

              <div className='space'>&nbsp;</div>


          </div>

        </div>

       

      </section>
  );
}