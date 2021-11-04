import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import styles from './Share.module.scss'
import movies from '../../utils/movies.json'
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID || ""
const USER_ID = process.env.REACT_APP_USER_ID || ""
const SERVICE_ID = process.env.REACT_APP_SERVICE_ID || ""

const Share = () => {
    const [ movie   , setMovie   ] = useState<IMovie | undefined>(movies[0])
    const [ toEmail , setToEmail ] = useState("")
    const [ message , setMessage ] = useState("")
    const sendEmail = async (e) => {
        e.preventDefault();
        try{
            await emailjs.sendForm(SERVICE_ID,TEMPLATE_ID,e.target,USER_ID)
            alert("correo enviado con éxito")
        }catch(e){
            console.log(e)
        }
    }
    const onChangeSelect = (event) => {
        setMovie(movies.find(({id}) =>  id == event.target.value))
    }
    return(
        <div className={styles['main-container']}>
            <div style={{background:'#564d4d',padding:12,width:500,borderRadius:8}}>
                <div className={styles['item']}>
                    <label className={styles['label']}>Peliculas</label>
                    <select value={movie?.id} onChange={onChangeSelect} className={styles['select']}>
                        {movies.map((movie,id) => <option key={id} value={movie.id}>{movie.title}</option>)}
                    </select>
                    <br/>
                </div>
                <form onSubmit={sendEmail} className={styles['form']}>
                    <input value={movie?.title} type="hidden" name="title"/>
                    <input value={movie?.year} type="hidden" name="year"/>
                    <input value={movie?.info.rating} type="hidden" name="rating"/>
                    <input value={movie?.info.plot} type="hidden" name="plot" />
                    <div className={styles['item']}>
                        <label className={styles['label']}>Destinatario</label>
                        <input className={styles['input']} value={toEmail} type="text" required onChange={(event) => setToEmail(event?.target.value)} name="email"/>
                    </div>
                    <br/>
                    <div className={styles['item']}>
                        <label className={styles['label']}>Mensaje</label>
                        <textarea className={styles['input']} value={message} required onChange={(event) => setMessage(event.target.value) } name="message"/>
                    </div>
                    <br/>
                        <input type="submit" className={styles['btn']} value="Enviar Mensaje"/>
                </form>
            </div>
        </div>
    )
}

export default Share