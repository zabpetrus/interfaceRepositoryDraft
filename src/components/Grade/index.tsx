import * as THREE from "three";
import { FontLoader } from "../../three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "../../three/examples/jsm/geometries/TextGeometry";
import { extend } from '@react-three/fiber';

export function Grade() {

    extend({ TextGeometry })
    const objeto = new THREE.Object3D();
    
    var l1 = 100;
    var l2 = l1 / 2 ;
    const colorText = 0x000000;

    const gridX = new THREE.GridHelper(l1, 2, 0x00ff00, 0x808080);
    gridX.position.set(0, -l2, 0); // Posição do GridHelper no eixo X - verde
    objeto.add(gridX);

    const gridY = new THREE.GridHelper(l1, 6, 0xff0000, 0x808080); 
    gridY.position.set(0, 0, -l2); // Posição do GridHelper no eixo Y - vermelho
    gridY.rotation.x = Math.PI / 2; // Rotação para alinhar com o eixo Y 
    objeto.add(gridY);

    const gridZ = new THREE.GridHelper(100, 4, 0x0000ff, 0x808080);
    gridZ.position.set( -l2, 0, 0); // Posição do GridHelper no eixo Z
    gridZ.rotation.z = Math.PI / 2; // Rotação para alinhar com o eixo Z
    objeto.add(gridZ);


    const loader = new FontLoader();

    loader.load("gentilis_regular.typeface.json", function (font : any) {
        

      const spacingX = 9.5; // Espaçamento entre os números
      const startPositionX = -l2; // Posição inicial em Z: origem L2


        for (let i = 0; i <= 100; i += 50) {
            var ip = i.toString();
            const textGeometryX = new TextGeometry(ip,{
              font: font,
              size: 3.5,
              height: 1,
            })

            const textMaterialX = new THREE.MeshBasicMaterial({ color: colorText });
            const textMeshX = new THREE.Mesh(textGeometryX, textMaterialX);

            const positionX = startPositionX + i / 10 * spacingX;
            textMeshX.position.set(positionX, -l2, l2); // Posição do número no eixo X
            objeto.add(textMeshX);
        }

        const spacingY = l2 / 6; // Espaçamento entre os números
        const startPositionY = -l2; // Posição inicial em Z: origem L2

        for (let i = 0; i <= 120; i += 20) {
            const textGeometryY = new TextGeometry(i.toString(), {
              font: font,
              size: 3.5,
              height: 1,
            });
        
            const textMaterialY = new THREE.MeshBasicMaterial({ color: colorText });
            const textMeshY = new THREE.Mesh(textGeometryY, textMaterialY);

            const positionY = startPositionY + i / 10 * spacingY;
            textMeshY.position.set(l2 , positionY, -l2); // Posição do número no eixo Y
            objeto.add(textMeshY);
          }

          //O plano azul

          const spacingZ = 12.8; // Espaçamento entre os números
          const startPositionZ = -l2; // Posição inicial em Z: origem L2

          for (let i = 0; i <=  80; i += 20) {
            const textGeometryZ = new TextGeometry(i.toString(), {
              font: font,
              size: 3.5,
              height: 1,
            });
        
            const textMaterialZ = new THREE.MeshBasicMaterial({ color: colorText });
            const textMeshZ = new THREE.Mesh(textGeometryZ, textMaterialZ);

            const positionZ = startPositionZ + i / 10 * spacingZ;
            textMeshZ.position.set(-l2, l2, positionZ); // Posição do número no eixo Z
            textMeshZ.rotateY( 90 )
            objeto.add(textMeshZ);
          }
        
    });

    objeto.position.set( 0, 0, 0 );
    objeto.scale.set(0.08, 0.08, 0.08);
    return objeto;
  }
