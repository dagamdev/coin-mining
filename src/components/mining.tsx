import { useEffect, useRef } from "react"
import { useMainStore } from "../store/main"
import { useCoinsStore } from "../store/coins"
import DisplayCoins from "./display-coins"
import { INTERVAL_VALUES } from "../lib/constants"
import { convertToCoins } from "../lib/utils"

export default function Mining () {
  const [addCoins] = useCoinsStore(store => [store.addCoins])
  const [power, miningInterval] = useMainStore(store => [store.power, store.miningInterval])
  const miningSpeed = INTERVAL_VALUES[miningInterval]
  const lastMininigTime = useRef(Date.now())

  const miningCoins = () => {
    // return
    const nowTime = Date.now()
    const elapsedTime = nowTime - lastMininigTime.current
    lastMininigTime.current = nowTime
    addCoins(convertToCoins(power * elapsedTime / 1000))
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
            <strong>⛏️ {power}</strong>
          </li>
          <li>
            <p>Hourly earning:</p>
            <strong>🪙 {power * (60 * 60) / 100000000}</strong>
          </li>
        </ul>
      </div>
    </section>
  )
}