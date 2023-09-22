import React, { useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { AppState } from '../../contexts/MainContext';
import { BehaviorSubject, distinctUntilChanged, tap } from 'rxjs';
import * as THREE3D from 'three';
import { Grade } from '../Elements3D/Grade';
import { OrbitControls } from '../../three/examples/jsm/controls/OrbitControls';

interface Props {
    isActive2D: boolean;
    isActive3D: boolean;
}

const mapStateToProps = (state: any) => ({
    isActive2D: state.isActive2D,
    isActive3D: state.isActive3D,
    phase: state.phase
});

const CppSection3D = (props: Props) => {

    
    var phase = useSelector((state: AppState ) => state.phase);
    var desvio = useSelector((state: AppState ) => state.desvio);

    const numPhases = useSelector((state: any) => state.numPhases);
    const numDetours = useSelector( (state: any) => state.numDetours);


    var classmate = `col-lg-6`;

    if((props.isActive2D && props.isActive3D) || (!props.isActive2D && !props.isActive3D ) ){
        classmate = `col-lg-6`;
    }
    else if(props.isActive2D && !props.isActive3D){
        classmate = `col-lg-9`;
    }
    else{
        classmate = `hidden`;
    }  


    const containerRef = useRef<HTMLDivElement | null>(null);
    const sceneRef = useRef<React.MutableRefObject<THREE.Scene> | null | THREE.Scene | any >(null);
    const cameraRef = useRef<React.MutableRefObject<THREE.Camera> | null | THREE.Camera | any >(null);
    const rendererRef = useRef< React.MutableRefObject<any> | any  >(null);

    const valorReduxSubject = new BehaviorSubject(phase);
   
    const valorObservable = valorReduxSubject.pipe(
        distinctUntilChanged(),
        tap((valorReduxSubject) => {
        // Execute a ação desejada aqui toda vez que o valorRedux mudar
        console.log(`Valor da fase mudou para: ${valorReduxSubject}`);   
        })
    ); 
    

    useEffect(() => {
        
        const subscription = valorObservable.subscribe();
        
        if (!containerRef.current) return;

        var container = containerRef.current;

        const scene = new THREE3D.Scene();
        sceneRef.current = scene;


        const camera = new THREE3D.PerspectiveCamera( 75,   container.clientWidth / container.clientHeight, 0.1, 1000 );
        cameraRef.current = camera;
        camera.position.z = 5;

        const renderer = new THREE3D.WebGLRenderer({ antialias: true });
        rendererRef.current = renderer;
        renderer.setSize(container.clientWidth, container.clientHeight);



        const pontos = [];
        
        var j = 0;
        for( var i = 0; i < numPhases+1; i++){

            if(i === numDetours){
                j += 1;
            }
            pontos.push( new THREE3D.Vector3(0, -i, j) );  
            
                         
        }

        const customCurve = new THREE3D.CatmullRomCurve3(pontos, false, 'chordal');

        // Crie um tubo ao longo da curva (aqui, você pode definir o raio para controlar a espessura)
        const tubeGeometry = new THREE3D.TubeGeometry(customCurve, 100, 0.1, 8, false);
        const tubeMaterial = new THREE3D.MeshBasicMaterial({ color: 0x00ff00 });
        const tubeMesh = new THREE3D.Mesh(tubeGeometry, tubeMaterial);
        scene.add(tubeMesh);

        tubeMesh.position.y = 3;
    
        
        


  
        const aptel = Grade();
        scene.add(aptel) ;
  
        const flycontrols = new OrbitControls(camera, renderer.domElement );
        flycontrols.update();


        container.appendChild(renderer.domElement);

        const handleResize = () => {
            if (!containerRef.current) return;
            const newWidth = containerRef.current.clientWidth;
            const newHeight = containerRef.current.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        const animate = () => {
            requestAnimationFrame(animate);      
            // Atualize o conteúdo da cena aqui      
            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };

        animate();
        var curr = containerRef.current;
        return () => {
        // Limpar recursos quando o componente for desmontado
        window.removeEventListener('resize', handleResize);
        if (curr && rendererRef.current) {
           curr.removeChild(rendererRef.current.domElement);
        }
        subscription.unsubscribe();
        };
            
    }, [phase, desvio, valorObservable, numPhases, numDetours])




    

    return (
        <div className={'secttri bg-light ' + classmate }>
            <p>3D Status: {props.isActive3D ? 'Active' : 'Inactive'}</p>
            <div>
            <span>Fases:  { JSON.stringify( phase )} </span> 
            <span>Desvios: { JSON.stringify(desvio)} </span>
            <div  ref={containerRef}  style={{ width: '100%', height: '80vh' }}></div>          

            </div>
        </div>
    );
};

export default connect(mapStateToProps)(CppSection3D);

