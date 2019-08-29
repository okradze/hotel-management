const setCookie = ({ res }, token) => {
    res.cookie('token', token, {
        maxAge: 604800000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })
}

export default setCookie
