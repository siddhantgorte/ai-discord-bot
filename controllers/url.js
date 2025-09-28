const { nanoid } = require( 'nanoid' )
const URL = require('../models/url')

async function createShortURL(url, username) {
    const shortId = nanoid(5)

    await URL.create({
        shortId: shortId,
        redirectURL: url,
        createdBy: username,
    })

    return `http://localhost:8000/${shortId}`
}

module.exports = {
    createShortURL,
}