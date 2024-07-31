import { useNavigate } from "react-router-dom";

export function NoMatch() {
    const navigate = useNavigate();

    return (
        <div className="detail lost">
            <div className="overlay"></div>
            <div className="container">
                <div className="detail-info">
                    <h1>OOPS</h1>
                    <div className="description"><p>This is not the airport you’re looking for.</p></div>
                    <a className="btn" href="/">Find another airport</a>
                </div>
                <a className="back" role="button" onClick={() => navigate('/')}>
                    Airport Codes PH
                </a>
            </div>
        </div>
    )
}