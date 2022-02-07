import useFetch from "../hooks/useFetch";

export default function MemberRelatives({ id }) {
    const { data, loading, error } = useFetch(`api/get-wall/${id}`);
    return (
        <div className="wall-container">
            <h2>Memories</h2>
        </div>
    );
}
