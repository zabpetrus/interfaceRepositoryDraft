import React from 'react';
import * as THREE from 'three';
import { Fases } from '../../types/_fases';


/**
 * Criar o fundo do poço
 * @param {number} largura 
 * @param {number} altura 
 * @param {number} offset 
 * @returns <THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>
 */ 
export function blocofundopoco( largura: number, altura : number, offset : number )
{
    const geometry = new THREE.BoxGeometry( largura, altura, offset );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const backgroundpoco = new THREE.Mesh( geometry, material );
    return backgroundpoco;

}


/**
 * Clonar os objetos simetricamente em relação ao eixo y
 * @param {THREE.Mesh} objetocopiado 
 * @param {THREE.Mesh} objetoorigempos 
 * @param {number} posx 
 * @param {number} posy 
 * @param {number} posz 
 * @returns {THREE.Group}
 */
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

/**
 * Valida a entrada e verifica se o index e a chave existem na entrada e retorna este valor
 * @param {Array} phases  
 * @param {number} index 
 * @param {string} key 
 * @returns {number}
 */
export function validaPhase(phases: Fases[] | undefined, index: number, key: string | undefined): number {
    if (typeof index !== "number" || phases === undefined || key === undefined) {
        return 0; // Valor padrão
    }

    const phase = phases[index];
    if (phase && key in phase) {
        return phase.od || 0; // Se "od" for indefinido, retorna 0
    }

    return 0; // Valor padrão
}


/**
 * Converte o valor da entrada do OD em um texto
 * @param {number} phase_od_value 
 */
export function labelOD( phase_od_value: number )
{
    switch(phase_od_value){
        case 1:
            return "5 1/2\" casing";
        case 2:
            return "7\" casing";
        case 3:
            return "9 5/8\" casing";
        case 4:
            return "10 3/4\" casing";
        case 5:
            return "13 3/8\" casing";
        case 6:
            return "16\" casing";
        case 7:
            return "18 5/8\" casing";
        case 8:
            return "20\" casing";
        case 9:
            return "22\" casing";
        case 10:
            return "30\" casing";
        default:
            return "text_label";            
        
    }
}
