import * as THREE from 'three';

export default function Field( props? : any)
{
     
    //Create a closed wavey loop
    const curve = new THREE.CatmullRomCurve3( [
        new THREE.Vector3( -1, 3, 0),
        new THREE.Vector3( -1, 1, 0 ),
        new THREE.Vector3( 0, 0.5, 0 ),
        new THREE.Vector3( 0.3, 0.5, 0 )      
    ] );

    const points = curve.getPoints( 20 );
    
    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

    // Create the final object to add to the scene
    const curveObject = new THREE.Line( geometry, material );
    curveObject.position.y = -5;
    curveObject.position.x = 2;
    curveObject.scale.x = 2.6;
    curveObject.scale.y = 2.6;
    curveObject.scale.z = 2.6;

    return(curveObject);
}