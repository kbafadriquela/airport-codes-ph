import { useNavigate } from "react-router-dom";
import data from '../airports.json';
import { useState } from "react";

export function About() {
    const navigate = useNavigate();
    const [airport, setAirport] = useState(data);

    function filterDuplicates(airport, filter) {
        const seen = new Set();
        const filters = filter;
        return airport.filter(item => {
            const val = item[filters];
            const duplicate = seen.has(val);
            seen.add(val);
            return !duplicate;
        });
    }

    const uniqueImage = filterDuplicates(airport, 'imageCredit');
    const uniqueCity = filterDuplicates(airport, 'city');
    const unique = Object.entries(uniqueImage, uniqueCity);
    console.log(uniqueCity);

    return (
        <div className="site-info about">
            <div className="overlay"></div>
            <div className="container">
                <div className="content">
                    <h1 className="fl-lato">About</h1>
                    <p>Every airport is identified by a unique three-letter <a href="http://en.wikipedia.org/wiki/International_Air_Transport_Association">IATA</a> code. Some codes are straightforward if you know the city or airport name, while others can be quite puzzling.
                    </p>
                    <p>Turns out, there's usually a logical explanation behind each code. Understanding the meaning of each IATA code isn't essential, but it can definitely be enjoyable.</p>
                    <hr />
                    <p className="center">This site is maintained by <a href="https://kbafadriquela.github.io/">Krizia Bianca.</a></p>
                    <p className="small center">Big thanks to <a href="https://lynnandtonic.com/">Lynn Fisher</a>.</p>
                    <hr />
                    <p>Photos generously provided by the Flickr and Wikimedia communities are licensed under Creative Commons.</p>
                    <hr />
                    <p className="quote center">“Hey, you left [my airport] off the list!”</p>
                    <a className="btn" href="#contribute">Contribute</a>
                    <hr />
                    <h3>airportcodes.ph Status</h3>
                    <div className="stats">
                        <p><span className="stat">{data.length}</span><span> airports</span></p>
                        <p><span>from </span><span className="stat">{uniqueCity.length}</span><span> cities</span></p>
                        <p><span>and </span><span className="stat">2</span><span> planets</span></p>
                        <p><span>with photos by </span><span className="stat">{unique.length}</span><span> photographers</span></p>
                    </div>

                    <div className="footnote">
                        <p>All photographs are from Flickr &amp; Wikipedia, under Creative Commons licenses, or with permission from the photographer.</p>
                        <p>Sources: <a href="http://www.wikipedia.org/">wikipedia.org</a>, <a href="http://www.skygod.com/asstd/abc.html">skygod.com</a>, <a href="http://www.city-data.com/forum/toronto/2177590-why-airport-code-toronto-yyz.html">citydata.com</a>, <a href="http://abcnews.go.com/Travel/history-airport-codes-logic-letter-codes/story?id=11684406&amp;singlePage=true">abcnews.com</a>, <a href="http://www.quora.com/Why-do-some-airport-codes-in-India-start-with-IX">quora.com</a>, <a href="http://www.andalucia.com/travel/airports/malaga/fascinating-facts.htm">andalucia.com</a>, <a href="http://hawaii.gov/ito/airport-information/faq">hawaii.gov</a>, <a href="http://generalaviationnews.com/">generalaviationnews.com</a>, <a href="http://www.aspenairport.com/">aspenairport.com</a>, <a href="http://www.houghtoncounty.org/about-history.php">houghtoncounty.org</a>, <a href="http://www.blogsouthwest.com/every-code-tells-a-story/">blogsouthwest.com</a>, <a href="http://www.sanyaairport.com/autoweb/autoweb/secondpage/sanya_en/about_the_airport.html">sanyaairport.com</a></p>
                    </div>
                </div>
                <a className="back" role="button" onClick={() => navigate('/')}>Airport Codes PH</a>
            </div>
        </div>

    )
}