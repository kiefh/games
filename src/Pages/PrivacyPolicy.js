import React from "react"; import {Helmet} from "react-helmet";


const TITLE = 'Privacy Policy'

export default function PrivacyPolicy(){
    return(
        <div>
            <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        </div>
    )
}