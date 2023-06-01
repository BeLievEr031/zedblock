import React from 'react'
import Login from './child/Login'
import Signup from './child/Signup'

function Auth() {
    const [authType, setAuthType] = React.useState<string>("signup")
    return (
        <React.Fragment>
            {
                authType === "login" ? <Login setAuthType={setAuthType} /> : <Signup setAuthType={setAuthType} />
            }
        </React.Fragment>
    )
}

export default Auth