import { useEffect, useState } from "react";
import React from "react";
import data from "../airports.json";
import WebFont from "webfontloader";
import Layout from "./Layout";
import { Link, useLocation, useNavigate, generatePath, useParams } from "react-router-dom";
import { NoMatch } from "./NoMatch";

export function Home() {
    const [filteredAirports, setFilteredAirports] = useState(data);

    const onSearchTerm = (term) => {
        const filteredData = data.filter(
            (airport) =>
                airport.id.toLowerCase().includes(term.toLowerCase()) ||
                airport.name.toLowerCase().includes(term.toLowerCase()) ||
                airport.city.toLowerCase().includes(term.toLowerCase()),
        );
        setFilteredAirports(filteredData);
    };

    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Poppins", "Catamaran"],
            },
        });
    }, []);

    return (
        <>
            <Layout onSearchTerm={onSearchTerm} />
            <ul className="cf airport-list">
                <Airports airports={filteredAirports} />
            </ul>
        </>
    );
}

export function Airports({ airports }) {
    const sorted = airports.sort((a, b) => a.id.localeCompare(b.id)); // alphabetically sort by id before mapping the data

    const airportCards = sorted.map((airport, index) => {
        return (
            <li
                key={index}
                className={`card ${airport.id} loaded`}
                data-react-id={`${index}`}
            >
                <AirportCard
                    airport={airport}
                />
            </li>
        );
    });
    return <ul>{airportCards}</ul>;
}

function AirportCard({ airport }) {
    const location = useLocation();

    function setImageUrl() {
        return {
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/cards/${airport.id}.jpg)`,
        };
    }
    const id = airport.id;

    return (
        <>
            <div className="background" style={setImageUrl()}></div>
            <Link
                to={{
                    pathname: `/airport/${id}`,
                    state: { modal: true }
                }}
                state={{ previousLocation: location }}
                className="modal-overlay"
            >
                {airport.id}
            </Link>
        </>
    );
}

export function AirportDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const airport = React.useMemo(() => {
        return data.find(
            (airport) => airport.id.toLowerCase().includes(id.toLowerCase())
        );
    }, [id]);
    if (!airport) {
        return <NoMatch/>;
    }
    const pattern = /\*([A-Za-z])\*/gi;
    const em = airport.description.replace(pattern, "<em>$1</em>");

    const currUrl = window.location.href;

    function capitalize(str) {
        return str.toUpperCase();
    }

    const share = (socialType) => (e) => {
        if (socialType === "twitter") {
            const text = `Making sense of those three-letter airport codes: ${capitalize(
                id,
            )}`;
            const link = `https://twitter.com/intent/tweet?url=${currUrl}&text=${text}`;
            return link;
        }
        const link = `https://www.facebook.com/dialog/share?display=popup&href=${currUrl}${id}&redirect_uri=${currUrl}${id}`;
        return link;
    };

    function setTo(social) {
        if (social === "twitter") {
            return "https://twitter.com/intent/tweet?url=$SHARE_URL&text=$TEXT";
        } else {
            return "https://www.facebook.com/sharer/sharer.php?u=$SHARE_URL";
        }
    }
    
    return (
        <div className={`detail ${id}`} style={setImageUrlLarge(airport.id)}>
            <a className='overlay' rel='noopener'><span></span></a>
            <div className='container'>
                <div className='detail-info'>
                    <h1>{airport.id}</h1>
                    <h2>{airport.name}</h2>
                    <h3><span className="local_name">{airport.local_name}</span></h3>
                    <h4>{airport.city}</h4>
                    <div className="description fl-edu">
                        <p dangerouslySetInnerHTML={{ __html: em }}></p>
                    </div>
                    <a
                        className="close-detail"
                        role="button"
                        onClick={() => navigate('/')}
                    ></a>
                    <a
                        className="random"
                        role="button"
                        onClick={() => {
                            // Enqueue state update to new random airport data
                            navigate(
                                generatePath("/airport/:id", { id: randomAirportId() }),
                                { replace: true }
                            );
                        }}
                    >
                        Random Airport
                    </a>
                    <div className="social">
                        <a
                            role="button"
                            className="twitter"
                            href={setTo("twitter")}
                            onClick={() => {
                                share("twitter");
                            }}
                            target="_blank"
                        ></a>
                    </div>
                    <div className="social">
                        <a
                            className="facebook"
                            href={setTo("facebook")}
                            onClick={() => {
                                share("facebook");
                            }}
                            target="_blank"
                        ></a>
                    </div>
                </div>
                <div className="photo-credit">
                    Photo by <a>{airport.imageCredit}</a>
                </div>
                <a className="back" role="button" onClick={() => navigate('/')}>
                    Airport Codes PH
                </a>
            </div>
        </div>
    );
}

function setImageUrlLarge(url) {
    return {
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/large/${url}.jpg)`,
    };
}

function randomAirportId() {
    const rand = Math.floor(Math.random() * data.length);
    return data[rand].id;
}