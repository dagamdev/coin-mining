import { FormEvent, useState } from "react"
import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/store"
import BuyPower from "./buy-power"

export default function Store () {
  const [batteries, addBatteries, chargedBatteries, addChargedBatteries] = useMainStore(store =>
    [store.batteries, store.addBatteries, store.chargedBatteries, store.addChargedBatteries]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const [buyMessage, setBuyMessage] = useState('')
  const [rechargeMessage, setRechargeMessage] = useState('')

  const buyBateries = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const bateriesCount = +ev.currentTarget.bateries.value

    if (bateriesCount < 1) return
    const price = bateriesCount * PRICES.BATERIE

    if (coins < price) {
      setBuyMessage(`No tienes suficientes monedas para comprar 🔋${bateriesCount}.`)
      return
    }

    addBatteries(bateriesCount)
    addCoins(-price)
  }

  const rechargeBateries = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if (!(batteries - chargedBatteries)) {
      setRechargeMessage('No tienes baterias para recargar')
      return
    }

    const rechargeBateriesCount = +ev.currentTarget.rechargeBateries.value

    if (rechargeBateriesCount < 1 || rechargeBateriesCount > batteries) return
    const price = rechargeBateriesCount * PRICES.RECHARGE_BATERIE

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

        <form onSubmit={buyBateries}>
          <h3>Buy batteries</h3>

          <label>
            <p className="text-sm">🔋1 = 🪙{PRICES.BATERIE}</p>
            <div className="form_section">
              <input onChange={() => setBuyMessage('')} name="bateries" type="number" min={1} />
              <button>Buy</button>
            </div>
          </label>
          {buyMessage.length !== 0 && <p className="error">{buyMessage}</p>}
        </form>

        <form onSubmit={rechargeBateries}>
          <h3>Recharge batteries</h3>

          <label>
            <p className="text-sm">🔋1 = 🪙{PRICES.RECHARGE_BATERIE}</p>
            <div className="form_section">
              <input onChange={() => setRechargeMessage('')} name="rechargeBateries" type="number" min={1} max={batteries || 1} />
              <button>Recharge</button>
            </div>
          </label>
          {rechargeMessage.length !== 0 && <p className="error">{rechargeMessage}</p>}
        </form>
      </div>
    </section>
  )
}