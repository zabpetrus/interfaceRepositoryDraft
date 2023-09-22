import React from "react";
import * as THREE from "three";
import { Fase } from "./Fase";
import { Grid } from "./Grid";
import { Fases } from "../../types/_fases";
import { Desvios } from "../../types/_desvios";


interface FieldProps {
  fase: Fases[];
  desvio: Desvios[];
}

class Elements2D extends React.Component<FieldProps>{
  
    mount: any;
    scene: any;
    camera: any;
    renderer: any; 
    frameId: any;
    poco: any;
    flycontrols: any;
    resizeObserver : any;


  
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor( props: FieldProps){ 
      super(props);  
      this.mount = null;    
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

      this.camera.position.z = 7;
      this.scene.background = new THREE.Color( 0x000000 );
  
  
      //ADD RENDERER
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(width, height)
      this.mount.appendChild(this.renderer.domElement)
      //ADD CUBE  

      this.poco = Fase( this.props);
      this.poco.position.x = 0;
      this.poco.position.y = 0;
      this.scene.add(this.poco);

      const aptel = Grid();
      this.scene.add(aptel) ;

      this.resizeObserver = new ResizeObserver(this.handleWindowResize);
      this.resizeObserver.observe(this.mount);
      this.handleWindowResize();

      this.start()
    }
  componentWillUnmount(){
      this.stop()
      this.mount.removeChild(this.renderer.domElement)
      this.resizeObserver.disconnect();
   }
  
  
  start = () => {
      if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
      }
  }

  handleWindowResize = () => {    
   
    this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.camera.aspect = this.mount.clientWidth / this.mount.clientHeight;
    this.camera.updateProjectionMatrix();
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
          style={{ width: '100%', height: '80vh' }}
          ref={(mount) => { this.mount = mount }}
        />
      )
    }
  }
  export default Elements2D