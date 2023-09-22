import './main.css';
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import { connect } from 'react-redux';

/*eslint quotes: ["error", "single", { "allowTemplateLiterals": true }]*/


function App() {

  return (
    <>
    <div className="container-fluid">
      <div className='row'>
        <AppHeader/>
      </div>       
    </div>

    <div className='sidebar col-md-3'>
      <AppSidebar />
    </div>    
   </>
  );
}

export default connect()(App);
