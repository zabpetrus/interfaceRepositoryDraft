
import ThreeScene2D from '../../modules/scene2D/ThreeScene2D';
import styles from './Section2D.module.scss'


export default function Section2D(){

    return(
        <div id="section2D" className={'segment col-md-2'}>
            <ThreeScene2D />       
        </div>
    );
}