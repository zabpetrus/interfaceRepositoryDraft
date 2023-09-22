import { connect, useSelector } from 'react-redux';
import { AppState } from '../../contexts/MainContext';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BehaviorSubject,  distinctUntilChanged,  tap } from 'rxjs'

interface Props {
    isActive2D: boolean;
    isActive3D: boolean; 
}


const mapStateToProps = (state: any) => ({
    isActive2D: state.isActive2D,
    isActive3D: state.isActive3D,
    phase: state.phase
});

  
const CppSection2D = (props: Props) => {  

    const phase = useSelector((state: AppState ) => state.phase);
    const desvio = useSelector((state: AppState ) => state.desvio);

    const numPhases = useSelector((state: any) => state.numPhases);

    
    var classmate = `col-lg-3`;

    if((props.isActive2D && props.isActive3D) || (!props.isActive2D && !props.isActive3D ) ){
        classmate = `col-lg-3`;
    }
    else if(!props.isActive2D && props.isActive3D){
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

        const scene = new THREE.Scene();
        sceneRef.current = scene;


        const camera = new THREE.PerspectiveCamera( 75,   container.clientWidth / container.clientHeight, 0.1, 1000 );
        cameraRef.current = camera;
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current = renderer;
        renderer.setSize(container.clientWidth, container.clientHeight);

        var objeto = new THREE.Object3D();
        var altura = 0.8;        
  

        //Paredes
        const paredeGeometry = new THREE.BoxGeometry( 0.2, 1, 0 );
        const materialParedeGeometry = new THREE.MeshBasicMaterial( { color: 0xFFC926 } );
        const parede = new THREE.Mesh( paredeGeometry, materialParedeGeometry );

       
      
        var size = 1;

        for( var i = 1; i < numPhases + 1; i++)
        {
            const tamanho = size;
            const geometry = new THREE.BoxGeometry( tamanho, 1,  0 );
            const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            const cube = new THREE.Mesh( geometry, material );
            
            cube.position.y = altura - i;

            //copiando a posição do cubo a direita
            const posicaoAlvo1 = cube.position.clone();
            const deslocamento1 = new THREE.Vector3(tamanho * 0.6, 0, 0);
            posicaoAlvo1.add(deslocamento1);

            //copiando a posição do cubo a esquerda
            const posicaoAlvo2 = cube.position.clone();
            const deslocamento2 = new THREE.Vector3(tamanho * -0.6, 0, 0);
            posicaoAlvo2.add(deslocamento2);           

            const paredeClonedObject1 = parede.clone();
            const paredeClonedObject2 = parede.clone();

            paredeClonedObject1.position.copy( posicaoAlvo1 );
            paredeClonedObject2.position.copy( posicaoAlvo2 );
            

            objeto.add(cube);
            objeto.add(paredeClonedObject1);
            objeto.add(paredeClonedObject2);  
          
            size -= 0.2;
          
        }
        
        var dx =  (numPhases);   
        objeto.position.y = (4.14 * numPhases) / 10;   
        
        

         //Broca
        const brocaGeometry = new THREE.PlaneGeometry( 0.15, dx );
        const brocaMaterial = new THREE.MeshBasicMaterial( {color: 0x0085B2, side: THREE.DoubleSide} );
        const brocaMesh = new THREE.Mesh( brocaGeometry, brocaMaterial );

        const posicaoAlvo3 = objeto.position.clone();
        var seg = -0.9 * numPhases + 0.25

        const deslocamento3 = new THREE.Vector3(0 , seg, 0);
        posicaoAlvo3.add(deslocamento3);       

        brocaMesh.position.copy(posicaoAlvo3);


        objeto.add(brocaMesh);


        scene.add( objeto );

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
        var curr = containerRef.current
        return () => {
        // Limpar recursos quando o componente for desmontado
        window.removeEventListener('resize', handleResize);
        
        if (curr && rendererRef.current) {
            curr.removeChild(rendererRef.current.domElement);
        }
        subscription.unsubscribe();
        };
            
    }, [phase, desvio, valorObservable, numPhases])

   
    return (
    <div className={'sectbi bg-primary '+ classmate }>     
        <p>2D Status: {props.isActive2D ? 'Active' : 'Inactive'}</p>
        <div>
          <span>Fases:  { JSON.stringify( phase )} </span> 
          <span>Desvios: { JSON.stringify(desvio)} </span>
          <div  ref={containerRef}  style={{ width: '100%', height: '80vh' }}></div>          
          
        </div>
    
    </div>);
};

export default connect(mapStateToProps )(CppSection2D);

