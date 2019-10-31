const http = require('http')
const cheerio = require('cheerio')
const md5 = require('md5')
const axios = require('axios')

const URL = "http://docker.hackthebox.eu:36237/"

axios.get(URL, {withCredentials: true}).then(response => {
    let result = response.data
    let cookie = response.headers['set-cookie'][0].replace("; path=/", '')
    console.log("Cookie : " + cookie)
    const $ = cheerio.load(result)
        const encrypted = $("h3").text()
        const code = md5(encrypted)
        console.log("Sendind: "+code)
        axios.post(URL, {hash: code}, {withCredentials: true,headers:{Cookie: cookie, 'Content-Type': 'application/x-www-form-urlencoded'}}).then(result => {
            console.log(result)
        })
})
