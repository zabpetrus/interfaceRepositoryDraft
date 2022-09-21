import * as THREE from 'three';
import { Group, Object3D, Vector3 } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { Font } from 'three/examples/jsm/loaders/FontLoader';


 //Convert triangles to quads
function ToQuads(g : any) {
  let p = g.parameters;
  let segmentsX = (g.type == "TorusBufferGeometry" ? p.tubularSegments : p.radialSegments) || p.widthSegments || p.thetaSegments || (p.points.length - 1) || 1;
  let segmentsY = (g.type == "TorusBufferGeometry" ? p.radialSegments : p.tubularSegments) || p.heightSegments || p.phiSegments || p.segments || 1;
  let indices = [];
  
  for (let i = 0; i < segmentsY + 1; i++) {
    let index11 = 0;
    let index12 = 0;
    for (let j = 0; j < segmentsX; j++) {
      index11 = (segmentsX + 1) * i + j;
      index12 = index11 + 1;
      let index21 = index11;
      let index22 = index11 + (segmentsX + 1);
      indices.push(index11, index12);
      if (index22 < ((segmentsX + 1) * (segmentsY + 1) - 1)) {
        indices.push(index21, index22);
      }
    }
    if ((index12 + segmentsX + 1) <= ((segmentsX + 1) * (segmentsY + 1) - 1)) {
      indices.push(index12, index12 + segmentsX + 1);
    }
  }
  g.setIndex(indices);
}

function generatePlaneGrid(width : number, height : number, widthSegments : number, heightSegments : number , color: string )
{
  let group = new Group();
  let gXY = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  ToQuads(gXY);
  let mXY = new THREE.LineBasicMaterial({color: color});
  let grXY = new THREE.LineSegments(gXY, mXY);
  grXY.layers.enableAll();
  group.add(grXY);
  return group;
    
}

function generateLabel( font: Font , n: number , gap: number, scale: number )
{
    
    const group = new Object3D();
    group.position.x = 0;
    var pos = group.position.x; //scale x = 10

    for(var i = 0; i < n + 1; i++){
      var text= i.toString();
      var obj = setLabelsObjects( font, text ); 
      obj.position.x = (pos + i) * gap *( 1 / 0.009 ) ;
      group.add(obj);
    }

    group.scale.x = scale * 0.009;
    group.scale.y = scale * 0.009;
    group.scale.z = scale * 0.009;
  
    return group;    
}


 function getGrids( font: Font ){

    //PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)

    let grXY = generatePlaneGrid( 1, 1, 6, 3, "white");
    var lb1 =  generateLabel( font, 6, 1.11, 0.15 );
    lb1.position.y = 0.52;
    lb1.position.x = -0.52;

    grXY.add(lb1);
    grXY.scale.set(10, 10, 1);
    grXY.position.set(0, 0, -2);
    
   
    let grXZ = generatePlaneGrid( 1, 1, 6, 10, "white");
    grXZ.scale.set(10, 4, 1);
    grXZ.rotation.x = Math.PI * -0.5;
    grXZ.position.set(0, -5, 0);

    
    let grYZ = generatePlaneGrid( 1, 1, 3, 10, "white");
    var m = generateLabel( font, 3, 2.11, 0.15 );
    m.position.z = 0;
    m.position.x = -0.5;
    m.position.y = -0.7;
    m.rotateZ( Math.PI * 90 );
    grYZ.add( m);
    grYZ.scale.set(10, 4, 1);
    grYZ.rotation.x = Math.PI * -0.5;
    grYZ.rotation.y = Math.PI / 2;
    grYZ.position.set(-5, 0, 0);

   
    const group = new THREE.Object3D()
    group.add(grXY);
    group.add(grXZ);
    group.add(grYZ); 

   
    return group;  
 }
//espuma expansiiva

function setLabelsObjects( font: Font, text: string )
{
    const geometry = new TextGeometry( text, {
      font: font,
      size: 30,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 5
    });

    const material = new THREE.MeshBasicMaterial( { color: 0x330033, opacity: 1, transparent: false } );

    const plane = new THREE.Mesh( geometry, material ); 
    return plane;
    }

export default function Grids( font : Font ){

  const grids = getGrids( font );
 // const lb = setLabelsObjects(font, 'Hello three.js!');
 // lb.scale.x = .009;
 // lb.scale.y = .009;
 // lb.scale.z = .009;  

  const group = new THREE.Object3D()
  group.add(grids);
 // group.add(lb);
  
  return group;  
    
}

