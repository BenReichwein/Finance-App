const generateMessage = require('../utils/message.js')
const isRealString = require('../utils/validation')
const Users = require('../utils/users')
var users = new Users()
const ROOM = 'general'

const socketOps = (socket, io) => {
    socket.on('join', (params, callback) => {
        if (!isRealString(params.username)) {
            return callback('Bad request');
        }

        socket.join(ROOM);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.role, params.username, ROOM);

        io.to(ROOM).emit('updateUserList', users.getUserList(ROOM));
        socket.emit('newMessage', generateMessage('server', '', ROOM, 'Welcome back!'));
        socket.broadcast.to(ROOM).emit('newMessage', generateMessage(
            'server', 
            '', 
            ROOM, 
            `${params.username} has joined.`
        ));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            let tempObj = generateMessage(user.role, user.username, user.room, message.text);
            io.to(user.room).emit('newMessage', tempObj);
            callback({
                data: tempObj
            });
        }
        callback();
    });

    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage(
                'server',
                '', 
                user.room, 
                `${user.username} has left.`
            ));
        }
    });
}

module.exports = socketOps