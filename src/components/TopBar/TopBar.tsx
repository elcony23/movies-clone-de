import React,{useState,useEffect} from 'react'
import styles from './TopBar.module.scss';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom'
const topBarOptions = [{path:'/inicio',label:'Peliculas'},{path:'/compartir',label:'Contacto'}]

function TopBar(){

    const [currentPath,setCurrentPath] = useState("inicio")
    const location = useLocation()
    
    useEffect(() => {
        setCurrentPath(location.pathname.replace(/\//g, ""))
    }, [location])
    return (<nav className={styles['container']}>
        {topBarOptions.map((option,i) => <Item selected={option.path.replace(/\//g, "") === currentPath} item={option} key={i} />)}
    </nav>)

}

const Item = (props:any) => {
    return(
        <Link className={props.selected ?styles['item-selected'] :styles['item']} to={props.item.path}>{props.item.label}</Link>
    )
}

export default TopBar