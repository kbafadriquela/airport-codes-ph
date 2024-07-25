import { useEffect, useState } from 'react';
import React from 'react';
import data from '../airports.json';
import WebFont from 'webfontloader';
import Layout from './Layout';
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [airport, setAirport] = useState(null);
    const [airports, setAirports] = useState(data);
    const [filteredAirports, setFilteredAirports] = useState(data);

    const toggleOverlay = (airport) => {
        setIsOpen(!isOpen);
        setAirport(airport);
    }

    const onSearchTerm = (term) => {
        const filteredData = airports.filter((airport) => airport.id.toLowerCase().includes(term.toLowerCase()) || airport.name.toLowerCase().includes(term.toLowerCase()) || airport.city.toLowerCase().includes(term.toLowerCase()));
        setFilteredAirports(filteredData);
    }

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Poppins', 'Catamaran']
            }
        });
    }, []);


    return (
        <>
            <Layout onSearchTerm={onSearchTerm} />
            <ul className="cf airport-list">
                <Airports toggleOverlay={toggleOverlay} airports={filteredAirports} />
            </ul>
            {/* <AirportDetails isOpen={isOpen} toggleOverlay={toggleOverlay} airport={airport} /> */}
        </>
    );
}

export function Airports({ toggleOverlay, airports }) {

    const sorted = airports.sort((a, b) => a.id.localeCompare(b.id)); // alphabetically sort by id before mapping the data

    const airportCards = sorted.map((airport, index) => {
        return <li key={index} className={`card ${airport.id} loaded`} react-id={airport.index}>
            <AirportCard toggleOverlay={toggleOverlay} airport={airport} uniqueId={airport.id} />
        </li>
    });
    return <ul>{airportCards}</ul>
}

export function setImageUrlLarge(url) {
    return {
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/large/${url}.jpg)`
    }
}

function capitalize(str) {
    return str.toUpperCase();
}

function AirportCard({ toggleOverlay, airport, uniqueId }) {
    const location = useLocation();
    function setImageUrl() {
        return {
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/cards/${airport.id}.jpg)`
        }
    }
    const id = airport.id;

    return <>
        <div className="background" style={setImageUrl()}></div>
        <Link to={{ pathname: `/airport/${id}`, state: airport }} className='modal-overlay' state={{ previousLocation: location }}>{airport.id}</Link>
    </>

}

export function AirportDetails({ id, airportData }) {
    // Initialize data to specific airport by id,
    // otherwise select a random airport.
    const [data, setData] = useState(() => {
        const airport = airportData.find(
            (airport) => airport.id.toLowerCase().includes(id.toLowerCase())
        );

        return airport ? airport : randomAirport(airportData);
    });

    const navigate = useNavigate();

    const airport = airportData.filter((airport) => airport.id.toLowerCase().includes(id.toLowerCase()))[0];

    const [description, setDescription] = useState(airport.description);

    const pattern = /\*([A-Za-z])\*/gi;
    const em = data.description.replace(pattern, '<em>$1</em>');

    const currUrl = window.location.href;

    function capitalize(str) {
        return str.toUpperCase();
    }

    const share = (socialType) => (e) => {
        if (socialType == "twitter") {
            const text = `Making sense of those three-letter airport codes: ${capitalize(id)}`;
            const link = `https://twitter.com/intent/tweet?url=${currUrl}&text=${text}`;
            return link;
        }
        const link = `https://www.facebook.com/dialog/share?display=popup&href=${currUrl}${id}&redirect_uri=${currUrl}${id}`;
        return link;
    }

    function setTo(social) {
        if (social == "twitter") {
            return "https://twitter.com/intent/tweet?url=$SHARE_URL&text=$TEXT";
        }
        else {
            return "https://www.facebook.com/sharer/sharer.php?u=$SHARE_URL";
        }
    }

    

    return (
        <div className='container'>
            <div className='detail-info'>
                <h1>{data.id}</h1>
                <h2>{data.name}</h2>
                <h3><span className="local_name">{data.local_name}</span></h3>
                <h4>{data.city}</h4>
                <div className="description fl-edu">
                    <p dangerouslySetInnerHTML={{ __html: em }}></p>
                </div>
                <a className="close-detail" role="button" onClick={() => navigate('/')}></a>
                <a className="random" role="button" onClick={() => setData(randomAirport(airportData))}>
                    Random Airport</a>
                <div className="social">
                    <a role="button" className="twitter" href={setTo("twitter")} onClick={() => { share("twitter") }} target="_blank"></a>
                </div>
                <div className="social">
                    <a className="facebook" href={setTo("facebook")} onClick={() => { share("facebook") }} target='_blank'></a>
                </div>
            </div>
            <div className="photo-credit">
                Photo by <a>{data.imageCredit}</a>
            </div>
            <a className="back" role="button" onClick={() => navigate('/')}>Airport Codes PH</a>
        </div>

    )
}

function randomAirport(airportData) {
    const rand = Math.floor(Math.random() * airportData.length);
    console.log(airportData[rand]);
    return airportData[rand];
}