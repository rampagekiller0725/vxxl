
export class Transaction  {
    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    type: any;
    hash: any;
    date: any;
    receive: any;
    send: any;
    blockIndex: any;
    amount: any;
    sender: any;

    constructor({ type, hash, receive, send, date, blockIndex, amount, sender }: any) {
        this.type = type
        this.hash = hash;
        this.date = date;
        this.receive = receive;
        this.send = send;
        this.blockIndex = blockIndex;
        this.amount = amount;
        this.sender = sender;
    }

    getDateString() {
        const fullDate = new Date(this.date);
        const month = this.monthNames[fullDate.getMonth()];
        const day = fullDate.getDate();
        const year = fullDate.getFullYear();

        const hours = fullDate.getHours();
        const minutes = fullDate.getMinutes();

        // const dayFormatted = day > 10 ? day : `0${day}`;
        const hoursFormatted = hours >= 10 ? hours : `0${hours}`;
        const minutesFormatted = minutes >= 10 ? minutes : `0${minutes}`;

        return `${month} ${day}, ${year} ${hoursFormatted}:${minutesFormatted}`
    }
}
