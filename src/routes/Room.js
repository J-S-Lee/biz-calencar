import React, { useCallback, useEffect, useRef, useState } from 'react'
import Calendar from '@toast-ui/react-calendar'
import Home from './Home'
import CreatePop from '../components/CreatePop'
import 'tui-calendar/dist/tui-calendar.css'

import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import { useParams } from 'react-router-dom'
import { dbService } from 'fbase'

import Skeleton from '@material-ui/lab/Skeleton'

import CreateSchedulePop, {
    createSchedulePop,
} from 'components/CreateSchedulePop'
import { Container, IconButton, Divider } from '@material-ui/core'
import { alpha } from '@material-ui/core'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { WEEKLY_CUSTOM_THEME } from './Theme'
import { SignalCellularNoSimOutlined } from '@material-ui/icons'


const calendars = [
    {
        id: '1',
        name: 'My Calendar',
        color: '#ffffff',
        bgColor: '#9e5fff',
        dragBgColor: '#9e5fff',
        borderColor: '#9e5fff',
    },
    {
        id: '2',
        name: 'Company',
        color: '#ffffff',
        bgColor: '#00a9ff',
        dragBgColor: '#00a9ff',
        borderColor: '#00a9ff',
    },
]

const Room = ({ userObj }) => {
    let { roomId } = useParams()
    const cal = useRef(null)

    const [roomSchedule, setRoomSchedule] = useState([])
    const [roomName, setRoomName] = useState()
    const [createdSchedule, setCreatedSchedule] = useState()
    // const [open, setOpen] = useState(false)
    // const [popupSchedule, setPopupSchedule] = useState()

    // const getRoomName = async () => {
    //     const dbRoomDoc = await dbService
    //         .collection('room')
    //         .where('roomId', '==', roomId)
    //         .limit(1)
    //         .get()

    //     setRoomName(dbRoomDoc.docs.map((doc) => doc.data().roomName)[0])
    // }


    useEffect(() => {
        // getRoomName()
        dbService
            .collection('schedules')
            // .where('roomId', '==', roomId)
            .where(
                'start',
                '>=',
                cal.current.calendarInst.getDateRangeStart().toDate()
            )
            .onSnapshot((snapshot) => {
                const scheduleArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    roomId: doc.data().roomId,
                    calendarId: doc.data().calendarId,
                    location: doc.data().location,
                    state: doc.data().state,
                    title: doc.data().title,
                    creatorEmail: doc.data().creatorEmail,
                    creatorId: doc.data().creatorId,
                    start: doc.data().start.toDate(),
                    end: doc.data().end.toDate(),
                    category: doc.data().isAllDay ? 'allday' : 'time',
                })).filter(s =>  {
                        return roomId === undefined ? s : s.roomId === roomId
                })
                console.log(roomId)
                console.log(scheduleArray)
                setRoomSchedule(scheduleArray)
                // console.log(scheduleArray)
                // console.log(cal.current.calendarInst.getDateRangeStart())
                // console.log(cal.current.calendarInst.getDateRangeEnd())
                // console.log(
                //     cal.current.calendarInst.getDateRangeEnd().addDate(1)
                // )
                cal.current.calendarInst.createSchedules([scheduleArray])
            })
    }, [roomId, cal])

    // const handleClose = () => {
    //     setOpen(false)
    // }
    const onBeforeCreateSchedule = async (scheduleD) => {
        const newSchedule = {
            roomId: roomId,
            calendarId: scheduleD.calendarId,
            title: scheduleD.title,
            location: scheduleD.location,
            start: scheduleD.start.toDate(),
            end: scheduleD.end.toDate(),
            category: scheduleD.isAllDay ? 'allday' : 'time',
            state: scheduleD.state,
            creatorId: userObj.uid,
            creatorEmail: userObj.email,
        }
        
        setCreatedSchedule(newSchedule)
    }

    const onBeforeCreateSchedulea = useCallback(async (scheduleData) => {
        const newSchedule = {
            roomId: roomId,
            calendarId: scheduleData.calendarId,
            title: scheduleData.title,
            location: scheduleData.location,
            start: scheduleData.start.toDate(),
            end: scheduleData.end.toDate(),
            category: scheduleData.isAllDay ? 'allday' : 'time',
            state: scheduleData.state,
            creatorId: userObj.uid,
            creatorEmail: userObj.email,
        }

        // setPopupSchedule(newSchedule)
        // setOpen(true)

        await dbService.collection('schedules').add(newSchedule)
    }, [])

    const onBeforeDeleteSchedule = useCallback(async (res) => {
        console.log(res)

        const { id, calendarId } = res.schedule

        await dbService.doc(`schedules/${id}`).delete()
        cal.current.calendarInst.deleteSchedule(id, calendarId)
    }, [])

    const onBeforeUpdateSchedule = useCallback(async (e) => {
        console.log()
        const { schedule, changes } = e
        if (changes === null) return
        changes.roomId = roomId
        if (changes.end) changes.end = changes.end._date
        if (changes.start) changes.start = changes.start._date

        await dbService.doc(`schedules/${schedule.id}`).update(changes)
    }, [])

    const onClickSchedule = (schedule) => {
        console.log(schedule)
    }



    return (
        <Container>
            <h3>{roomName ? roomName : <Skeleton />}</h3>
            <Home selectedRoomId={roomId} />
            <Divider />
            <Calendar
                ref={cal}
                theme={WEEKLY_CUSTOM_THEME}
                month={{
                    workweek: true,
                }}
                week={{
                    workweek: true,
                    hourStart: 8,
                    hourEnd: 19,
                }}
                workweek={true}
                taskView={false}
                scheduleView={['time']}
                useCreationPopup={false}
                useDetailPopup={true}
                calendars={calendars}
                onClickSchedule={onClickSchedule}
                onBeforeCreateSchedule={onBeforeCreateSchedule}
                onBeforeDeleteSchedule={onBeforeDeleteSchedule}
                onBeforeUpdateSchedule={onBeforeUpdateSchedule}
                schedules={roomSchedule}
            />
            {/* {open && (
              <CreateSchedulePop
              open={open}
              onClose={handleClose}
              popupSchedule={popupSchedule}
              userObj={userObj}
              />
            )} */}
            {createdSchedule && <CreatePop createdSchedule={createdSchedule} />}
        </Container>
    )
}
export default Room
