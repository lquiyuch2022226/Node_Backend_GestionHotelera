import jwt from 'jsonwebtoken'

export const generarJWT = (uid = '', email = '') => {
    return new Promise((resolve, reject) => {
        console.log(uid + email)
        const payload = { uid, email}
        jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            {
                expiresIn: '8h'
            },
            (err, token)=>{
                err ? (console.log(err),reject('We have a proble to generate the token')) : resolve(token)
            }
        )
    })
}