import React from 'react';
import * as THREE from 'three';


export function blocofundopoco( largura: number, altura : number, offset : number )
{
    const geometry = new THREE.BoxGeometry( largura, altura, offset );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const backgroundpoco = new THREE.Mesh( geometry, material );
    return backgroundpoco;

}
// clonarobjetoeposicaosimetria( parede, fundo, lr)
export function clonarobjetoeposicaosimetria( objetocopiado : THREE.Mesh, objetoorigempos: THREE.Mesh, posx : number, posy: number, posz: number )
{ 
    const group = new THREE.Group();

    const mirrorLeft = objetocopiado.clone();
    const mirrorRight = objetocopiado.clone();

    const posicaoAlvo1 = objetoorigempos.position.clone();
    const deslocamento1 = new THREE.Vector3(posx, posy, posz);
    posicaoAlvo1.add(deslocamento1);

    //copiando a posição do objeto a esquerda
    const posicaoAlvo2 = objetoorigempos.position.clone();
    const deslocamento2 = new THREE.Vector3(-posx, posy, posz);
    posicaoAlvo2.add(deslocamento2); 
    
    mirrorLeft.position.copy( posicaoAlvo1 );
    mirrorRight.position.copy( posicaoAlvo2 );

    group.add(mirrorLeft);
    group.add(mirrorRight);

    return group;
}
