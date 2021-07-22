import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    makeStyles,
    Grow,
} from '@material-ui/core'
import { dbService } from 'fbase'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        marginTop: theme.spacing(2),
    },
}))

const Home = ({selectedRoomId}) => {
    const [cards, setCards] = useState([])
    const classes = useStyles()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {

        // roomList
        dbService
            .collection('room')
            .orderBy('roomId')
            .get()
            .then((snapshot) => {
                const docArray = snapshot.docs.map((doc) => {
                    return doc.data()
                })
                docArray.unshift({roomId: '', roomName: '전체보기'})
                setCards(docArray)
                setIsLoaded(true)
            })
    }, [isLoaded])

    return (
        <main>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={3}>
                    {cards.map((card, idx) => (
                        <Grow in={isLoaded} timeout={idx * 200} key={idx}>
                            <Grid item key={card.roomId} xs={12} sm={6} md={4}>
                                <Link to={card.roomId}>
                                    <Card
                                        elevation={4}
                                        className={classes.card}
                                    >
                                        <CardContent
                                            className={classes.cardContent}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="h2"
                                            >
                                                {card.roomName}{card.roomId === selectedRoomId ? "selected!" :""}
                                            </Typography>
                                        </CardContent>
                                        <CardActions> </CardActions>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grow>
                    ))}
                </Grid>
            </Container>
        </main>
    )
}
export default Home
