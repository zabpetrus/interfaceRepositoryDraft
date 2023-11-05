import React from 'react';
import { THREE } from '../ThreeLibCallback';
import { Fases } from '../../types/_fases';
import { Observable } from 'rxjs';


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
export function cloneSimetricObject( objetocopiado : THREE.Mesh, objetoorigempos: THREE.Mesh, posx : number, posy: number, posz: number )
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
export function validaPhase(phases: Fases[] , index: number, key: string): number {

     // Verifica se os argumentos são válidos
    if (typeof index !== "number" || phases === undefined || key === undefined) {

        //encerro a aplicação porque a entrada é necessária para a próxima etapa
        throw new Error("Argumentos indefinidos ou inválidos");  
     }
    
     // Obtém a fase a partir do índice
      const app: any = phases[index];
      
       // Verifica se a fase existe e se a chave especificada existe na fase
      if (app && app[key] !== undefined) {

        // Retorna o valor da chave
        return app[key];
      }
    
     // Retorna um valor padrão (0) se a chave não for encontrada e mostra um label padrão
      return 0;

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
            return "---";            
        
    }
}

export function createLineEarth( comp_linha_terra : number, alt_linha_terra: number ) {
    const floor = [];
    floor.push( new THREE.Vector3( -comp_linha_terra, alt_linha_terra, 0 ) );
    floor.push( new THREE.Vector3( 0, alt_linha_terra, 0 ) );
    floor.push( new THREE.Vector3( comp_linha_terra, alt_linha_terra, 0 ) );
    


    //A linha da terra
    const floorgeometry = new THREE.BufferGeometry().setFromPoints( floor );
    const floormaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    const floorline = new THREE.Line( floorgeometry, floormaterial );
    return floorline;
}


export function lastFieldBuilder(numPhases : number, altura: number, size: number, altura_da_parede: number,fator_posicionamento: number  )
{
    const group = new THREE.Group();

     //Última parede - Material
     const paredeAlteradaGeometryLined =  new THREE.MeshBasicMaterial( { color: 0xff00ff } );

     //Última parede - Geometria
     const paredefinageometry = new THREE.BoxGeometry( 0.05, altura_da_parede, fator_posicionamento );
 
     //Última parede - composiçaõ geometria / naterial
     const paredelined = new THREE.Mesh( paredefinageometry, paredeAlteradaGeometryLined);
 
    //As útimas paredes. Elas são colocadas separadamente
     const ultimaparedeesquerda = paredelined.clone();
     const ultimaparededireita = paredelined.clone(); 

    var lastfase = numPhases - altura;             
    
    ultimaparedeesquerda.position.set(-size * 0.5, -lastfase, 0);
    ultimaparededireita.position.set(size * 0.5, -lastfase, 0);
  
    group.add(ultimaparedeesquerda);
    group.add(ultimaparededireita);

    return group;
}


/**
 * Metodo generico para observar algo
 * @param valueToObserve 
 * @returns 
 */
export function observeValue( valueToObserve : any) {
    return (source: { subscribe: (arg0: { next: (value: any) => void; error: (error: any) => void; complete: () => void; }) => void; }) => {
      return new Observable((observer) => {
        source.subscribe({
          next: (value) => {
            if (value === valueToObserve) {
              // Faça ação específica quando o valor desejado for emitido
              console.log(`Valor ${valueToObserve} foi emitido, ação específica disparada.`);
            }
            observer.next(value);
          },
          error: (error) => {
            observer.error(error);
          },
          complete: () => {
            observer.complete();
          }
        });
      });
    };
  }


