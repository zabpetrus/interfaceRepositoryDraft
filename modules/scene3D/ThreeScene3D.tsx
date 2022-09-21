import React, { Component, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import * as THREE from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import Grids from './Grids';
import Field from './Field';

//'three/examples/fonts/helvetiker_bold.typeface.json';


class ThreeScene3D extends Component{

  
  mount: any;
  scene: any;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  field!: any;
  frameId: any;
  controls!: OrbitControls;
  flycontrols: any;

  constructor( props : any ){
    super({});
  } 

  componentDidMount(){   

    const width = window.innerWidth - (this.mount.clientWidth * 0.41) ;//this.mount.clientWidth - (this.mount.clientWidth * 0.41);
    const height = this.mount.clientHeight;   

    //ADD SCENE
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xD9D9D9 );

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
     1000
    );
    this.camera.position.set(15,15,15); //50,20,20      

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.autoClear = false;
    this.mount.appendChild(this.renderer.domElement);

    //ADD ORBITCONTROLS
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.flycontrols = new FlyControls( this.camera, this.renderer.domElement );
    this.flycontrols.movementSpeed = 100;
    this.flycontrols.rollSpeed = Math.PI / 24;
    this.flycontrols.autoForward = false;
    this.flycontrols.dragToLook = true;

    //FONTS
    let loader = new FontLoader(); //FontLoader is not part of the core library anymore since r133


     //copiado da pasta do Three e colado na pasta public
    loader.load( "helvetiker_regular.typeface.json", ( font : Font ) =>{     

      const wireframe = Grids( font );  
      this.scene.add(wireframe);

    });
    

    const axesHelper = new THREE.AxesHelper( 5 );
    axesHelper.position.set( 0.0, 0.0, 0.0);
    this.scene.add(axesHelper);    

    //ADD OBJECT
    this.field = Field();    
    
    this.scene.add(this.field);     
   
    //Finish
    this.controls.update();
    this.flycontrols.update(0.01);   

    this.start();
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
}


stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
  // this.field.rotation.x += 0.01
  // this.field.rotation.y += 0.01
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
   this.controls.update();
   this.flycontrols.update(0.01);
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}

resize = () =>{
  
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();
  this.renderer.setSize( window.innerWidth, window.innerHeight );  
}

render(){
    return(
      <div
        style={{ width: '100vw', height: '100vh' }}
        ref={(mount) => { this.mount = mount }}             
      />
    )
  }
}
export default ThreeScene3D