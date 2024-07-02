import { useEffect } from "react"
import { useMainStore } from "../store/main"
import { formattedTime, getCoinFormat, saveLocalData } from "../lib/utils"
import { TIMES } from "../lib/constants"

export default function Energi () {
  const [batteries, chargedBatteries, batteryUsageTime, calculateAbsenceChanges, power, bonus] = useMainStore(store => 
    [store.batteries, store.chargedBatteries, store.batteryUsageTime, store.calculateAbsenceChanges, store.power, store.bonus]
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

  const remainingBatteryTime = chargedBatteries === 0 ? 0 : TIMES.HOUR - batteryUsageTime
  const basenteeMiningTime = chargedBatteries * TIMES.HOUR - batteryUsageTime
  const dischargedBatteries = batteries - chargedBatteries
  const totalPower = power + bonus * power / 100

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
            <strong>{(remainingBatteryTime * 100 / TIMES.HOUR).toFixed(2)}%</strong>
          </li>
          <li>
            <p>Remaining battery time:</p>
            <strong>⏳ {formattedTime(remainingBatteryTime)}</strong>
          </li>
          <li>
            <p>Profits earned:</p>
            <strong>🪙 {getCoinFormat((dischargedBatteries * TIMES.HOUR + batteryUsageTime) / TIMES.SECOND * totalPower / 100000000)}</strong>
          </li>
          <li>
            <p>Absentee earnings:</p>
            <strong>🪙 {getCoinFormat(totalPower * Math.floor(basenteeMiningTime / 1000) / 100000000)}</strong>
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