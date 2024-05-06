import './App.css';
import {useState, useEffect, useRef} from 'react'
// This is the app function.
function App() {
const intialValue = useRef(0);
const [item, setItem] = useState([]);
const [click, setClick] = useState(0)
const [url, setURL] = useState("https://www.tiktok.com/@mary.elizabeth969/video/7338554237892185377?is_from_webapp=1&sender_device=pc");
    useEffect( () => {
        fetch(`https://tiktok-server-tag.onrender.com/api?url=${encodeURIComponent(url)}`)
        .then(Response => {
            return Response.json();
        })
        .then(data => {
            console.log(data)
            setItem(data)
        })
        .catch(err => console.error("ewrrr"))
    }, [click, url]) 

    const PerformAction = () => {
        setClick(click + 1)
        setURL(intialValue.current.value)
        alert(intialValue.current.valueOf)
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
            <input type="text" placeholder="paste a youtube link here." ref={intialValue}/>
            <br/>
            <button onClick={PerformAction} type="button">extract <i className="fa fa-key"></i></button>
        </div>
        <div className='about'>
            <p>
                We made our service easy and straight forward for you to use. Making sure that you are able ti easily get tags from videos, and then use it to your advantage.
            </p>
            <div className="tag-container">
                <div>
                    {item.map((val, index) => {
                        console.log(val.word + " naso")
                        return(
                            <span key={index} className="tags">{val.word}</span>
                        )
                    })}
                    
                {/* <span className="tags">#foryou</span> */}
                {/* <span className="tags">#foryou</span> */}
            </div>
            <button id='copybtn' type='button'>copy tags</button>
            </div>
        </div>
    <div/>
    </section>
        </main>
    </div>
  );

}
export default App;