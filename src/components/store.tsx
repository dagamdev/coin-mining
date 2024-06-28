import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/store"
import BuyPower from "./buy-power"
import BuyBatteries from "./buy-batteries"
import NumberInputForm from "./number-input-form"

export default function Store () {
  const [batteries, chargedBatteries, addChargedBatteries] = useMainStore(store =>
    [store.batteries, store.chargedBatteries, store.addChargedBatteries]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])

  return (
    <section>
      <div>
        <h2>🧺 Store</h2>
      </div>

      <div>
        <BuyPower />
        <BuyBatteries />
        <NumberInputForm title="Recharge batteries" buttonText="Recharge"
          handleSubmit={(value, setMessage, clear) => {
            if (!(batteries - chargedBatteries)) {
              setMessage('All batteries are charged!')
              return
            }

            if (value < 1 || value > batteries) return
            const price = value * PRICES.BATTERY_RECHARGE

            if (coins < price) {
              setMessage(`You don't have enough coins to recharge ${value} batteries.`)
              return
            }

            addChargedBatteries(value)
            addCoins(-price)
            clear()
          }}
          stats={[
            {
              name: 'Payment Cost: 🪙',
              getValue(value) {
                return (PRICES.BATTERY_RECHARGE * value).toFixed(8)
              },
            }
          ]}
        />
      </div>
    </section>
  )
}