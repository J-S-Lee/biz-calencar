import { Button, DialogTitle, FormControl, TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import InputAdornment from '@material-ui/core/InputAdornment'
import { authService } from 'fbase'
import React, { useState } from 'react'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [open, setOpen] = useState(true)
    const [invalid, setInvalid] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event
        if (name === 'email') {
            setEmail(value)
            setInvalid(false)
        }
        if (value.includes('@')) {
            setInvalid(true)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault()

        try {
            var actionCodeSettings = {
                // URL you want to redirect back to. The domain (www.example.com) for this
                // URL must be whitelisted in the Firebase Console.
                url: 'https://localhost:3000',
                handleCodeInApp: true,
            }

            let data
            data = await authService
                .sendSignInLinkToEmail(
                    `${email}@interpark.com`,
                    actionCodeSettings
                )
                .then(() => {
                    window.localStorage.setItem(
                        'emailForSignIn',
                        `${email}@interpark.com`
                    )
                })
                .then(handleClose)
        } catch (error) {
            setError(error)
        }
    }

    if (authService.isSignInWithEmailLink(window.location.href)) {
        const storedEmail = window.localStorage.getItem('emailForSignIn')

        if (storedEmail) {
            authService
                .signInWithEmailLink(storedEmail, window.location.href)
                .then((result) => {
                    console.log(result)
                    window.localStorage.removeItem('emailForSignIn')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <FormControl onSubmit={onSubmit}>
                <DialogContent>
                    <DialogContentText>
                        To Sign In this website, please enter your company email
                        address here. We will send Sign In Link.
                    </DialogContentText>
                    <TextField
                        error={invalid}
                        helperText={
                            !invalid
                                ? ''
                                : '@interpark.com 을 제외한 이메일 주소를 입력해주세요.'
                        }
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        type="text"
                        label="Email Address"
                        fullWidth
                        required
                        value={email}
                        onChange={onChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    @interpark.com
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    {!invalid && (
                        <Button onClick={onSubmit} color="primary">
                            Sign In
                        </Button>
                    )}
                </DialogActions>
            </FormControl>
        </Dialog>
    )
}
export default Auth
