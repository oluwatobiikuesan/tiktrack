import './App.css';
import {useState, useEffect, useRef} from 'react'
const BaseURL = "https://tiktok-server-tag.onrender.com";
// const LocalURL = "http://localhost:5000";

function App() {
// server url  => https://tiktok-server-tag.onrender.com
const intialValue = useRef(0);
const [item, setItem] = useState([]);
const [click, setClick] = useState(0)
const [url, setURL] = useState("https://www.tiktok.com/@ibrahimalsalty92/video/7361202889294957842?is_from_webapp=1&sender_device=pc");

const convertmUrl = (url) => {
    var mID = url.split("tiktok.com/")[1].split("/")[0]
    console.log(mID)
    if (mID.length <= 9){
        fetch(`https://iframe.ly/api/oembed?url=${url}&api_key=7050de4e80ceee8383fbeb`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const url = data.url;
            console.log(url)
            setURL(url)
        }).catch(console.error("there is an error here."));
    }
}

    useEffect( () => {
        fetch(`${BaseURL}/api?url=${encodeURI(url)}`)
        .then(Response => {
            return Response.json();
        })
        .then(data => {
            // console.log(data)
            setItem(data)
        })
        .catch(err => console.error("There is an issue, we go soon resolve am!"))
    }, [click, url]) 

    const PerformAction = () => {
        setClick(click + 1)
        if (intialValue.current.value.length <= 40){
            setURL(convertmUrl(intialValue.current.value))
            alert("Please wait!")
        }
        else{
        convertmUrl(intialValue.current.value)
        setURL(intialValue.current.value)
        alert("Please wait!")
        }
      }
       async function copyContent(item){
            var tagslines = ""
            item.map(items =>{
                var tags = tagslines += items.word + " ";
                return tags
            })
            alert("copied!")
            await navigator.clipboard.writeText(tagslines)
            tagslines = ""
        }

  return (
    <div>
        <main>
        <section>
        <h1>
            TKExtractor
            <sup>made simple.</sup>
        </h1>
        <div>
            <input type="text" placeholder="paste a tiktok link here." ref={intialValue}/>
            <br/>
            <button onClick={PerformAction} type="button">extract <i className="fa fa-key"></i></button>
        </div>
        <div className='about'>
            <p>
                We made our service easy and straight forward for you to use. Making sure that you are able to easily get tags from videos, and then use it to your advantage.
            </p>
            <div className="tag-container">
                <div>
                    {item.map((val, index) =>{
                        return(
                            <span key={index} className="tags">{val.word}</span>
                        )
                    })}
                    
                {/* <span className="tags">#foryou</span> */}
                {/* <span className="tags">#foryou</span> */}
            </div>
            <button id='copybtn' type='button' onClick={() => copyContent(item)}>copy</button>
            </div>
        </div>
    <div/>
    </section>
        </main>
    </div>
  );

}
export default App;