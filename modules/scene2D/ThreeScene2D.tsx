import React from 'react';
import * as THREE from 'three';
import DrawDraw from './DrawDraw';


class ThreeScene2D extends React.Component{
  
  mount: any;
  scene: any;
  camera: any;
  renderer: any; 
  frameId: any;
  poco: any;
  flycontrols: any;

  constructor(){ 
    super({});  
  
  }

  componentDidMount(){

    const width = this.mount.clientWidth;
    const height = (this.mount.clientHeight);
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 7


    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#ffffff')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    //ADD CUBE
    
    this.poco = DrawDraw(3);
    this.poco.position.x = -1.25;
    this.poco.position.y = 1;
    this.scene.add(this.poco);

    this.start()
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
   //this.plane.rotation.x += 0.01
   //this.plane.rotation.y += 0.01

   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){
    return(
      <div
        style={{ width: '30vw', height: '100vh' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
export default ThreeScene2D