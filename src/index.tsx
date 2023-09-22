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
/*eslint quotes: ["error", "single", { "allowTemplateLiterals": true }]*/

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={MainContext}>        
          <StateContext>      
              <App />
          </StateContext>  
      </Provider> 
  </React.StrictMode>
);

const root2 = ReactDOM.createRoot(
  document.getElementById('root2') as HTMLElement
);
root2.render(
    <Provider store={MainContext}>
      <StateContext>
        <CppSection2D />
      </StateContext>
  </Provider>

);


const root3 = ReactDOM.createRoot(
  document.getElementById('root3') as HTMLElement
);
root3.render(  
<Provider store={MainContext}>
  <CppSection3D />
</Provider>);


const root4 = ReactDOM.createRoot(
  document.getElementById('root4') as HTMLElement
);
root4.render(<AppFooter />);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
