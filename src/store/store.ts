import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useCoinsStore } from './coins'
import { TIMES } from '../lib/constants'
import { getLocalData } from '../lib/utils'

interface States {
  coins: number
  power: number
  batteries: number
  chargedBatteries: number
  batteryUsageTime: number
}

interface Actions {
  addCoins: (coins: number) => void
  addPower: (power: number) => void
  miningCoins: () => void
  addBatteries: (batteries: number) => void
  addChargedBatteries: (batteries: number) => void
  reset: () => void
  calculateAbsenceChanges: () => void
}

type MainStore = States & Actions

export const useMainStore = create<MainStore>()(persist((set) => {
  return {
    coins: 0,
    power: 10,
    batteries: 0,
    chargedBatteries: 0,
    batteryUsageTime: 0,
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
        batteries: 2,
        chargedBatteries: 2,
        batteryUsageTime: 0
      })
    },
    calculateAbsenceChanges() {
      set(state => {
        const lastTime: number = getLocalData('lastTime', true) ?? 0
        const absenceTime = Date.now() - lastTime
        const totalTime = absenceTime + state.batteryUsageTime
        const totalBatteryTime = state.chargedBatteries * TIMES.HOUR - state.batteryUsageTime
        let coins = 0
        let chargedBatteries = state.chargedBatteries
        let batteryUsageTime = state.batteryUsageTime

        console.log({absenceTime, totalTime, totalBatteryTime}, totalBatteryTime - totalTime)

        if (totalBatteryTime - totalTime < 0) {
          coins = Math.floor(totalBatteryTime / 1000) * state.power
          chargedBatteries = 0
          batteryUsageTime = 0
        } else {
          coins = Math.floor(totalTime / 1000) * state.power
          chargedBatteries -= Math.floor(totalTime / TIMES.HOUR)
        }

        console.log({batteryUsageTime})
        if (batteryUsageTime && chargedBatteries === 0) batteryUsageTime = 0
        else batteryUsageTime = totalTime % TIMES.HOUR

        console.log({coins})
        useCoinsStore.getState().addCoins(coins / 100000000)
        console.log({ batteryUsageTime, chargedBatteries })

        return { batteryUsageTime, chargedBatteries }
      })
    }
  }
}, {
  name: 'store'
}))