import * as THREE from "three";
import Segments from './Segments';



/**
 * 
 * @returns {THREE.Mesh}
 */
function Broca()
{
    const shape = new THREE.Shape();   
    
    const points = [];
    points.push( new THREE.Vector2( -2.0, 0 ) );
    points.push( new THREE.Vector2( -2.0, -5 ) );
    points.push( new THREE.Vector2( -2.1, -5 ) );
    points.push( new THREE.Vector2( -2.1, -5.5 ) );

    points.push( new THREE.Vector2( -1.7, -5.5 ) );
    points.push( new THREE.Vector2( -1.7, -5 ) );
    points.push( new THREE.Vector2( -1.8, -5 ) );
    points.push( new THREE.Vector2( -1.8, 0 ) ); 
    points.push( new THREE.Vector2( -2.0, 0 ) );

   shape.setFromPoints( points );

   const geometry = new THREE.ShapeGeometry( shape ); 

   const meshparametrers : THREE.MeshBasicMaterialParameters = { 
    color: 0xff00ff, 
    side: THREE.FrontSide,
    polygonOffset: true,
    polygonOffsetUnits: -6, //z-index
    reflectivity: 0,
    vertexColors: false, //desliga as cores
    wireframe: false,
   };

   const material = new THREE.MeshBasicMaterial ( meshparametrers ); 
   const plane = new THREE.Mesh( geometry, material );  
   return(plane);
}


/**
 * 
 * @returns {THREE.Line}
 */
function ground( pa : number, pb : number, y : number ){
    const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
    const points = [];
    points.push( new THREE.Vector2( pa, y ));
    points.push( new THREE.Vector2( pb, y ) );  
  
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    return line;
  }

  /**
 * 
 * @returns {THREE.Group}
 */  
  function linhaPoco(){
  
    const group = new THREE.Group();  
    const groundA = ground( 1, 2, 0 );
    groundA.position.x = -1
    groundA.position.y = 2
  
    group.add(groundA)
  
    const groundB= ground( 3, 4, 0 );
    groundB.position.x = -4.8
    groundB.position.y = 2
    group.add(groundB)
  
    return group;
  
  }
  
  
/**
 * @param nfases: number
 * @returns {THREE.Group}
 */

function DesenharPoco2D( nfases : number )
{
  const group = new THREE.Group();  
  
  group.add( linhaPoco() );
 
  var posInicial = 1.35;
  var altura = 1.3;
  var espessura = 0.2;
  var comprimento = 1.3;

  for(var i = 0; i < nfases; i++){
    const fase = Segments( altura, comprimento, espessura );
    fase.position.x = - 0.4; 
    fase.position.y = posInicial - (i * altura);
    comprimento -= 0.2;  
    group.add(fase);
  } 
   

  const broca = Broca();
  broca.position.x = 1.5
  broca.position.y = 3
  group.add(broca)

  return group;
}


export default function DrawDraw( props : any )
{
    return DesenharPoco2D( 4 );

}