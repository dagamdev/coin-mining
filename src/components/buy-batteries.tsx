import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/store"
import NumberInputForm from "./number-input-form"

export default function BuyBatteries () {
  const [addBatteries] = useMainStore(store =>
    [store.addBatteries]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])

  return (
    <NumberInputForm title="Buy batteries" buttonText="Buy" handleSubmit={(value, setMessage, clear) => {  
      if (value < 1) return
      const price = value * PRICES.BATTERY
  
      if (coins < price) {
        setMessage(`You don't have enough coins to buy ${value} batteries.`)
        return
      }
  
      addBatteries(value)
      addCoins(-price)
      clear()
    }} stats={[
      {
        name: 'Payment Cost: 🪙',
        getValue(value) {
          return (PRICES.BATTERY * value).toFixed(8)
        }
      }
    ]}/>
  )
}