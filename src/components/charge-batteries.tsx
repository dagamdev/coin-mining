import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/main"
import NumberInputForm from "./number-input-form"

export default function ChargeBatteries () {
  const [batteries, chargedBatteries, addChargedBatteries] = useMainStore(store => [store.batteries, store.chargedBatteries, store.addChargedBatteries])
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const getPrice = (amount: number) => amount * PRICES.BATTERY_RECHARGE
  
  return (
    <NumberInputForm title="Recharge batteries" buttonText="Recharge"
      handleSubmit={(amount, setMessage, clear) => {
        if (amount < 1) return
        
        if (!batteries) {
          setMessage("You don't have batteries to charge")
          return
        }

        if (batteries === chargedBatteries) {
          setMessage('All batteries are charged!')
          return
        }

        if (amount > batteries - chargedBatteries) {
          setMessage(`You can't charge more batteries than the ones you have discharged.`)
          return
        }

        const price = getPrice(amount)

        if (coins < price) {
          setMessage(`You don't have enough coins to recharge ${amount} batteries.`)
          return
        }

        addChargedBatteries(amount)
        addCoins(-price)
        clear()
      }}
      stats={[
        {
          name: 'Payment Cost: 🪙',
          getValue(amount) {
            return getPrice(amount)
          },
          valueIsNotAffordable(amount) {
            return getPrice(amount) > coins
          }
        }
      ]}
    />
  )
}