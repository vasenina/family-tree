import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./header";
import Family from "./allFamily";
import AddMember from "./member-page/addMember";

export default class App extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     uploaderIsVisible: false,
        // };
        // this.toggleUploader = this.toggleUploader.bind(this);
        // this.logName = this.logName.bind(this);
        // this.changePic = this.changePic.bind(this);
        // this.changeBioState = this.changeBioState.bind(this);
    }

    //here will be a fetch where we can get a data
    componentDidMount() {
        console.log("app component mounted");
    }

    render() {
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
}
