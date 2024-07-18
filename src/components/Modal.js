import { useEffect, useRef, Fragment, Link, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import airportData from '../airports.json';

export function Modal() {
    const modalRef = useRef();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const observerRefValue = modalRef.current;
        disableBodyScroll(observerRefValue);

        return () => {
            if (observerRefValue) {
                enableBodyScroll(observerRefValue);
            }
        };
    }, []);

    function setImageUrlLarge(url) {
        return {
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/large/${url}.jpg)`
        }
    }

    return (
        
        <div ref={modalRef} className="modal-wrapper">
            <div className="modal">
                <h1>{id}</h1>
                <div className={`detail ${id} overlay`} style={setImageUrlLarge(id)}>
                    <a className='overlay' rel='noopener'></a>
                    <AirportDetails id={id} airportData={airportData} />
                </div>
            </div>
        </div>
    )

    function AirportDetails({id, airportData}) {
        const [data, setData] = useState(airportData);
        const [airportId, setAirportId] = useState(id);


        const airport = airportData.filter((airport) => airport.id.toLowerCase().includes(id.toLowerCase()))[0];

        console.log(airport);

        
        const getName = data.map(name => data.find(a => a.id === id).name).slice(0, 1);
        const getCity = data.map(city => data.find(b => b.id === id).city).slice(0, 1);
        const getDescription = data.map(description => data.find(c => c.id === id).description).slice(0, 1);
        const getImageCredit = data.map(imageCredit => data.find(d => d.id === id).imageCredit).slice(0, 1);
    
        const currUrl = window.location.href;

        function capitalize(str) {
            return str.toUpperCase();
        }

        const share = (socialType) => e => {
            if (socialType == "twitter") {
                const text = `Making sense of those three-letter airport codes: ${capitalize(id)}`;
                const link = `https://twitter.com/intent/tweet?url=${currUrl}&text=${text}`;

                return link;
            }
            const link = `https://www.facebook.com/dialog/share?display=popup&href=${currUrl}${id}&redirect_uri=${currUrl}${id}`;
            return link;

        }

        function setTo(social) {
            if(social=="twitter") {
                return "https://twitter.com/intent/tweet?url=$SHARE_URL&text=$TEXT";
            }  
            else {
                return "https://www.facebook.com/sharer/sharer.php?u=$SHARE_URL";
            }
        }
        // const url_t = "https://twitter.com/intent/tweet?url=$SHARE_URL&text=$TEXT";
        // const url_f = "https://www.facebook.com/sharer/sharer.php?u=$SHARE_URL";

        return (
                <div className='container'>
                    <div className='detail-info'>
                        <h1>{airport.id}</h1>
                        <h2>{airport.name}</h2>
                        <h3>{airport.city}</h3>
                        <div className="description fl-edu">
                            <p>{airport.description}</p>
                        </div>
                        <a className="close-detail" role="button" onClick={() => navigate('/')}></a>
                         <div className="social">
                            <a role="button" className="twitter" href={setTo("twitter")} onClick={share("twitter")} target="_blank"></a>
                        </div>
                        <div className="social">
                            <a className="facebook" href={setTo("facebook")} onClick={share("facebook")} target="_blank"></a>
                        </div>
                    </div>
                    <div className="photo-credit">
                        Photo by <a>{airport.imageCredit}</a>
                    </div>
                    <a className="back" role="button" onClick={() => navigate('/')}>Airport Codes PH</a>
                </div>
        )
    }
}