import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface States {
  coins: number
  power: number
  batteries: number
  rechargedBateries: number
}

interface Actions {
  addCoins: (coins: number) => void
  addPower: (power: number) => void
  miningCoins: () => void
  addBateries: (bateries: number) => void
  rechargeBateries: (bateries: number) => void
  reset: () => void
}

type CoinStore = States & Actions

export const useMainStore = create<CoinStore>()(persist((set) => {
  return {
    coins: 0,
    batteries: 0,
    rechargedBateries: 0,
    power: 1,
    addCoins(coins) {
      set(state => ({coins: state.coins + coins}))
    },
    addPower(power) {
      set(state => ({power: state.power + power}))
    },
    miningCoins() {
      set(state => ({coins: state.coins + state.power / 100000000}))
    },
    addBateries(bateries) {
      set({batteries: bateries, rechargedBateries: bateries})
    },
    rechargeBateries(bateries) {
      set({rechargedBateries: bateries})
    },
    reset() {
      set({coins: 0,
        power: 1,
        batteries: 0,
        rechargedBateries: 0,
      })
    },
  }
}, {
  name: 'store'
}))