import React, { Component } from 'react';
import SocketIOClient from 'socket.io-client'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import { Button, createStyles } from '@mui/material';

const styles = theme => createStyles({
    position: {
        width: '30vw',
        position: 'absolute',
        right: 5,
        top: 5,
    },
    chatSection: {
        height: '95vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '85vh',
        width: '100%',
        overflowY: 'auto'
    },
});


class Chat extends Component {
    constructor(props){
		super(props)
		this.state = {
			users: [],
			value: '',
			messages: []
		}
		this.socket = SocketIOClient('http://localhost:8080/', {
			forceNew:true, 
			transports: ['websocket']
		})
		this.handleChange = this.handleChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillUnmount(){
        this.socket.emit('leave');
    }

	componentDidMount() {
		const scopeThis = this;
		this.socket.emit('join', {name: 'Benny', role: 'default'}, function (err) {
            if (err) {
                this.props.history.push('/');
            }
        });

		this.socket.on('newMessage', (message) => {
            console.log(message)
            const formattedTime = moment(message.createdDate).format('h:mm a');
            let newMsg = {
                text: message.text,
                from: message.from,
                role: message.role,
                room: message.room,
                createdDate: formattedTime
            }
            let results = scopeThis.state.messages;
            results.push(newMsg);
            scopeThis.setState({
                messages: results
            });
        });

        this.socket.on('updateUserList', function (users) {
            scopeThis.setState({
                users
            });
        });

		this.socket.on('disconnect', function () {
            console.log('Connection lost from server.');
        });
	}

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          this.handleSubmit();
        }
      }

	handleChange = (e) => {
		this.setState({value: e.target.value})
	}

	handleSubmit = (e) => {
		this.socket.emit('createMessage', {
			text: this.state.value
		}, (data) => {
			console.log(data)
		})
		this.setState({value: ''})
		e.preventDefault()
	}


    render() {
        const {classes} = this.props
        return (
            <Box container className={classes.position}>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        {
                            this.state.messages.map((element, index) => {
                                const roleStyle = {
                                    color: element.role === "server" ? "#9c9c9c" :
                                    element.role === "default" ? "#5D6679" : 
                                    element.role === "support" ? "#214EC4" :
                                    element.role === "admin" ? "#EB7154" :
                                    element.role === "founder" ? "#21C446" : 'red'
                                }
                                return (
                                <ListItem key={index}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText 
                                            align="left" 
                                            primaryTypographyProps={{ style: roleStyle }}
                                            primary={
                                                `[${element.role.toUpperCase()}] 
                                                ${element.from}: ${element.text}`
                                            }></ListItemText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText align="left" secondary={element.createdDate}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )})	
                        }
                    </List>
                    <Grid container fullWidth style={{padding: '1px'}}>
                        <Grid item xs={11}>
                            <TextField 
                            onKeyDown={this.onKeyDown}
                            value={this.state.value}
                            onChange={this.handleChange}
                            variant="outlined" 
                            label="Message" 
                            fullWidth />
                        </Grid>
                        <Grid xs={1}>
                            <Button
                            onClick={this.handleSubmit}
                            sx={{padding: '15px'}}
                            size='large'
                            variant='outlined'
                            color="primary">
                                <SendIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Box>
        );
    }
}

export default withStyles(styles, { withTheme: true})(Chat)