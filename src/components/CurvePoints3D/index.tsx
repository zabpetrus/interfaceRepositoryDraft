import { Desvios } from '../../types/_desvios';
import { Fases } from '../../types/_fases';
import { setODValue } from '../AppBlocks';
import { THREE} from '../ThreeLibCallback';


const CurvePoints3D = (numPhases : number, numDetours: number, phase:  Fases[], desvio: Desvios[]) => {
    const pontos: THREE.Vector3[] | undefined = [];
            
    var j = 0;
    //Inicialmente numPhases = 3
    var i = 0;
    var x = 0, y = 0, z = 0;
    for( i ; i < numPhases; i++){   
        
        pontos.push( new THREE.Vector3(x, y, z) ); 
        y -= 1;  


        if( numDetours > 0){

            var opt = 0.1;
                if( phase[i] !== undefined){ opt = phase[i].od; }
                 x +=  setODValue ( opt ) / 10 ;
            if( i === j ){   
               
                j += 1;
            }
            pontos.push( new THREE.Vector3(x, y, z) );  
                     
        } 
    }    

    const customCurve = new THREE.CatmullRomCurve3(pontos, false, 'chordal');

    // Crie um tubo ao longo da curva (aqui, você pode definir o raio para controlar a espessura)
    const tubeGeometry = new THREE.TubeGeometry(customCurve, 100, 0.1, 8, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });    
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    tubeMesh.position.y = 3; 




    return tubeMesh;
};

export default CurvePoints3D;
