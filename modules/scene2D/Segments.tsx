import * as THREE from "three";

export default function Segments( altura: number, comprimento: number, espessura: number )
{

    const group = new THREE.Group();
    
    const geometryA = new THREE.PlaneGeometry( espessura, altura );
    const materialA = new THREE.MeshBasicMaterial( {color: 0xcccccc, side: THREE.DoubleSide} );
    const planeA = new THREE.Mesh( geometryA, materialA );

    const geometryB = new THREE.PlaneGeometry( espessura, altura );
    const materialB = new THREE.MeshBasicMaterial( {color: 0xcccccc, side: THREE.DoubleSide} );
    const planeB = new THREE.Mesh( geometryB, materialB );

    const geometryC = new THREE.PlaneGeometry( comprimento, altura ); //lilás
    const materialC = new THREE.MeshBasicMaterial( {color: 0xb3b3ff, side: THREE.DoubleSide} );
    const planeC = new THREE.Mesh( geometryC, materialC );

    //centro é o c
    planeA.position.x = planeC.position.x + ( comprimento / 2  + espessura /2) //0.7
    planeB.position.x = planeC.position.x - ( comprimento / 2  +  espessura /2 )

    group.add(planeA);
    group.add(planeB);
    group.add(planeC);   
 
    return(group);
}