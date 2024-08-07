import { useEffect, useRef } from "react"
import { useMainStore } from "../store/main"
import { useCoinsStore } from "../store/coins"
import DisplayCoins from "./display-coins"
import { INTERVAL_VALUES } from "../lib/constants"
import { convertToCoins, getCoinFormat } from "../lib/utils"

export default function Mining () {
  const [addCoins] = useCoinsStore(store => [store.addCoins])
  const [power, miningInterval, bonus] = useMainStore(store => [store.power, store.miningInterval, store.bonus])
  const miningSpeed = INTERVAL_VALUES[miningInterval]
  const lastMininigTime = useRef(Date.now())
  const bonusPower = bonus * power / 100

  const miningCoins = () => {
    const nowTime = Date.now()
    const elapsedTime = nowTime - lastMininigTime.current
    lastMininigTime.current = nowTime
    const totalPower = power + bonus * power / 100

    addCoins(convertToCoins(totalPower * elapsedTime / 1000))
  }

  useEffect(() => {
    const interval = setInterval(miningCoins, miningSpeed * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [power, miningSpeed])

  return (
    <section>
      <div className="head">
        <h2>🪨 Mining</h2>
      </div>

      <div>
        <ul className="measures">
          <li>
            <p>Coins:</p>
            <DisplayCoins />
          </li>
          <li>
            <p>Mining power:</p>
            <strong>⛏️ {power.toLocaleString()}</strong>
          </li>
          <li>
            <p>Hourly earning:</p>
            <strong>🪙 {getCoinFormat(convertToCoins(power * 3600))}</strong>
          </li>
          <li>
            <p>Total power:</p>
            <strong>⛏️{(power + bonusPower).toLocaleString()}</strong>
          </li>
          <li>
            <p>Total hourly earning:</p>
            <strong>🪙{getCoinFormat(convertToCoins((power + bonusPower) * 3600))}</strong>
          </li>
        </ul>
      </div>
    </section>
  )
}