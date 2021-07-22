import React, { useState } from 'react'
import { dbService } from 'fbase'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Input,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import MomentUtils from '@date-io/moment'
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}))

const CreateSchedulePop = ({ open, onClose, popupSchedule, userObj }) => {
    const classes = useStyles()
    const [schedule, setSchedule] = useState(popupSchedule)
    const [startDate, setStartDate] = useState(new Date(popupSchedule.start))
    const [endDate, setEndDate] = useState(new Date(popupSchedule.end))
    const [purpose, setPurpose] = useState('')

    const handleChangePurpose = (event) => {
        setPurpose(event.target.value)
        popupSchedule.calendarId = event.target.value
        console.log(popupSchedule.calendarId)
    }

    const handleClickSave = (event) => {
        console.log(event.target.value)

        // await dbService.collection('schedules').add(newSchedule);
    }
    const handleTitle = (event) => {
        console.log(event.target.value)
        popupSchedule.title = event.target.value
        console.log(popupSchedule)
    }
    const handleStartDate = (event) => {
        setStartDate(event.target.value)
        popupSchedule.start = startDate
    }
    const onSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.value)
    }

    console.log(schedule)
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Dialog open={open} onClose={onClose}>
                <DialogContent>
                    <FormControl>
                        <InputLabel id="purpose-label">purpose</InputLabel>
                        <Select
                            labelId="purpose-label"
                            id="purpose"
                            value={purpose}
                            onChange={handleChangePurpose}
                        >
                            <MenuItem value={1}>
                                <FiberManualRecordIcon color="primary" />
                                주간회의
                            </MenuItem>
                            <MenuItem value={2}>
                                <FiberManualRecordIcon color="secondary" />
                                월간회의
                            </MenuItem>
                            <MenuItem value={3}>
                                <FiberManualRecordIcon color="action" />
                                부서회의
                            </MenuItem>
                        </Select>
                        <TextField
                            label="title"
                            value={schedule.title}
                            onChange={handleTitle}
                        />
                        <KeyboardDateTimePicker
                            variant="inline"
                            ampm={false}
                            value={startDate}
                            onChange={setStartDate}
                            format="yyyy/MM/DD HH:mm"
                        />
                        <KeyboardDateTimePicker
                            variant="inline"
                            ampm={false}
                            value={endDate}
                            onChange={setEndDate}
                            format="yyyy/MM/DD HH:mm"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </MuiPickersUtilsProvider>
    )
}

export default CreateSchedulePop
