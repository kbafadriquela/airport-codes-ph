import { useEffect, useState } from 'react';
import data from '../airports.json';
import WebFont from 'webfontloader';
import Layout from './Layout';
import { Link, useLocation } from "react-router-dom";

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
                families: ['Poppins', 'Quicksand']
            }
        });
    }, []);


    return (
        <>
            <Layout onSearchTerm={onSearchTerm} />
            <ul className="cf airport-list">
            <Airports toggleOverlay={toggleOverlay} airports={filteredAirports} />
            </ul>
            <AirportDetails isOpen={isOpen} toggleOverlay={toggleOverlay} airport={airport} />
        </>
    );
}

export function Airports({ toggleOverlay, airports }) {
 
    const sorted = airports.sort((a, b) => a.id.localeCompare(b.id)); // alphabetically sort by id before mapping the data

    const airportCards = sorted.map((airport, index) => {
        return <li key={index} className={`card ${airport.id} loaded`} react-id={airport.index}>
            <AirportCard toggleOverlay={toggleOverlay} airport={airport} />
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

export function AirportDetails({ isOpen, toggleOverlay, airport }) {
    if (isOpen) {

        const currUrl = window.location.href;
        const pageUrl = currUrl + `#airports/${airport.id}`;

        const share = (socialType) => e => {
            if (socialType == "twitter") {
                const text = `Making sense of those three-letter airport codes: ${capitalize(airport.id)}`;
                const link = `https://twitter.com/intent/tweet?url=${currUrl}${airport.id}&text=${text}`;

                return window.open(link);
            }
            const link = `https://www.facebook.com/dialog/share?display=popup&href=${currUrl}${airport.id}&redirect_uri=${currUrl}${airport.id}`;
            return window.open(link);
            console.log(link);

        }

        const url_t = "https://twitter.com/intent/tweet?url=$SHARE_URL&text=$TEXT";
        const url_f = "https://www.facebook.com/sharer/sharer.php?u=$SHARE_URL";
    }
    return null;
}

function AirportCard({ toggleOverlay, airport }) {
    const location = useLocation();

    function setImageUrl() {
        return {
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/cards/${airport.id}.jpg)`
        }
    }
    const id = airport.id;
    
    return <>
        <div className="background" style={setImageUrl()}></div>
        <Link to={{pathname:`/airport/${id}`, state: airport}} className='modal-overlay' state={{ previousLocation: location}}>{airport.id}</Link>
    </>

}