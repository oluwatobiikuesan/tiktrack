const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")    
const app = express()
const cors = require("cors")
const port = 5000
app.use(cors({origin: "http://localhost:3000"}))

const videoIDFunc = (url) =>  {
    //gets the url id from the given url by the client
    let rBaseURL = url.split("video/")[1]
    let rEnd=  rBaseURL.split("?is")[0]
    const videoID = rEnd
    return videoID
}

app.get("/api", (req, res)=> {   
    const result =  []
    const url = req.query.url
    const videoID = videoIDFunc(url)

    axios.get(url)
    .then((response)=>{

        const html = response.data
        const $ = cheerio.load(html)
        let createHtmlArr = $(html).text()
        let sTage = createHtmlArr.split(`\"${videoID}\",\"desc\"`)[1]
        let rDynamicCover = sTage.split("dynamicCover")[0]
        let rCreateTime = rDynamicCover.split("createTime")[0]
        let rExtra = rCreateTime.split("\",\"")[0].split(":\"")[1]
        rWhiteSpace = rExtra.split(" ").map((value) => {
            return value.trim()
        })

        for (let i = 0; i < rWhiteSpace.length;){
            let word = rWhiteSpace[i]
            if (word.includes("#")){
                result.push({word})
            }
            i++
        }
        res.json(result)

})
})






app.listen(port,  () =>{
console.log(`This is running on port ${port}`)
})
