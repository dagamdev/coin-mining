import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useCoinsStore } from './coins'
import { TIMES } from '../lib/constants'
import { getLocalData } from '../lib/utils'

interface States {
  coins: number
  power: number
  bonus: number
  batteries: number
  miningInterval: number
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
  updateMiningInterval: (newInterval: number) => void
}

type MainStore = States & Actions

export const useMainStore = create<MainStore>()(persist((set) => {
  return {
    coins: 0,
    power: 10,
    bonus:0,
    batteries: 0,
    miningInterval: 4,
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
        bonus: 0,
        batteries: 2,
        miningInterval: 4,
        chargedBatteries: 2,
        batteryUsageTime: 0
      })
    },
    calculateAbsenceChanges() {
      set(state => {
        const lastTime: number = getLocalData('lastTime', true) ?? 0
        const absenceTime = Date.now() - lastTime
        let chargedBatteries = state.chargedBatteries
        let batteryUsageTime = state.batteryUsageTime
        const totalTime = absenceTime + batteryUsageTime
        const remainingEnergyTime = chargedBatteries * TIMES.HOUR - totalTime
        let coins = 0

        if (remainingEnergyTime < 0) {
          coins = Math.floor((chargedBatteries * TIMES.HOUR - batteryUsageTime) / 1000) * state.power
          chargedBatteries = 0
          batteryUsageTime = 0
        } else {
          coins = Math.floor(absenceTime / 1000) * state.power
          chargedBatteries -= Math.floor(totalTime / TIMES.HOUR)
          batteryUsageTime = totalTime % TIMES.HOUR
        }

        useCoinsStore.getState().addCoins(coins / 100000000)

        return { batteryUsageTime, chargedBatteries }
      })
    },
    updateMiningInterval(newInterval) {
      set({miningInterval: newInterval})
    },
  }
}, {
  name: 'store'
}))