import React from 'react';
import { FontLoader } from '../../three/examples/jsm/loaders/FontLoader';
import { LineBasicMaterial } from 'three/src/Three';
import * as THREEFONT from 'three';

interface Props {
}

const AppTextLoader = (scene: THREE.Scene,  texto: string | number, tamanho:number, posx: number, posy: number) => {

    const loader = new FontLoader();
    loader.load("gentilis_regular.typeface.json", function (font : any) {   

        const color = '#000000';
        const matDark = new LineBasicMaterial( {  color: color,  side: THREEFONT.DoubleSide  } );

        if(typeof(texto)== 'number'){
            texto = texto.toString();
        }
        const shapes = font.generateShapes( texto, tamanho);
        const geometry = new THREEFONT.ShapeGeometry( shapes );
        geometry.computeBoundingBox();
        const text = new THREEFONT.Mesh( geometry, matDark );
        text.position.x = posx;
        text.position.y = posy;
        scene.add( text );

    },
    function ( err: any ) {
		console.log( 'An error happened: ' + err );	}
    );    
};

export default AppTextLoader;
