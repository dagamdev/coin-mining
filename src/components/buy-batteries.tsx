import { useEffect, useState, type FormEvent } from "react"
import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/store"

export default function BuyBatteries () {
  const [addBatteries] = useMainStore(store =>
    [store.addBatteries]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const [inputBatteries, setInputBatteries] = useState('')
  const [buyMessage, setBuyMessage] = useState('')

  useEffect(() => {
    if (buyMessage) setTimeout(() => {
      setBuyMessage('')
    }, 20_000)
  }, [buyMessage])

  const buyBateries = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const bateriesCount = +ev.currentTarget.bateries.value

    if (bateriesCount < 1) return
    const price = bateriesCount * PRICES.BATTERY

    if (coins < price) {
      setBuyMessage(`No tienes suficientes monedas para comprar 🔋${bateriesCount}.`)
      return
    }

    addBatteries(bateriesCount)
    addCoins(-price)
  }

  return (
    <form onSubmit={buyBateries}>
      <label>
        <h3>Buy batteries</h3>

        <div className="form_section">
          <input onChange={(ev) => {
            setInputBatteries(ev.currentTarget.value)
            setBuyMessage('')
          }} value={inputBatteries} name="bateries" type="number" min={1} />
          <button disabled={inputBatteries.length === 0}>Buy</button>
        </div>
      </label>

      {buyMessage.length !== 0 && <p className="error">{buyMessage}</p>}
      {inputBatteries.length !== 0 && <div className="form_stats">
        <p className="text-sm">Payment Cost: 🪙<strong>{(PRICES.BATTERY * (+inputBatteries)).toFixed(8)}</strong></p>
      </div>}
    </form>
  )
}