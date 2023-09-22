import React from "react";
import * as THREE from "three";
import { Desvios } from "../../types/_desvios";
import { Fases } from "../../types/_fases";
import { OrbitControls } from "../../three/examples/jsm/controls/OrbitControls";
import { Grade } from "./Grade";
import { Pexer } from "./Pexer";
import { connect, useSelector } from "react-redux";


interface FieldProps {
  phase:  Fases[];
  desvio: Desvios[];
}

const mapStateToProps = (state: FieldProps) => ({
  phase: state.phase,
  desvio: state.desvio,
});


class Elements3D extends React.Component<any>{
  
    mount?: any;
    scene: any;
    camera: any;
    renderer: any; 
    frameId: any;
    poco: any;
    flycontrols: any;
    resizeObserver : any;
  
   // constructor(){ super({}); }
  
    componentDidMount(){
  
    var width = 1024;
    var height = 768;

    const { numPhases, numDetours } = this.props;

      if(this.mount != null){
        width = (this.mount.clientWidth);
        height = (this.mount.clientHeight);
      }           

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
      this.renderer.setSize(width, height);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.mount.appendChild(this.renderer.domElement)

      //ADD LIGHT
      const light = new THREE.PointLight( 0xffffff, 1, 100 );
      light.position.set( 0, 10, 4 );
      light.castShadow = true; // default false
      light.shadow.mapSize.width = 512; // default
      light.shadow.mapSize.height = 512; // default
      light.shadow.camera.near = 0.5; // default
      light.shadow.camera.far = 500; // default

      this.scene.add(light);       

      //ADD CUBE  
      const podos = Pexer(numPhases, numDetours);   
      this.scene.add(podos);   
  

      const aptel = Grade();
      this.scene.add(aptel) ;

      this.flycontrols = new OrbitControls(this.camera, this.renderer.domElement );
      this.flycontrols.update();

      this.resizeObserver = new ResizeObserver(this.handleWindowResize);
      this.resizeObserver.observe(this.mount);
      this.handleWindowResize();

 
      this.start()
    }
  componentWillUnmount(){
      this.stop()
      this.mount.removeChild(this.renderer.domElement)
   }

  componentDidUpdate(prevProps : any) {
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
  export default connect(mapStateToProps)( Elements3D ) 

