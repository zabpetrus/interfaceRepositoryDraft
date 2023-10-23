/* eslint-disable jsx-a11y/anchor-is-valid */
import { incrementarDesvios, incrementarFase } from '../../contexts/MainContext';
import { connect, useDispatch } from 'react-redux';

interface Props {
    toggle2D: () => void;
    toggle3D: () => void;
}

const mapDispatchToProps = (dispatch: any) => ({
    toggle2D: () => dispatch({ type: 'TOGGLE_2D' }),
    toggle3D: () => dispatch({ type: 'TOGGLE_3D' })
});
  

const AppHeader = (props: Props) => {


    const dispatch = useDispatch();

    const handleIncrementoFases = (event: any) => {
        dispatch( incrementarFase() );
    };

    const handleIncrementoDesvios = (event: any) => {
        dispatch( incrementarDesvios() );
    }    
    
  
    return (
        <header className='text-center'>
            <div className='row'>  
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">FAETERJ<img src='logo.svg' alt='logo' width={30} height={30} /></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" ></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                    Adicionar Parâmetros
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            
                            
                                    <li><a className="dropdown-item" href="#" onClick={handleIncrementoFases}>Add Phase</a></li>
                                    <li><a className="dropdown-item" href="#" onClick={handleIncrementoDesvios}>Add Detour</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>

                            </li>
                        </ul>
                        
                        <span className="navbar-text">
                        <div className="btn-group" role="group" aria-label="Notoes de mudancas">
                            <button type="button" className="btn btn-primary bidimensional" onClick={props.toggle2D}>2D</button>
                            <button type="button" className="btn btn-primary tridimensional" onClick={props.toggle3D }>3D</button>
                        </div>
                        </span>
                        </div>
                    </div>
                </nav>            
            </div>  
        </header>     
    );
};

export default connect(null, mapDispatchToProps)(AppHeader);

