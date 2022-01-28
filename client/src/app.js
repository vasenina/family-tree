//import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./header";
import { useEffect, useState } from "react";
import Family from "./allFamily";
import AddMember from "./member-page/addMember";

export default function App() {
    useEffect(() => {
        fetch("/family")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
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
                </BrowserRouter>
            </div>
            <div>family tree</div>
        </>
    );
}
