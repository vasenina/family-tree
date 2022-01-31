//import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./header";
import { useEffect, useState } from "react";
import Family from "./allFamily";
import AddMember from "./member-page/addMember";
import ViewMember from "./member-page/viewMember";
import FamilyTree from "./familyTree";

import { useDispatch, useSelector } from "react-redux";
import { receiveFamily } from "./redux/familyTree/slice.js";

export default function App() {
    const dispatch = useDispatch();

    // const family = useSelector((state) => {
    //     return state.familyTree;
    // });
    // console.log(family);

    useEffect(() => {
        fetch("/family")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success) {
                    dispatch(receiveFamily(data.family));
                }
            })
            .catch((err) => {
                console.log("error in fetch", err);
            });
    }, []);
    return (
        <>
            <Header />
            <div className="main-body">
                <BrowserRouter>
                    <Route exact path="/">
                        <Family />
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
                </BrowserRouter>
            </div>
            <div>family tree</div>
        </>
    );
}
