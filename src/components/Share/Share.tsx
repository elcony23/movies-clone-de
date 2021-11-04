import React ,{useEffect} from 'react'
import { Mailer } from 'nodemailer-react'
import {ShareMovieInfo} from '../../templates/ShareMovieInfo'

const Share = () => {
    const mailerConfig = {
        transport: {
          host: 'smtp.example.com',
          secure: true,
          auth: { user: 'username', pass: 'password' },
        },
        defaults: {
          from: { name: 'mathieutu', address: 'oss@mathieutu.dev' },
        },
      }
      
      /** Record of all emails that will be available */
      const emailsList = {
        ShareMovieInfo
      }
      
      const SendEmail = async () => {
        const mailer = Mailer(mailerConfig, emailsList)
        try{
             mailer.send('ShareMovieInfo',{firstName:'donaldo'},{to:'alex_sinta@hotmail.com'})
        }catch(e){
            console.log(e)
        }
      }
      useEffect(() => {
        SendEmail()
      }, [])
    return(
        <div></div>
    )
}

export default Share