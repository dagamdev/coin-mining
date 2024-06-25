import { type FormEvent, useState, useEffect } from "react"
import { PRICES } from "../lib/constants"
import { useMainStore } from "../store/store"
import { useCoinsStore } from "../store/coins"
import { getLocalData, saveLocalData } from "../lib/utils"

export default function Energi () {
  const [batteries, addBatteries, chargedBatteries, addChargedBatteries, batteryElapsedTime, batteryTimes] = useMainStore(store => 
    [store.batteries, store.addBatteries, store.chargedBatteries, store.addChargedBatteries, store.batteryElapsedTime, store.batteryTimes]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const [buyMessage, setBuyMessage] = useState('')
  const [rechargeMessage, setRechargeMessage] = useState('')

  useEffect(() => {
    console.log({batteryElapsedTime})
  }, [batteryElapsedTime])

  useEffect(() => {
    const lastTime: number = getLocalData('lastTime', true) ?? 0
    
    batteryTimes(Math.floor(Date.now() - lastTime))

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
        <h2>Energi</h2>
      </div>
      
      <div>
        <div>
          <p>Energy allows you to mine coins while you are not connected to the web page.</p>
          <p>Each battery allows you to mine for one hour in your absence.</p>
        </div>

        <ul>
          <li className="measurement">
            <p>Batteries:</p>
            <strong>🔋 {batteries}</strong>
          </li>
          <li className="measurement">
            <p>Baterias cargadas:</p>
            <strong>🔋 {chargedBatteries}/{batteries}</strong>
          </li>
          <li className="measurement">
            <p>Remaining battery time:</p>
            <strong>⏱️ {60 - Math.floor(batteryElapsedTime / 1000)}s</strong>
          </li>
        </ul>

        <form onSubmit={buyBateries}>
          <h3>🧺 Buy batteries</h3>

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
          <h3>⚡ Recharge batteries</h3>

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