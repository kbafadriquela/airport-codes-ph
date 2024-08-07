import { useNavigate } from "react-router-dom";
import data from '../airports.json';
import { useState } from "react";

export function About() {
    const navigate = useNavigate();
    const [airport] = useState(data);

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
                        <p>Sources: <a href="http://www.wikipedia.org/">wikipedia.org</a>, <a href="https://pia4b.wordpress.com/2020/09/27/rehabilitasyon-ng-cuyo-airport-passenger-terminal-tapos-na/">pia4b.wordpress.com</a>, <a href="https://pcoo.gov.ph/">pcoo.gov.ph</a></p>
                    </div>
                </div>
                <a className="back" role="button" onClick={() => navigate('/')}>Airport Codes PH</a>
            </div>
        </div>

    )
}