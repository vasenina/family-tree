export { useState, useEffect } from "react";

export default function useFormSubmit(url) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log("error", err);
                setError("error, please try again");
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}
