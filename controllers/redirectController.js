const URL = require('../models/url')

async function redirectController(req, res) {
    const { shortId } = req.params
    try {
        const urlData = await URL.findOne({ shortId})
        if (!urlData) return res.status(404).send('❌ URL not found')

        return res.redirect(urlData.redirectURL)
    }
    catch (error) {
        console.error(error)
        return res.status(500).send('⚠️ server error')
    }  
}

module.exports = redirectController