import { THREE } from '../ThreeLibCallback';



const params = {
    spline: 'GrannyKnot',
    scale: 4,
    extrusionSegments: 100,
    radiusSegments: 10,
    closed: false,
    animationView: false,
    lookAhead: false,
    cameraHelper: false,
};

const Lined3D = (objetoPai: THREE.Object3D<THREE.Object3DEventMap>) => {

  
    const pipeSpline = new THREE.CatmullRomCurve3( [


        new THREE.Vector3( 1, 9 - 10 ),
        new THREE.Vector3( 0, 10, - 10 ), 
        new THREE.Vector3( 0, 20, - 10 ), 
        new THREE.Vector3( 0, 30, - 10 ),
        
    ] );

    const material = new THREE.MeshLambertMaterial( { color: 0xff00ff } );
	const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0xcc00cc, opacity: 0.3, wireframe: true, transparent: true } );

    var geometry = new THREE.TubeGeometry( pipeSpline, params.extrusionSegments, 2, params.radiusSegments, params.closed );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.scale.set( 0.1, 0.1, 0.1);
   
	const wireframe = new THREE.Mesh( geometry, wireframeMaterial );
	mesh.add( wireframe );


    objetoPai.add( mesh )

};

export default Lined3D;
