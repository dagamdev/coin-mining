import { FormEvent, useEffect, useState } from "react"
import { useMainStore } from "../store/store"
import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"

export default function Mining () {
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const [power, addPower] = useMainStore(store => [store.power, store.addPower])
  const [inputPower, setInputPower] = useState('')
  const [message, setMessage] = useState('')
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

  const buyPower = (ev: FormEvent) => {
    ev.preventDefault()
    const amount = +(+inputPower * PRICES.POWER).toFixed(8)

    if (coins - amount < 0) {
      setMessage("You don't have enough coins to buy that mining power")
      return
    }

    addCoins(-amount)
    addPower(+inputPower)
    setInputPower('')
  }

  const changeSpeed = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const value = +ev.currentTarget.speed.value
    if (value < 1 || value > 10) return
    setUpdateSpeed(value)
  }

  return (
    <section>
      <div className="head">
        <h2>Mining</h2>
      </div>

      <div>
        <ul>
          <li className="measurement">
            <p>Coins:</p>
            <strong>🪙 {coins.toFixed(8)}</strong>
          </li>
          <li className="measurement">
            <p>Mining power:</p>
            <strong>⛏️ {power}</strong>
          </li>
        </ul>

        <form>
          <label>
            <h3>Buy power</h3>
            <p className="text-sm">⛏️1 = 🪙{PRICES.POWER}</p>
            <div className="form_section">
              <input type="number" onChange={(ev) => {
                setInputPower(ev.target.value)
                setMessage('')
              }} value={inputPower} />
              <button onClick={buyPower}>Buy</button>
            </div>
            {inputPower && <p>⛏️{inputPower} = 🪙{(PRICES.POWER * (+inputPower)).toFixed(8)}</p>}
            {message.length !== 0 && <p className="error">{message}</p>}
          </label>
        </form>

        <form onSubmit={changeSpeed}>
          <label>
            <span>Update speed times per second: {updateSpeed}</span>
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