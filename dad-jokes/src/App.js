import React, { Component } from "react";
import "./App.css";
import NavbarComponent      from "./components/nav/NavbarComponent";
import NavComponent         from "./components/nav/NavComponent";
import { Button }           from "reactstrap";
import { Route }            from "react-router-dom";
import Login                from "./views/login/Login";

class App extends Component {
    
    logout = () => {
    
    };
    
    render() {
        return (
            <div className="App">
                <header className={ "app-header" }>
                    <NavbarComponent>
                        <NavComponent title={ "Jokes" } link={ "/jokes" }/>
                        <NavComponent title={ "Login" } link={ "/" }/>
                        <Button color={ "secondary" }
                                onClick={ this.logout }>Logout</Button>
                    </NavbarComponent>
                </header>
                <main>
                    <Route path={ "/" } exact component={ Login }/>
                    <Route path={ "/jokes" }/>
                </main>
            </div>
        );
    }
}

export default App;
