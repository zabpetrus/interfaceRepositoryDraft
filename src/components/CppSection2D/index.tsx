import { connect, useSelector } from 'react-redux';
import { AppState } from '../../contexts/MainContext';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BehaviorSubject,  distinctUntilChanged } from 'rxjs'
import { MeshBasicMaterial } from '../../three/build/three.cjs';
import { FontLoader } from '../../three/examples/jsm/loaders/FontLoader';
import AppTextLoader from '../AppTextLoader';
import { blocofundopoco, clonarobjetoeposicaosimetria } from '../AppBlocks';

interface Props {
    isActive2D: boolean;
    isActive3D: boolean; 
}

/**
 * Esta função é um mapeador de estado. Recebe o estado global(state) da aplicação redux
 * como um parâmetro e retorna um objeto que mapeia partes deste estado para as props do componente
 * conectado. Então, estão sendo monitorados isActive2D, isActive3D, fase e o desvio
 * @param state 
 * @returns 
 */
const mapStateToProps = (state: any) => ({
    isActive2D: state.isActive2D,
    isActive3D: state.isActive3D,
    phase: state.phase
});

 /**
 * Componente React responsavel pelo desenho 2D na tela. Ele recebe as props mapeadas pelo mapStateToProps, possibilitando ao render para 
 * acessar o estado global da aplicaçaõ
 * @param props 
 * @returns 
 */ 
const CppSection2D = (props: Props) => {  

     /**
     * Criação de hooks para criar e manter uma referência a um elemento DOM ou um valor mutável que não causa
     * a re-renderização do componente quando é modificado. Considerando que a todos os valores são mutáveis,
     * é bom colocar a referÊncia.
     */
    var phase = useSelector((state: AppState ) => state.phase);
    var desvio = useSelector((state: AppState ) => state.desvio);
    var numPhases = useSelector((state: any) => state.numPhases);

  
    /**
     * Aqui faço o controle do tamanho do componente com o bootstrap. Ele regula os tamanhos das telas
     * No caso, estou garantido isso trocando as classes do bootstrap
     */
    var classmate = `col-lg-3`; //O tamanho inicial da janela 2D da cena. Ou seja, 25% da tela

    if((props.isActive2D && props.isActive3D) || (!props.isActive2D && !props.isActive3D ) ){
        classmate = `col-lg-3`; //Se estiver os dois ativos ou inativos, manterá o tamanho de 25% da tela
    }
    else if(!props.isActive2D && props.isActive3D){
        classmate = `col-lg-9`; //Se está inativo, muda para 100% da área restante,sem ser o sidebar
    }
    else{
        classmate = `hidden`; //Quando a outra tela está com col-lg-9, esta tem que ser oculta
    }


   /**
     * Criação de hooks para criar e manter uma referência a um elemento DOM ou um valor mutável que não causa
     * a re-renderização do componente quando é modificado. Considerando que a todos os valores são mutáveis,
     * é bom colocar a referÊncia. O container, a cena, a posição da câmera e o produto(render) são mutáveis
     * devido ao escalonamento da tela (resize screen e acionamento dos botões 2D e 3D)
     */
    const containerRef = useRef<HTMLDivElement | null>(null);
    const sceneRef = useRef<React.MutableRefObject<THREE.Scene> | null | THREE.Scene | any >(null);
    const cameraRef = useRef<React.MutableRefObject<THREE.Camera> | null | THREE.Camera | any >(null);
    const rendererRef = useRef< React.MutableRefObject<any> | any  >(null);

    /**
     * O BehaviorSubject é um dos observables fornecidos pela biblioteca RxJS. Ele mantém o "valor atual" da variável e emite esse valor 
     * imediatamente para qualquer novo assinante. Ele também emite valores subsequentes quando o valor subjacente é alterado. 
     * É útil quando queremos manter e ter acesso ao valor atual de alguma fonte que possa ser mudada pelo tempo. 
     */
    const valorReduxSubject = new BehaviorSubject(phase);
   

    /**
     * Garante que o observador dispare quando ocorre mudanças no valor.
     * Isso é útil para evitar re-renderizações ou ações desnecessárias quando o estado não mudou
     */
    const valorObservable = valorReduxSubject.pipe(
        distinctUntilChanged(),      
    ); 
    

    useEffect(() => {
        
       //Inscrevendo para atualizações no estado do componente através do valorObservable
        const subscription = valorObservable.subscribe();
        
        //Verficando se o container foi renderizado. Se não, aborta
        if (!containerRef.current) return;

        //Atribuindo o container válido a uma variável
        var container = containerRef.current;
    
        //Criando uma cena e atribuindo a uma referencia de objeto mutável
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        sceneRef.current.background = new THREE.Color(0xF0F4F2); 

      

                //Criando uma câmera, posicionando -a e a atribuindo a uma referencia de objeto mutável
                const camera = new THREE.PerspectiveCamera( 75,   container.clientWidth / container.clientHeight, 0.1, 1000 );
                camera.position.z = 5;
                cameraRef.current = camera;
                
                //Criando um renderer, determinando seu valor inicial e atribuindo a uma referencia de objeto mutável
                const renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setSize(container.clientWidth, container.clientHeight);
                rendererRef.current = renderer;
                

                var objeto = new THREE.Object3D();
                var altura = 0.8;
                
                
             /**
             * Valores iniciais para o desenho
             * Serve para quando o valor inicial for nulo
             */
                var od = 0;
                var nome = "";
                var tipo = "";
                var dia = 0;
                var hanger = 0;
                var sapata = 0;
                var toc = 0;
                var mw = 0; 
            
            
                //largura do poço
                var size = 1;

                //Controle do espaçamento inicial
                var posini = 0.28;  

      

                //Figuras base. Não serão utilizadas, mas suas cópias serão utilizadas

                //largura da parede, altura e aproximação. Este valor é para afastar um pouco, dando a impressão de camada 
                const paredeGeometry = new THREE.BoxGeometry( 0.1, 1, 0.1 );

                //Cor da parede: amarelo
                const materialParedeGeometry = new THREE.MeshBasicMaterial( { color: 0xFFC926 } );

                //Figura renderizada
                const parede = new THREE.Mesh( paredeGeometry, materialParedeGeometry );


                //parede cimentada - cor branca
                const paredeAlteradaGeometry =  new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );

                //Parede cimentada
                const paredealterada = new THREE.Mesh( paredeGeometry, paredeAlteradaGeometry);

                //Última parede
                const paredeAlteradaGeometryLined =  new THREE.MeshBasicMaterial( { color: 0xff00ff } );

                //Última parede
                const paredelined = new THREE.Mesh( paredeGeometry, paredeAlteradaGeometryLined);

                
                const ultimaparedeesquerda = paredelined.clone();
                const ultimaparededireita = paredelined.clone();

             
                           
                //linha 
                const floor = [];
                floor.push( new THREE.Vector3( -1, posini, 0 ) );
                floor.push( new THREE.Vector3( 0, posini, 0 ) );
                floor.push( new THREE.Vector3( 1, posini, 0 ) ); 
            
                //A linha da terra
                const floorgeometry = new THREE.BufferGeometry().setFromPoints( floor );
                const floormaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
                const floorline = new THREE.Line( floorgeometry, floormaterial );
                objeto.add(floorline);                
            
                /**
                 * Valores de controle
                */
                var dist = 0.6  //largura da parede
                var pattern = 0.2 //distancia relativa entre as paredes
                var posLabel = 0.6; // Posicionamento no eixo y do label do OD
            
                for(var i = 1; i < numPhases; i++)
                {
                    //O desenho da  da fase
                    const tamanho = size;
                  
                    const fundo = blocofundopoco(size, 1, 0)
                    AppTextLoader(scene, "blabla", 0.1, 0.9, posLabel );

                   
                    //Parede cimentada inserida quando i = 1
                    if(i === 1){

                        var deslocamentox = tamanho * 0.5;

                        //Parede da direita - copio a posição do plano de fundo e emparelho com ele
                        const posicaoAlvo01 = fundo.position.clone();
                        const deslocamento01 = new THREE.Vector3(deslocamentox, -pattern, 0.001);
                        posicaoAlvo01.add(deslocamento01);

                        //Parede da esquerda
                        const posicaoAlvo02 = fundo.position.clone();
                        const deslocamento02 = new THREE.Vector3( -deslocamentox, -pattern, 0.001);
                        posicaoAlvo02.add(deslocamento02);

                        //Criando a parede direita, usando o clone
                        const paredealteradaClonedObject1 = paredealterada.clone();
                        paredealteradaClonedObject1.position.copy( posicaoAlvo01 );
                        objeto.add(paredealteradaClonedObject1);

                        //Criando a parede esqierda que é clone da paredealterada
                        const paredealteradaClonedObject2 = paredealterada.clone();
                        paredealteradaClonedObject2.position.copy( posicaoAlvo02 );
                        objeto.add(paredealteradaClonedObject2);

                    }                  
                   
                    //Determina a posição y do fundo
                    fundo.position.y = (altura - i);


                    //largura relativa = tamanho * dist. O tamanho reduz 0.2
                    var lr = tamanho * dist;                    
                    const wallbox = clonarobjetoeposicaosimetria(parede, fundo, lr, 0, 0);
                    

                    objeto.add(fundo);
                    objeto.add(wallbox)                    
                
                    //deslocando o objeto para baixo
                    size -= pattern;
                    posLabel -= 1; //A posição y desce uma unidade porque a altura da fase é estabelecida como sendo uma unidade 
                    
                }

                var lastfase = numPhases - altura;             
                
                ultimaparedeesquerda.position.set(-size * 0.6, -lastfase, 0);
                ultimaparededireita.position.set(size * 0.6, -lastfase, 0);
                var lastblock = blocofundopoco(size, 1, 0);
                lastblock.position.y = -lastfase

                objeto.add(lastblock)
                objeto.add(ultimaparedeesquerda);
                objeto.add(ultimaparededireita);

                //centralizando na tela
                var dx = (numPhases); 
                var posfinal = (4.14 * numPhases) / 10;  
                objeto.position.y =  posfinal;         
                

                //Geometria da Broca
                const brocaGeometry = new THREE.PlaneGeometry( 0.15, dx );

                //Material da Broca
                const brocaMaterial = new THREE.MeshBasicMaterial( {color: 0x0085B2, side: THREE.DoubleSide} );
                const brocaMesh = new THREE.Mesh( brocaGeometry, brocaMaterial );

                const posicaoAlvo3 = objeto.position.clone();
                var seg = -0.9 * numPhases + 0.25

                const deslocamento3 = new THREE.Vector3(0 , seg, 0);
                posicaoAlvo3.add(deslocamento3);       

                brocaMesh.position.copy(posicaoAlvo3);


                objeto.add(brocaMesh);


                //A ponta da broca
                const pontabrocageometry2 = new THREE.PlaneGeometry( 0.25, 0.1 );
                const pontabrocamaterial2 = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
                const pontabroca2 = new THREE.Mesh( pontabrocageometry2, pontabrocamaterial2);
                pontabroca2.position.y = (-1 * numPhases) + 0.35;
                objeto.add(pontabroca2)

                //A ponta da broca
                const pontabrocageometry = new THREE.PlaneGeometry( 0.2, 0.5 );
                const pontabrocamaterial = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
                const pontabroca = new THREE.Mesh( pontabrocageometry, pontabrocamaterial);
                pontabroca.position.y = (-1 * numPhases) + 0.55;

                objeto.add( pontabroca );

            
 
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
    <div className={'sectbi '+ classmate }>     
        <p>2D Status: {props.isActive2D ? 'Active' : 'Inactive'}</p>
        <div>
          <span>Fases:  { JSON.stringify( phase )} </span> 
          <span>Desvios: { JSON.stringify(desvio)} </span>
          <div  ref={containerRef}  style={{ width: '100%', height: '80vh' }}></div>          
          
        </div>
    
    </div>);
};

export default connect(mapStateToProps )(CppSection2D);

