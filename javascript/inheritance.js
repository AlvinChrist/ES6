class Mail {
    constructor(author) {
        this.from = author;
        this._contacts = [];
    }
    sendMessage(msg, to) {
        console.log(`you send: ${msg} to ${to} from ${this.from}`);
        this._contacts.push(to);
    }
    showAllContacts() {
        return this._contacts;
    }
    whoAmI(){
        return this.from;
    }
}

class WhatsApp extends Mail {
    constructor(username, isBussinessAccount,phone) {
        super(phone);
        this.username = username;
        this.isBussinessAccount = isBussinessAccount;
    }    
    myProfile() {
        return `my name ${this.username}, is ${this.isBussinessAccount ? 'Business' : 'Personal'}`;
    }
}

const wa1 = new WhatsApp('Alvin',false,'08991720400');
console.log(wa1.whoAmI());
// my name dicoding, is Business