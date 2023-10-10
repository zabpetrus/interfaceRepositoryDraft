import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CppSection2D from './components/CppSection2D';
import CppSection3D from './components/CppSection3D';
import AppFooter from './components/AppFooter';
import StateContext from './contexts/StateContext';
import { Provider } from 'react-redux';
import MainContext from './contexts/MainContext';


/**
 * O método createRoot permite criar uma raiz para exibir componentes React dentro de um nó dentro da árvore DOM contida na página index.html *
 * Toda a aplicação é construida dentro do elemento root, contido no arquivo index.html
 * Caso seja necessário renderizar separadamente o componente, basta criar outra raiz e chamar o createRoot para este novo root
 * O provider é responsável para compartilhar os estados e propriedades entre os componentes
 */

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={MainContext}>        
          <StateContext>      
              <App />           {/* Componentes AppHeader e AppSidebar */}
              <CppSection2D />  {/* Componente CppSection2D */}
              <CppSection3D />  {/* Componente CppSection3D */}
              <AppFooter />     {/* Componente AppFooter */}
          </StateContext>  
      </Provider> 
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
