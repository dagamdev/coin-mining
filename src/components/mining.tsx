import { useEffect, useState } from "react"
import { useMainStore } from "../store/store"

export default function Mining () {
  const [coins, power, miningCoins, addCoins, addPower] = useMainStore(store => [store.coins, store.power, store.miningCoins, store.addCoins, store.addPower])
  const [inputPower, setInputPower] = useState(0)

  useEffect(() => {
    miningCoins()
    const interval = setInterval(miningCoins, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const buyPower = () => {
    addPower(inputPower)
    addCoins(- inputPower * .00000100)
    setInputPower(0)
  }

  return (
    <section>
      <h2>Mining</h2>
      <ul>
        <li>
          <p>Coins:</p>
          <strong>🪙 {coins.toFixed(8)}</strong>
        </li>
        <li>
          <p>Mining power:</p>
          <strong>⛏️ {power}</strong>
        </li>
      </ul>

      <div>
          <label>
            <h3>Buy power</h3>
            <p><strong>⛏️ 1</strong> = <strong>🪙 0.00000100</strong></p>
            <div>
              <input type="number" onChange={(ev) => {
                setInputPower(+ev.target.value)
              }} value={inputPower} />
              <button onClick={buyPower}>Buy</button>
            </div>
            {inputPower !== 0 && <p>⛏️ {inputPower} = 🪙 {0.00000100 * inputPower}</p>}
          </label>
        </div>
    </section>
  )
}