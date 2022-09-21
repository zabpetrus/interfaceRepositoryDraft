import styles from './Footer.module.scss';

export default function Footer(props : any){
    return (
    <footer className={`dg-4-hex `+ styles.footer}>
        {props.content} - @2022 | Projeto de graduação
    </footer>
    )
}