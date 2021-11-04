import { ReactElement } from "react"

export type Email<Props> = (props: Props) => {
    body: ReactElement<Props>,
    subject: string,
  }
type PasswordProps = {
  firstName: string
}

export const ShareMovieInfo: Email<PasswordProps> = ({ firstName }) => ({
  subject: 'Hola mundo',
  body: (
    <body>
      <h1>Hello {firstName},</h1>
    </body>
  ),
})