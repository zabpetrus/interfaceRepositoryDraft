import { THREE} from '../ThreeLibCallback';


const CurvePoints3D = (numPhases : number, numDetours: number) => {
    const pontos = [];
            
    var j = 0;
    for( var i = 0; i < numPhases+1; i++){

        if(i === numDetours){
            j += 1;
        }
        pontos.push( new THREE.Vector3(0, -i, j) );    
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
