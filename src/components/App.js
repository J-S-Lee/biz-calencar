import React, { useEffect, useState } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'

import 'components/font.css'
import { Box } from '@material-ui/core'

function App() {
    const [init, setInit] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
    const [userObj, setUserObj] = useState(null)
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true)
                setUserObj(user)
            } else {
                setIsLoggedIn(false)
            }
            setInit(true)
        })
    }, [])

    return (
        <Container component="main" maxWidth="xl">
            {init ? (
                <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
            ) : (
                <Box>
                    <CircularProgress color="secondary" />
                </Box>
            )}
        </Container>
    )
}

export default App
