import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface States {
  coins: number
  energi: number
  power: number
  maxEnergi: number
}

interface Actions {
  addCoins: (coins: number) => void
  addPower: (power: number) => void
  miningCoins: () => void
  addEnergi: (energi: number) => void
}

type CoinStore = States & Actions

export const useMainStore = create<CoinStore>()(persist((set) => {
  return {
    coins: 0,
    energi: 0,
    maxEnergi: 0,
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
    addEnergi(energi) {
      set(state => ({energi: state.energi + energi}))
    },
  }
}, {
  name: 'store'
}))
