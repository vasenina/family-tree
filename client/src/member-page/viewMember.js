import { useParams } from "react-router";

export default function viewMember({}) {
    const { id } = useParams();
    return <>user{id}</>;
}
