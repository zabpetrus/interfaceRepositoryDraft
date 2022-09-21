import ChangedButtons from '../ChangedButtons/ChangedButtons';
import Navbar from '../Navbar/Navbar';
import styles from './Header.module.scss';
import Image from 'next/image'
import Link  from 'next/link'
import logo from '../../public/logo.svg';

export default function Header(props : any){
    
    return( 
        <header className={`mb-3 dg-3-hex ` + (styles.header) }>
            <div className={"container-fluid"}>
                <div className={"d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"}>
                <Link href="/" color='black' >
                <a className={"d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"}>
                    <Image src={logo} className="App-logo" alt="logo" width={30} height={30} />
                </a>                       
                 </Link>
                
                <Navbar />
                <ChangedButtons />

                <div className={"dropdown text-end"}>

                    <Link href="/" >
                        <a className={"d-block link-dark text-decoration-none dropdown-toggle"} id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" >
                            <i className={"fa-solid fa-user"}></i>
                        </a>                        
                    </Link>

                    <ul className={"dropdown-menu text-small"} aria-labelledby="dropdownUser1">
                        <li><Link  href="/"><a className={"dropdown-item"}>Novo projeto...</a></Link></li>
                        <li><Link  href="/"><a className={"dropdown-item"}>Configurações</a></Link></li>
                        <li><Link  href="/"><a className={"dropdown-item"}>Perfis</a></Link></li>
                        <li><hr className={"dropdown-divider"} /></li>
                        <li><Link  href="/"><a className={"dropdown-item"}>Sair</a></Link></li>
                    </ul>
                 </div>
                
                </div>
            </div>            

        </header>
    )
}