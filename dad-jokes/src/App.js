import React, { Component }  from "react";
import "./App.css";
import NavbarComponent       from "./components/nav/NavbarComponent";
import NavComponent          from "./components/nav/NavComponent";
import RequiresAuth          from "./auth/requiresAuth";
import { Button }            from "reactstrap";
import { Route, withRouter } from "react-router-dom";
import Login                 from "./views/login/Login";
import Jokes                 from "./views/jokes/Jokes";

class App extends Component {
    
    logout = () => {
        localStorage.removeItem( "auth-token" );
        this.props.history.push( "/" );
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
                    <Route path={ "/jokes" }
                           component={ RequiresAuth( Jokes ) }/>
                </main>
            </div>
        );
    }
}

export default withRouter( App );
