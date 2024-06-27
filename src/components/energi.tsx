import { useEffect } from "react"
import { useMainStore } from "../store/store"
import { formattedTime, saveLocalData } from "../lib/utils"
import { TIMES_IN_MILLISECONDS } from "../lib/constants"
import '../extensions'

export default function Energi () {
  const [batteries, chargedBatteries, batteryUsageTime, calculateAbsenceChanges, power] = useMainStore(store => 
    [store.batteries, store.chargedBatteries, store.batteryUsageTime, store.calculateAbsenceChanges, store.power]
  )

  useEffect(() => {
    calculateAbsenceChanges()

    const interval = setInterval(() => {
      saveLocalData('lastTime', Date.now())
    }, 1000)

    // const unload = () => {
    //   saveLocalData('lastTime', Date.now())
    // }

    // window.addEventListener('unload', unload)

    return () => {
      clearInterval(interval)
      // window.removeEventListener('unload', unload)
    }
  }, [])

  const remainingBatteryTime = chargedBatteries === 0 ? 0 : TIMES_IN_MILLISECONDS.HOUR - batteryUsageTime
  const basenteeMiningTime = chargedBatteries * TIMES_IN_MILLISECONDS.HOUR - batteryUsageTime
  const dischargedBatteries = batteries - chargedBatteries

  return (
    <section>
      <div>
        <h2>⚡ Energi</h2>
      </div>
      
      <div>
        <ul className="measures">
          <li>
            <p>Batteries:</p>
            <strong>🔋{batteries}</strong>
          </li>
          <li>
            <p>Charged batteries:</p>
            <strong>🔋{chargedBatteries}/{batteries}</strong>
          </li>
          <li>
            <p>Absentee mining time:</p>
            <strong>⏱️ {formattedTime(basenteeMiningTime)}</strong>
          </li>
          <li>
            <p>Remaining battery energy:</p>
            <strong>{(remainingBatteryTime * 100 / TIMES_IN_MILLISECONDS.HOUR).toFixed(2)}%</strong>
          </li>
          <li>
            <p>Remaining battery time:</p>
            <strong>⏳ {formattedTime(remainingBatteryTime)}</strong>
          </li>
          <li>
            <p>Profits earned:</p>
            <strong>🪙 {((dischargedBatteries * TIMES_IN_MILLISECONDS.HOUR + batteryUsageTime) / TIMES_IN_MILLISECONDS.SECOND * power / 100000000).toFixed(8)}</strong>
          </li>
          <li>
            <p>Absentee earnings:</p>
            <strong>🪙 {(power * Math.floor(basenteeMiningTime / 1000) / 100000000).toFixed(8)}</strong>
          </li>
        </ul>

        <div className="text">
          <p>Energy allows you to mine coins while you are not connected to the web page.</p>
          <p>Each battery allows you to mine for one hour in your absence.</p>
        </div>
      </div>
    </section>
  )
}