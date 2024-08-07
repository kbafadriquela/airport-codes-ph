import { useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { AirportDetails } from "./Home";

export function Modal() {
  const modalRef = useRef();  

  useEffect(() => {
    const observerRefValue = modalRef.current;
    disableBodyScroll(observerRefValue);

    return () => {
      if (observerRefValue) {
        enableBodyScroll(observerRefValue);
      }
    };
  }, []);

  return (
    <div ref={modalRef}>
      <div className="modal">
          <AirportDetails/>
      </div>
    </div>
  )
}