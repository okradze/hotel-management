const setCookie = (request, token) => {
    request.response.cookie('token', token, {
        maxAge: 604800000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })
}

export default setCookie
