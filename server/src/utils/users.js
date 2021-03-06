class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, role, username, room) {
        const user = { id, role, username, room };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        const user = this.getUser(id);

        if(user){
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        const users = this.users.filter((user) => user.room === room);
        const namesArr = users.map(user => user.username);
        return namesArr
    }

}

module.exports = Users