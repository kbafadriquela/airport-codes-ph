import { useState, useEffect, RefObject } from "react";
import React, { Component } from "react";
import Overlay from "./Overlay";
import { Router, useLocation, Link } from 'react-router-dom';
import app from './App';

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

        return <>
            <Overlay isOpen={isOpen} id={airport.id}>
                <div className={`container ${isOpen ? '' : 'hidden'}`}>
                    <div className='detail-info'>
                        <h1>{airport.id}</h1>
                        <h2>{airport.name}</h2>
                        <h3>{airport.city}</h3>
                        <div className="description fl-edu">
                            <p>{airport.description}</p>
                        </div>
                        <a className="close-detail" role="button" onClick={toggleOverlay}></a>
                        <div className="social">
                            <Link className="twitter" to={url_t} onClick={share("twitter")} target="_blank"></Link>
                        </div>
                        <div className="social">
                            <Link className="facebook" to={url_f} onClick={share("facebook")} target="_blank"></Link>
                        </div>
                    </div>
                    <div className="photo-credit">
                        Photo by <a>{airport.imageCredit}</a>
                    </div>
                    <a className="back" role="button" onClick={toggleOverlay}>Airport Codes PH</a>
                </div>
            </Overlay>
        </>
    }
    return null;
}

function AirportCard({ toggleOverlay, airport }) {
    const addHref = `#airports/${airport.id}`;

    const handleClick = e => {
        toggleOverlay(airport);
        // e.preventDefault();
    };


    function setImageUrl() {
        return {
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/cards/${airport.id}.jpg)`
        }
    }

    return <>
        <div className="background" style={setImageUrl()}></div>
        <a role="button" onClick={handleClick} href={addHref}>{airport.id}</a>
    </>

}