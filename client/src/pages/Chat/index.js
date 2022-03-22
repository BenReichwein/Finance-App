import React from 'react'
import SocketIOClient from 'socket.io-client'
import moment from 'moment'

import Button from '../../components/Button'

class Chat extends React.Component {
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
		this.socket.emit('join', {name: 'Ben'}, function (err) {
            if (err) {
                this.props.history.push('/');
            }
        });

		this.socket.on('newMessage', (message) => {
            var formattedTime = moment(message.createdDate).format('h:mm a');
            let newMsg = {
                text: message.text,
                from: message.from,
                room: message.room,
                createdDate: formattedTime
            }
            let results = scopeThis.state.messages;
            results.push(newMsg);
            scopeThis.setState({
                messages: results
            });

            // var msgArr = scopeThis.state.messages.filter(message => message.room === this.props.match.params.room);
            // if (msgArr.length > 3) {
            //     scopeThis.scrollToBottom();
            // }
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
		return(
			<div>
				<ul id="messages">
					{
						this.state.messages.map((o) => (
							<><li>{o.from}</li><li>{o.text}</li></>
						))	
					}
				</ul>
			      <input id="m" autoComplete="off" value={this.state.value} onChange={this.handleChange} />
			      <Button onClick={this.handleSubmit}>Send</Button>
		    </div>
		)
	}
}

export default Chat