import * as THREE from 'three';
import { Desvios } from '../../types/_desvios';
import { Fases } from '../../types/_fases';

interface ItemProps{
  fase: Fases[];
  desvio: Desvios[];
}


export function Fase( props: ItemProps ) {

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);  
  return (cube);


}
