import { create } from 'zustand'
import { getLocalData, saveLocalData } from '../lib/utils'

interface States {
  coins: number
}

interface Actions {
  addCoins: (coins: number) => void
  setCoins: (coins: number) => void
}

type CoinStore = States & Actions
const coins = getLocalData('coins', true) ?? 0

export const useCoinsStore = create<CoinStore>()((set) => {
  return {
    coins,
    addCoins(coins) {
      set(state => {
        const newCoinsValance = +(state.coins + coins).toFixed(10)
        saveLocalData('coins', newCoinsValance)

        return {coins: newCoinsValance}
      })
    },
    setCoins(coins) {
      saveLocalData('coins', coins)
      set({coins})
    }
  }
})