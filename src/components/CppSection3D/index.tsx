import React, { useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { AppState } from '../../contexts/MainContext';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import * as THREE3D from 'three';

import { OrbitControls } from '../../three/examples/jsm/controls/OrbitControls';
import { Grade } from '../Grade';


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
    phase: state.phase,
    desvio: state.desvio
});


/**
 * Componente React pelo desenho 3D na tela. Ele recebe as props mapeadas pelo mapStateToProps, possibilitando ao render para 
 * acessar o estado global da aplicaçaõ
 * @param props 
 * @returns 
 */
const CppSection3D = (props: Props) => {

    
    var phase = useSelector((state: AppState ) => state.phase);
    var desvio = useSelector((state: AppState ) => state.desvio);

    const numPhases = useSelector((state: any) => state.numPhases);
    const numDetours = useSelector( (state: any) => state.numDetours);


    /**
     * O controle do tamanho da seção 3D é controlada pelo react/redux e pelo bootstrap
     * O tamanho inicial da tela é determinada pela classe col-lg-6, usadas para telas grandes (≥992px) ou seja, 50% da tela.
     * Quando está inativo, a classe col-lg-9 é ativada imediatamente (o componente é re-renderizado com o clique do botão).
     * Caso contrario, a classe hidden será responsável por ocultá-la
     */

    var classmate = `col-lg-6`;

    //Se ambos estão ativos ou inativos, a janela padrão (dividida) será ativada. O código em ambos os componentes garante a execução.
    if((props.isActive2D && props.isActive3D) || (!props.isActive2D && !props.isActive3D ) ){
        classmate = `col-lg-6`;
    }
    else if(props.isActive2D && !props.isActive3D){
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

    const valorReduxSubject = new BehaviorSubject(phase);
   
    /**
     * Objeto observable da biblioteca Rxjs - Aqui o observador é responsavel por monitorar o tamanho da tela, para re-renderizar o objeto three
     * Caso contrário, o desenho ficará estático e não acompará os eventos que estão ocorrendo na cena.
     * Ele acompanha as variações do objeto fase- isto é, o observável só emitirá valores quando eles forem diferentes dos valores anteriores.
     */
    const valorObservable = valorReduxSubject.pipe(
        distinctUntilChanged(),  
    ); 
    
    /**
     * O useeffect permite a criação de efeitos colaterais no React. Como sabemos, o React trabalha com constantes e, quando precisamos
     * trabalhar com mutabilidade, devemos fazê-lo dentro do useeffect. Ele é executado de forma assíncrona, após a renderização for feita.
     * No caso, o componente será atualizado com eventos do lado do usuário
     */
    useEffect(() => {
        
        /**
         * A assinatura aparentemente vazia (variavel subscription) é usada para acionar o redesenho do componente em resposta 
         * a mudanças no estado observado (resize e outros), mesmo que a lógica específica de manipulação dessas mudanças possa estar em 
         * outro lugar do código (por exemplo, no código omitido em outros componentes). Isso é uma técnica válida para manter a sincronização entre o 
         * estado e a representação na tela em aplicações React/Redux.
         */
        const subscription = valorObservable.subscribe();
        

        /**
         *  Este trecho verifica se containerRef.current existe (não é nulo). Se não existir, o código interrompe a 
         * execução do useEffect. Isso pode ser usado para evitar que o código continue se o componente estiver prestes a ser desmontado 
         * */
        
        if (!containerRef.current) return;

        //O container é de tamanho variado. Por isso será atribuida a uma variável
        var container = containerRef.current;

        /**
         * Criando a cena no three.js
         */
        const scene = new THREE3D.Scene();   
        sceneRef.current = scene; //Atribuo a cena ao hook de valor mutável
        sceneRef.current.background = new THREE3D.Color(0xF0F4F2); 

         //Criando uma câmera, posicionando -a e a atribuindo a uma referencia de objeto mutável
        const camera = new THREE3D.PerspectiveCamera( 75,   container.clientWidth / container.clientHeight, 0.1, 1000 );   
        camera.position.z = 5; 
        cameraRef.current = camera; //O objeto camera passa a ser mutavel
        
         //Criando um renderer, determinando seu valor inicial e atribuindo a uma referencia de objeto mutável
        const renderer = new THREE3D.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        rendererRef.current = renderer;       



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
            const newHeight = containerRef.current.clientHeight; //
            camera.aspect = newWidth / newHeight;  //Estabelendo a proporção da câmera           
            camera.updateProjectionMatrix(); //atualiza a cena quando a função handleSize é chamada, ou seja, quando a tela é redimensionada

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

            // Limpa recursos quando o componente for desmontado
            window.removeEventListener('resize', handleResize);
            if (curr && rendererRef.current) {
            curr.removeChild(rendererRef.current.domElement);
            }
            subscription.unsubscribe();
        };
            
    }, [phase, desvio, valorObservable, numPhases, numDetours])




    

    return (
        <div className={'secttri ' + classmate }>
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

