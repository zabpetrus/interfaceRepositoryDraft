import { FontLoader } from '../../three/examples/jsm/loaders/FontLoader';
import { LineBasicMaterial } from 'three/src/Three';
import { THREE } from '../ThreeLibCallback';
import { Observable } from 'rxjs';



const AppTextLoader = (scene: THREE.Scene,  texto: string | number, tamanho:number, parente: any, numPhases : number) => {

    const loader = new FontLoader();
    loader.load("gentilis_regular.typeface.json", function (font : any) {   

        const color = '#000000';
        const matDark = new LineBasicMaterial( {  color: color,  side: THREE.DoubleSide  } );

        if(typeof(texto)== 'number'){
            texto = texto.toString();
        }

        
        const shapes = font.generateShapes( texto, tamanho);
        const geometry = new THREE.ShapeGeometry( shapes );
       
        const text = new THREE.Mesh( geometry, matDark );

        var p = numPhases * 0.33;
       
        var posicaoDesejada = new THREE.Vector3(1.3, p, 0);
        posicaoDesejada.add(parente.position);
        text.position.copy(posicaoDesejada);

        geometry.computeBoundingBox();
        scene.add( text );


    },
    
    );    
};

export default AppTextLoader;
