import  * as THREE from 'three';
import { Fases } from '../../types/_fases';
import { Desvios } from '../../types/_desvios';


interface FieldProps {
  phase:  Fases[];
  desvio: Desvios[];
}



export function Pexer( numPhases : number , numDetours : number): any {

  const objeto = new THREE.Object3D();

  var tam = 0;
  var numphase = numPhases;
  var altura = 1;
  const pontos = [];  

  pontos.push( new THREE.Vector3(0, 0, 0) );

  for(var i = 0; i < tam; i++){

    numphase = numphase + 1;
    altura = (-1) * numphase;
    pontos.push( new THREE.Vector3(0, altura, 0) );
  }

  pontos.push( new THREE.Vector3(0, -1, 0) );
  pontos.push( new THREE.Vector3(0, -2, 0) );
  pontos.push( new THREE.Vector3(1, -3, 0) );


  const curve = new THREE.CatmullRomCurve3( pontos );

  //const curveObject = new THREE.Line( lineGeometry, lineMaterial );

  const xgeometry = new THREE.TubeGeometry( curve, 30, 0.1, 10, false );
  const xmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const mesh = new THREE.Mesh( xgeometry, xmaterial );

  objeto.add(mesh);
  objeto.receiveShadow = true;
  objeto.castShadow = true;


 return (objeto);
}
