export const getCurrentBalance = (activeWallet, date) => {
  switch (activeWallet){
    case 'BTC': return Number(date?.btc)?.toFixed(6)
    case 'USDT': return Number(date?.usdt)?.toFixed(6)
    case 'BNB': return Number(date?.bnb)?.toFixed(6)
    case 'VXXL': return Number(date?.vxxl)?.toFixed(6)
  }
}

export const getCurrentAddress = (activeWallet, date) => {
  switch (activeWallet){
    case 'BTC': return date?.btc
    case 'USDT': return date?.usdt
    case 'BNB': return date?.bnb
    case 'VXXL': return date?.vxxl
  }
}

export const getTotalBalanceUsdt = (date, price) => {
  let totalBalance = 0
  totalBalance = totalBalance + (Number(date?.btc) * price?.btc)
  totalBalance = totalBalance + (Number(date?.bnb) * price?.bnb)
  totalBalance = totalBalance + (Number(date?.vxxl) * price?.vxxl)
  totalBalance = totalBalance +  Number(date?.usdt)
  return totalBalance.toFixed(2)
}

export const getBalanceUsdt = (date, price, activeWallet) => {
  switch (activeWallet){
    case 'BTC': return (Number(date?.btc) * price?.btc).toFixed(4)
    case 'USDT': return Number(date?.usdt).toFixed(4)
    case 'BNB': return (Number(date?.bnb) * price?.bnb).toFixed(4)
    case 'VXXL': return (Number(date?.vxxl) * price?.vxxl).toFixed(4)
  }
}
