import * as THREE from 'three';
import { Fases } from '../../types/_fases';
import { Desvios } from '../../types/_desvios';

interface FieldProps{
  fase: Fases[];
  desvio: Desvios[];
}


export function Fase( props: FieldProps | any ) {

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);  
  return (cube);


}
