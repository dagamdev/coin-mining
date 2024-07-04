import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/main"
import NumberInputForm from "./number-input-form"

export default function ChargeBatteries () {
  const [batteries, chargedBatteries, addChargedBatteries] = useMainStore(store => [store.batteries, store.chargedBatteries, store.addChargedBatteries])
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  
  return (
    <NumberInputForm title="Recharge batteries" buttonText="Recharge"
      handleSubmit={(value, setMessage, clear) => {
        if (value < 1) return
        
        if (!batteries) {
          setMessage("You don't have batteries to charge")
          return
        }

        if (batteries === chargedBatteries) {
          setMessage('All batteries are charged!')
          return
        }

        if (value > batteries - chargedBatteries) {
          setMessage(`You can't charge the batteries that are discharged.`)
          return
        }

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
            return PRICES.BATTERY_RECHARGE * value
          },
          valueIsNotAffordable(value) {
            return PRICES.BATTERY_RECHARGE * value > coins
          }
        }
      ]}
    />
  )
}