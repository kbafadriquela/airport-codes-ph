import { Fragment } from "react";
import './App.css';
import { setImageUrlLarge, Airports } from "./Lists";

export function Overlay({ isOpen, children, id }) {
    return <>
            <Fragment>
                <div className={`detail ${id} overlay`} style={setImageUrlLarge(id)}>
                        <a className='overlay' rel='noopener'></a>
                        {children}
                </div>
            </Fragment>
    </>
}

export default Overlay;