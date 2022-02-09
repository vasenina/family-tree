import { BrowserRouter, Route } from "react-router-dom";
import Header from "./header";
import { useEffect } from "react";

import useFetch from "./hooks/useFetch";
import Family from "./allFamily";
import AddMember from "./member-page/addMember";
import ViewMember from "./member-page/viewMember";
import FamilyTree from "./familyTree";
import MemberTree from "./memberTree";

import { useDispatch, useSelector } from "react-redux";
import { receiveFamily } from "./redux/familyTree/slice.js";

export default function App() {
    const dispatch = useDispatch();
    const { data, loading, error } = useFetch(`/get-family`);

    useEffect(() => {
        if (data.success) {
            dispatch(receiveFamily(data.family));
        }
    }, [data]);

    return (
        <>
            <Header />
            <div className="main-body">
                <BrowserRouter>
                    <Route exact path="/">
                        <Family loading={loading} error={error} />
                    </Route>

                    <Route path="/add-member">
                        <AddMember />
                    </Route>
                    <Route path="/member/:id">
                        <ViewMember />
                    </Route>
                    <Route path="/tree">
                        <FamilyTree />
                    </Route>
                    <Route path="/member-tree/:id">
                        <MemberTree />
                    </Route>
                </BrowserRouter>
            </div>
        </>
    );
}
