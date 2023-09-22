import * as THREE from "three";
import { FontLoader } from "../../three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "../../three/examples/jsm/geometries/TextGeometry";

export function Grid() {

    const objeto = new THREE.Object3D();
    const loader = new FontLoader();

    loader.load("gentilis_regular.typeface.json", function (font : any) {

      const textGeo = new TextGeometry("THREE.JS", {
        font: font,
        size: 4,
        height: 0.01,
        curveSegments: 2,
        bevelThickness: 2,
        bevelSize: 0.01,
        bevelEnabled: true,
      });
      textGeo.computeBoundingBox();

      const textMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
      });
      const mesh = new THREE.Mesh(textGeo, textMaterial);
      mesh.position.set(-1, 0, 0);
      mesh.rotation.set(0,0,0);
      mesh.scale.set(0.1, 0.1, 0.1);

      objeto.add(mesh);

      // Adicione o mesh à cena aqui ou chame uma função que faça isso.
      // Exemplo: scene.add(mesh);
    });

    objeto.position.set( 0, 0, 0 );
    return objeto;
  }
