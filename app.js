const express = require('express');
const path = require('path')
const port = process.env.PORT || 3000;
const app = express();


app.use(express.static(path.resolve(__dirname, 'client')))
app.use(express.json())
ans=[]
app.get("/", function(request, response) {
    response.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    ans=[]
});

const getSubtitles = require('youtube-captions-scraper').getSubtitles;
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: true })
var url;
var id;


app.post("/", urlencodedParser, function (request, response)
{
    ans=[]
    try {
        if (!request.body) return response.sendStatus(400);
        url = new URL(request.body.href)
        if (request.body.href.includes('v')) {

            id = url.searchParams.get('v')
        }
        else if (request.body.href.includes('.be'))
        {
                id = request.body.href.split('/')[request.body.href.split('/').length-1]
        }
        getSubtitles({videoID: id, lang: 'ru'}).then(function (captions) {
                for (let i = 0; i < captions.length; i++) {

                    if (captions[i]['text'].includes(" "+request.body.word.toLowerCase()+" ")) {

                        ans.push({
                            'link': `https://youtu.be/${id}?t=${captions[i].start}s`,
                            'time': captions[i].start,
                            'text': captions[i].text
                        })
                    }

                }
                response.status(201).json(ans)

            }
        )
    }
    catch (Error)
    {

        response.status(201).json(ans)
    }

});
app.listen(port, ()=>console.log('Server has been started on port '+port))

