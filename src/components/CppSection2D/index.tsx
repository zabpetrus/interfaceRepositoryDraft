import { connect, useSelector } from 'react-redux';
import { AppState } from '../../contexts/MainContext';
import { useEffect, useRef } from 'react';
import { THREE } from '../ThreeLibCallback';
import { BehaviorSubject,  distinctUntilChanged } from 'rxjs'
import { createLineEarth, validaPhase, labelOD, blocofundopoco, cloneSimetricObject, lastFieldBuilder } from '../AppBlocks';
import AppTextLoader from '../AppTextLoader';

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
    var phase = useSelector((state: AppState ) => state?.phase);
    var desvio = useSelector((state: AppState ) => state?.desvio);
    const numero_de_fases = useSelector((state: AppState ) => state?.numPhases);

    //Mudança de tipo para iterar no loop. Garando que o numero de fases é um número, não outra coisa
     var numPhases: number = 0;

    (undefined !== numero_de_fases) ? (numPhases = numero_de_fases) : numPhases = 3;
      
    
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
    
    //PARA capturar os eventos no lado do cliente
    useEffect(() => {

    /**
     * Definição das configurações iniciais da cena.
     * O desenho será construido e atualizado conforme as mudanças no cliente
     */
    
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

    //Afastamento da camera em cinco pontos
    camera.position.z = 7;

    //A camera está sendo atribuindo a uma referência de objeto mutável
    cameraRef.current = camera;
    
    //Criando um renderer, determinando seu valor inicial e atribuindo a uma referencia de objeto mutável
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    rendererRef.current = renderer;

    if(numPhases > 0){

     /**
     * Este objeto é o poço bidimensional. Pode ser um objeto 2D ou 3D de acordo com a necessidade
     * E esse objeto representará o poço. Toda a construção e posicionamento dos elementos será em relação a este elemento
     */   

    
    
     var objeto = new THREE.Object3D();
     /**
      *  Abaixo serão definidos os valores iniciais dos objetos.
      *  Eles serão mudados de acordo com o que será inserido pelo usuário
      */
 
     //Altura inicial da fase na representação. Reecbeu este nome por não ter certeza 
     var altura = 0.8;
     
     //largura do poço... Não tenho certeza da terminologia correta, por isso coloquei este nome.
     var size = 1.7;
 
     //A posição da linha do terra na cena no eixo y
     var alt_linha_terra = 0.28;  
 
     //Comprimento da linha do terra
     var comp_linha_terra = 1;
 
     //Determinando a altura da parede
     const altura_da_parede = 1;
 
     //Determinando a largura da parede
     const largura_da_parede = 0.1;
 
     //Fator de aproximação (eixo z). Aumenta conforme o valor, dando a impressão de zoom. Pode se dizer que é uma camada
     const fator_posicionamento = 0.1;
 
     //largura da broca
     const largura_da_broca = 0.15;  
     
     //espaçamaento entre as paredes - afastamento absoluto em relação ao eixo y
     const dist = 0.6  
      
     //fator de redução para a escala no desenho
     const pattern = 0.2 
     
         //fator de ampliação do texto
     const od_label_size = 0.1;
 

 
     //largura da ponta da broca
     const drill_tip_width = 0.3;
 
     //largura do suporte da ponta da broca é relativo à largura da ponta da broca
     const drill_tip_supwidth = drill_tip_width - 0.14;
 
   
 
     /**
      * Recebendo os valores da fase
      * Uma vez atribuindo os valores iniciais, não terá problema se algum valor for nulo
      */
 
            
 
     //largura da parede, altura e aproximação. Este valor é para afastar um pouco, dando a impressão de camada 
     const paredeGeometry = new THREE.BoxGeometry( largura_da_parede, altura_da_parede, fator_posicionamento );
 
     //Cor da parede: amarelo
     const materialParedeGeometry = new THREE.MeshBasicMaterial( { color: 0xFFC926 } );
 
     //Figura renderizada
     const parede = new THREE.Mesh( paredeGeometry, materialParedeGeometry );
 
 
     //parede cimentada - cor branca
     const paredeAlteradaGeometry =  new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );
 
     //Parede cimentada
     const paredealterada = new THREE.Mesh( paredeGeometry, paredeAlteradaGeometry);
 
    
                     
     //linha 
     const floorline = createLineEarth( comp_linha_terra, alt_linha_terra );
     objeto.add(floorline);                
 
      
     //inicializando o contador
     var i: number = 1;
 

     //Adicionando fases.
     for(i; i < numPhases; i++)
     {
         //O desenho da  da fase
         var tamanho = size;

         //Desenho do fundo
         const fundo = blocofundopoco(size, 1, 0);

              
        // eslint-disable-next-line no-loop-func
        valorObservable.subscribe( () => {

            const od: number = validaPhase(phase, i-1, 'od');
            var text_label_od_switch = labelOD(od);

            AppTextLoader(scene, text_label_od_switch, od_label_size, fundo , numPhases);
        })
       
          
 
         //Parede cimentada inserida quando i = 1
         if(i === 1){
 
             var deslocamentox = tamanho * 0.5;
             var paredecimentada = cloneSimetricObject( paredealterada, fundo, deslocamentox, -pattern, 0.001);
             objeto.add(paredecimentada);        
 
         }                  
         
         //Determina a posição y do fundo
         fundo.position.y = (altura - i);
 
         //largura relativa = tamanho * dist. O tamanho reduz 0.2
         var lr = tamanho * dist; 
         
         //Forma as paredes recebendo: o shape inicial, o fundo, o espaçamento entre as paredes.
         const wallbox = cloneSimetricObject(parede, fundo, lr, 0, 0);        
 
         objeto.add(fundo);
         objeto.add(wallbox)                    
     
         //deslocando o objeto para baixo
         size -= pattern;
        
     }


     //Fim do loop for
     var lastfase = numPhases - altura; 
     var lastblock = blocofundopoco(size, 1, 0);
     lastblock.position.y = -lastfase;
     objeto.add(lastblock)
 
     const last_od = validaPhase(phase, i-1, 'od');
     const last_label_od: string = labelOD( last_od ); 
   
     //enxerto
 

     AppTextLoader(scene, last_label_od, od_label_size, lastblock, numPhases );
     
     //Ultima parte
     const lastwallblock = lastFieldBuilder( numPhases, altura, size, altura_da_parede, fator_posicionamento); 
     objeto.add(lastwallblock)
 
 
     //centralizando na tela
     var dx = (numPhases); 
     var posfinal = (4.14 * numPhases) / 10;  
     objeto.position.y =  posfinal;         
     
 
     //Geometria da Broca
     const brocaGeometry = new THREE.PlaneGeometry( largura_da_broca, dx );

     //Material da Broca
     const brocaMaterial = new THREE.MeshBasicMaterial( {color: 0x0085B2, side: THREE.DoubleSide} );
     const brocaMesh = new THREE.Mesh( brocaGeometry, brocaMaterial );
 
     const posicaoAlvo3 = objeto.position.clone();
     var seg = -0.8527 * numPhases + 0.25
 
     const deslocamento3 = new THREE.Vector3(0 , seg, 0);
     posicaoAlvo3.add(deslocamento3);       
 
     brocaMesh.position.copy(posicaoAlvo3);
 
 
     objeto.add(brocaMesh);
 
 
     //A ponta da broca
     const pontabrocageometry2 = new THREE.PlaneGeometry( drill_tip_width, 0.1 );
     const pontabrocamaterial2 = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
     const pontabroca2 = new THREE.Mesh( pontabrocageometry2, pontabrocamaterial2);
     pontabroca2.position.y = (-1 * numPhases) + 0.35;
     objeto.add(pontabroca2)
 
     //O corpo da broca
     const pontabrocageometry = new THREE.PlaneGeometry( drill_tip_supwidth, 0.5 );
     const pontabrocamaterial = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide} );
     const pontabroca = new THREE.Mesh( pontabrocageometry, pontabrocamaterial);
     pontabroca.position.y = (-1 * numPhases) + 0.55;
 
     objeto.add( pontabroca );
    //Adicionando o desenho do poço (var objeto) na cena
    scene.add( objeto );
    }  

    //Adicionando o objeto renderizado no container
    container.appendChild(renderer.domElement);

    //Pegando as interações do usuário e re-renderizando de acordo com a situação: no caso, redimensionamento de tela.
    const handleResize = () => {
        if (!containerRef.current) return;
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    };

    //Adicionando o evento resize
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
       
        <div>
        {
          
        /**   
         * <p>2D Status: {props.isActive2D ? 'Active' : 'Inactive'}</p>
         * <span>Fases:  { JSON.stringify( phase )} </span> 
          <span>Desvios: { JSON.stringify(desvio)} </span>
         * 
         *  */ 
         
         }
         
          <div  ref={containerRef}  style={{ width: '100%', height: '80vh' }}></div>          
          
        </div>
    
    </div>);
};

export default connect(mapStateToProps )(CppSection2D);

