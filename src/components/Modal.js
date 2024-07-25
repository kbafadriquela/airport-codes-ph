import { useEffect, useRef, Fragment, Link, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { AirportDetails } from "./Home";
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
                <div className={`detail ${id} overlay`} style={setImageUrlLarge(id)}>
                    <a className='overlay' rel='noopener'></a>
                    <AirportDetails id={id} airportData={airportData} />
                </div>
            </div>
        </div>
    )
}


