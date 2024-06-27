import { FormEvent, useEffect, useState } from "react"
import { useMainStore } from "../store/store"
import { useCoinsStore } from "../store/coins"

export default function Mining () {
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const [power] = useMainStore(store => [store.power])
  const [updateSpeed, setUpdateSpeed] = useState(1)

  const miningCoins = () => {
    addCoins(+(power / 100000000 / updateSpeed).toFixed(10))
  }

  useEffect(() => {
    miningCoins()
    const interval = setInterval(miningCoins, 1000 / updateSpeed)

    return () => {
      clearInterval(interval)
    }
  }, [updateSpeed, power])

  const changeSpeed = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const value = +ev.currentTarget.speed.value
    if (value < 1 || value > 10) return
    setUpdateSpeed(value)
  }

  return (
    <section>
      <div className="head">
        <h2>🪨 Mining</h2>
      </div>

      <div>
        <ul className="measures">
          <li>
            <p>Coins:</p>
            <strong>🪙 {coins.toFixed(8)}</strong>
          </li>
          <li>
            <p>Mining power:</p>
            <strong>⛏️ {power}</strong>
          </li>
          <li>
            <p>Hourly earning:</p>
            <strong>🪙 {(power * (60 * 60) / 100000000).toFixed(8)}</strong>
          </li>
        </ul>

        <form onSubmit={changeSpeed}>
          <label>
            <span>Balance update time: {updateSpeed} per secon</span>
            <div className="form_section">
              <input name="speed" type="number" min={1} max={10} />
              <button>Update</button>
            </div>
          </label>
        </form>
      </div>
    </section>
  )
}