import { type FormEvent, useState, useEffect } from "react"
import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/store"

export default function BuyPower () {
  const [addPower] = useMainStore(store =>
    [store.addPower]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const [inputPower, setInputPower] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (message) setTimeout(() => {
      setMessage('')
    }, 20_000)
  }, [message])

  const buyPower = (ev: FormEvent) => {
    ev.preventDefault()
    console.log('buy power')

    if (+inputPower <= 0) {
      setMessage('Enter an amount of purchasing power')
      return
    }
    
    const amount = +(+inputPower * PRICES.POWER).toFixed(8)

    if (coins - amount < 0) {
      setMessage("You don't have enough coins to buy that mining power")
      return
    }

    addCoins(-amount)
    addPower(+inputPower)
    setInputPower('')
  }
  
  return (
    <form>
      <label>
        <h3>Buy power</h3>

        <div className="form_section">
          <input type="number" onChange={(ev) => {
            setInputPower(ev.target.value)
            setMessage('')
          }} value={inputPower} min={0} />

          <button className="form-button" disabled={inputPower.length === 0} onClick={buyPower}>Buy</button>
        </div>
      </label>

      {message.length !== 0 && <p className="error">{message}</p>}
      {inputPower.length !== 0 && <div className="form_stats">
        <p className="text-sm">Hourly earning: 🪙<strong>{(+inputPower * 3600 / 100000000).toFixed(8)}</strong></p>
        <p className="text-sm">Payment Cost: 🪙<strong>{(PRICES.POWER * (+inputPower))}</strong></p>
      </div>}
    </form>
  )
}