import axios from 'axios';
import {getTransaction} from './TransactionPPC';

export default async function createTransaction({ currency = 'VXXL', from, to, amount }) {

  if (currency === 'VXXL') {
    const response = await axios.post(`https://transact.vxxl.org/api/v1/get-transaction-vxxl?network=mainnet`, {
			address: from,
			amount: Math.round(amount * 100000000),
			changeAddress: to,
		});

    const txRaw = JSON.parse(response.data.data.txObject);
		delete txRaw.hash;

    const Transaction = getTransaction('vxxl');
    return new Transaction(txRaw);
  }

	// BTC transaction
	const response = await axios.post(`https://transact.vxxl.org/api/v1/get-transaction`, {
		address: from,
		amount: Math.round(amount * 100000000),
		changeAddress: to,
	});

	const txRaw = JSON.parse(response.data.data.txObject);
	delete txRaw.hash;
	
	const Transaction = getTransaction();
	return new Transaction(txRaw);
}
