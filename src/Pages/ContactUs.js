import React from "react"; import {Helmet} from "react-helmet";


const TITLE = 'Contact Us'

export default function ContactUs(){
    return(
        <div>
            <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        </div>
    )
}