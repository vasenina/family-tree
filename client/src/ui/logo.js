import { useHistory } from "react-router-dom";

export default function Logo() {
    const history = useHistory();
    return (
        <div
            className="logo"
            onClick={() => {
                location.assign("/");
            }}
        >
            <h1>Family</h1>
        </div>
    );
}
