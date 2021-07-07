import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

class Layout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                {/* if directed to home page at path '/' does not load navigation top bar and footer into layout */}
                {this.props.location.pathname !== '/' && <NavBar />}
                <main>{this.props.children}</main>
                {this.props.location.pathname !== '/' && <Footer/>}
            </Fragment>

        )
    }
}

export default withRouter(Layout)