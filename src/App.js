import './App.css';
import {useState, useEffect} from 'react'
// This is the app function.
function App() {
    const url = "https://www.tiktok.com/@angeliclofiasmr/video/7342655196238990625?is_from_webapp=1&sender_device=pc"
const apiGet = `http://localhost:5000/api?url=${encodeURIComponent(url)}`
    const [backend, setBackend] = useState([{}])
    useEffect( () => {
        fetch(apiGet)
        .then(Response => {
            return Response.json()
        })
        .then(data => {
            console.log(data)
            setBackend(data)
            data.map(values =>{
                document.write(`<p>${values.word}</p>`)
            })
        })
        .catch(err => console.error("ewrrr"))
    }, []) 
  return (
    <div>
        <main>
        <section>
        <h1>
            YTExtractor
            <sup>made simple.</sup>
        </h1>
        <marquee>check it out.</marquee>
        <div>
            <input type="text" placeholder="paste a youtube link here."/>
            <br/>
            <button onClick={peformExtract} type="button">extract <i className="fa fa-key"></i></button>
        </div>
        <div>
            <p>
                We made our service easy and straight forward for you to use. Making sure that you are able ti easily get tags from videos, and then use it to your advantage.
            </p>
            <div className="tag-container">
                <p>copy</p>
                <div>
                <span className="tags">#foryou</span>
                <span className="tags">#foryou</span>
                <span className="tags">#foryou</span>
            </div>
            </div>
        </div>
    <div/>
    </section>
        </main>
    </div>
  );
}

function peformExtract(){
  const url = "https://www.npmjs.com/package/axios"
  const triggerBtn =  document.querySelector("input")

}

export default App;