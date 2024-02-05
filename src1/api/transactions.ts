import axios from "axios";
import instance from "../hooks/instance";
import {Transaction} from "../models/Transaction"

export async function getTransactionList({type, addresses}: any) {

    if (type === "VXXL") {
        const response = await axios.get(`https://explorer.vxxl.org/ext/getaddresstxsajax/${addresses.vxxl}`)

        const transactions = response.data.data.map((item: any) => {
            const isReceive = item[2] > item[3];

            return new Transaction({
                type,
                hash: item[1],
                date: new Date(item[0]),
                receive: item[2] / 100000000,
                send: item[3] / 100000000,
                amount: isReceive ? item[2] / 100000000 : item[3] / 100000000,
                sender: !!item[3] && addresses.vxxl,
            })
        })

        return transactions
    }

    if (type === "BTC") {
        const query = new URLSearchParams({
            limit: 10,
            offset: 0,
            address: addresses.btc
        } as any)

        const response = await axios.get(`https://transact.vxxl.org/api/v1/bitcoin/address-transactions?${query.toString()}`)

        return response.data.data.map((tx: any) => {
            const isReceive = tx.receiver === addresses.btc

            return new Transaction({
                type,
                hash: tx.hash,
                date: new Date(tx.time),
                receive: isReceive ? Math.abs(tx.amount).toFixed(5) : 0,
                send: !isReceive ? Math.abs(tx.amount).toFixed(5) : 0,
                amount: Math.abs(tx.amount).toFixed(5),
                blockIndex: tx.blockHeight,
                sender: tx.sender
            })
        })
    } else {
        const response = await instance.post('/getTransactions', {
            BTCaddres: addresses?.btc,
            BNBaddres: addresses?.bnb,
            network: 'bsc'
        })

        const receiver = response?.data?.reciver?.ethereum?.transfers;
        const sender = response?.data?.sender?.ethereum?.transfers;

        const receiverAddresses = receiver.map((i: any) => i.transaction.hash);

        const data = [...receiver, ...sender].filter(item => item.currency.symbol === type);
        const sortByDate = data.sort((a, b) => {
            return (new Date(`${b?.block?.timestamp?.time?.split(' ')[0]}T${b?.block?.timestamp?.time?.split(' ')[1]}`) as any) - (new Date(`${a?.block?.timestamp?.time?.split(' ')[0]}T${a?.block?.timestamp?.time?.split(' ')[1]}`) as any)
        })

        return sortByDate.map((item, index) => {
            const isReceive = receiverAddresses?.includes(item.transaction?.hash) && item.transaction?.hash !== sortByDate[index - 1]?.transaction?.hash

            return new Transaction({
                type,
                hash: item.transaction.hash,
                date: new Date(`${item?.block?.timestamp?.time?.split(' ')[0]}T${item?.block?.timestamp?.time?.split(' ')[1]}`),
                receive: isReceive ? item.amount : 0,
                send: !isReceive ? item.amount : 0,
                amount: item.amount,
                blockIndex: item.block.height,
                sender: item.address.address
            })
        })
    }

}

export async function getTransactionDetails(transaction: any) {

    if (transaction.type === "VXXL") {
        const response = await axios.get(`https://explorer.vxxl.org/ext/gettx/${transaction.hash}`)

        const {tx} = response.data;

        console.log(tx, transaction)

        if (!!transaction.receive && !transaction.send)  {
            transaction.amount = Number(transaction.receive).toFixed(5)
        }

        if (!!transaction.send && !transaction.receive) {
            transaction.amount = Number(transaction.send).toFixed(5)
        }

        if (!!transaction.send && !!transaction.receive) {
            transaction.amount = Number(transaction.send - transaction.receive).toFixed(5)
        }

        return new Transaction({
            ...transaction,
            hash: tx.txid,
            blockIndex: tx.blockindex,
            sender: tx.vin[0].addresses,
            receive: !!transaction.receive && !transaction.send
        })
    }

    if (transaction.type === "BTC") {
        return new Transaction(transaction)
    } else {
        return new Transaction(transaction)
    }

}
