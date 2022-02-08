import axios from 'axios'

const tokenSource = 'https://tokens.coingecko.com/uniswap/all.json'

export const getTokens = () => {
  return axios.get(tokenSource, {
    headers: { 'Content-Type': 'application/json' },
  })
}
