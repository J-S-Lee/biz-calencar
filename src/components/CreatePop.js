import React, {useEffect, useState, useStyles } from 'react'
import { Container, makeStyles, Dialog } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'

const CreatePop = ({createdSchedule}) => {
    
    // const classes = useStyles()
    
    const [schedule, setSchedule] = useState(createdSchedule)
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    }
    
    useEffect(() => {
        setOpen(true)
        setSchedule(createdSchedule)
        console.log(schedule)
    }, [createdSchedule])

    return (<Container>
        <Dialog open={open}
            onClose={handleClose}>
                <input type="text" />
                <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    value={schedule.start}
                    onChange={(event) => {
                        console.log(event)
                    }}
                    format="yyyy/MM/DD HH:mm"
                />
                <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    value={schedule.end}
                    onChange={(event) => {
                        console.log(event)
                        // setSchedule({ ...schedule, end: event.})
                    }}
                    format="yyyy/MM/DD HH:mm"
                />
                </MuiPickersUtilsProvider>
            </Dialog>
    </Container>)
}
export default CreatePop