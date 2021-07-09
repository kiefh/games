import React from "react"; import {Helmet} from "react-helmet";


const TITLE = 'Terms of Use'

export default function TermsOfUse(){
    return(
        <div>
            <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        </div>
    )
}