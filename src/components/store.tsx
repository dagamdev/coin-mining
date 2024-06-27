import { FormEvent, useEffect, useState } from "react"
import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/store"
import BuyPower from "./buy-power"
import BuyBatteries from "./buy-batteries"

export default function Store () {
  const [batteries, chargedBatteries, addChargedBatteries] = useMainStore(store =>
    [store.batteries, store.chargedBatteries, store.addChargedBatteries]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const [inputRechargeBatteries, setInputRechargeBatteries] = useState('')
  const [rechargeMessage, setRechargeMessage] = useState('')

  useEffect(() => {
    if (rechargeMessage.length) setTimeout(() => {
      setRechargeMessage('')
    }, 20_000)
  }, [rechargeMessage])

  const rechargeBateries = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (!(batteries - chargedBatteries)) {
      setRechargeMessage('No tienes baterias para recargar')
      return
    }

    const rechargeBateriesCount = +inputRechargeBatteries

    if (rechargeBateriesCount < 1 || rechargeBateriesCount > batteries) return
    const price = rechargeBateriesCount * PRICES.BATTERY_RECHARGE

    if (coins < price) {
      setRechargeMessage(`No tienes suficientes monedas para recargar 🔋${rechargeBateriesCount}.`)
      return
    }

    addChargedBatteries(rechargeBateriesCount)
    addCoins(-price)
  }

  return (
    <section>
      <div>
        <h2>🧺 Store</h2>
      </div>

      <div>
        <BuyPower />
        <BuyBatteries />

        <form onSubmit={rechargeBateries}>
          <label>
            <h3>Recharge batteries</h3>

            <div className="form_section">
              <input onChange={(ev) => {
                setInputRechargeBatteries(ev.currentTarget.value)
                setRechargeMessage('')
              }} value={inputRechargeBatteries} type="number" min={1} max={batteries || 1} />
              <button disabled={inputRechargeBatteries.length === 0}>Recharge</button>
            </div>
          </label>

          {rechargeMessage.length !== 0 && <p className="error">{rechargeMessage}</p>}
          {inputRechargeBatteries.length !== 0 && <div className="form_stats">
            <p className="text-sm">Payment Cost: 🪙<strong>{(PRICES.BATTERY_RECHARGE * (+inputRechargeBatteries)).toFixed(8)}</strong></p>
          </div>}
        </form>
      </div>
    </section>
  )
}