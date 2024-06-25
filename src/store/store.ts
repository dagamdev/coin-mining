import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface States {
  coins: number
  power: number
  batteries: number
  chargedBatteries: number
  batteryElapsedTime: number
}

interface Actions {
  addCoins: (coins: number) => void
  addPower: (power: number) => void
  miningCoins: () => void
  addBatteries: (batteries: number) => void
  addChargedBatteries: (batteries: number) => void
  reset: () => void
  batteryTimes: (time: number) => void
}

type MainStore = States & Actions

export const useMainStore = create<MainStore>()(persist((set) => {
  return {
    coins: 0,
    power: 10,
    batteries: 0,
    chargedBatteries: 0,
    batteryElapsedTime: 0,
    addCoins(coins) {
      set(state => ({coins: state.coins + coins}))
    },
    addPower(power) {
      set(state => ({power: state.power + power}))
    },
    miningCoins() {
      set(state => ({coins: state.coins + state.power / 100000000}))
    },
    addBatteries(batteries) {
      set(store => ({
        batteries: store.batteries + batteries, 
        chargedBatteries: store.chargedBatteries + batteries
      }))
    },
    addChargedBatteries(batteries) {
      set(store => ({chargedBatteries: store.chargedBatteries + batteries}))
    },
    reset() {
      set({
        coins: 0,
        power: 20,
        batteries: 0,
        chargedBatteries: 0,
        batteryElapsedTime: 0
      })
    },
    batteryTimes(time) {
      set(state => {
        const definiteTime = time + state.batteryElapsedTime
        let chargedBatteries = state.chargedBatteries - Math.floor(definiteTime / 60_000)
        console.log({definiteTime, chargedBatteries, dischargedBatteries: Math.floor(definiteTime / 60_000), batteryElapsedTime: definiteTime % 60_000})
        if (chargedBatteries < 0) chargedBatteries = 0
        console.log({chargedBatteries})

        return { batteryElapsedTime: definiteTime % 60_000, chargedBatteries }
      })
    }
  }
}, {
  name: 'store'
}))