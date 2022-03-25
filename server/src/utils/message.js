var moment = require('moment');

var generateMessage = (role, from, room, text) => {
    return {
        role,
        from,
        room,
        text,
        createdDate: moment().valueOf()
    }
};

module.exports = generateMessage