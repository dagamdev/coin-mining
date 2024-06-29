import { PRICES } from "../lib/constants"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/main"
import NumberInputForm from "./number-input-form"

export default function BuyPower () {
  const [addPower] = useMainStore(store =>
    [store.addPower]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])

  return (
    <NumberInputForm title="Buy power" buttonText="Buy" handleSubmit={(value, setMessage, clear) => {
      if (value <= 0) {
        setMessage('Enter an amount of purchasing power')
        return
      }
      
      const amount = +(value * PRICES.POWER).toFixed(8)

      if (coins - amount < 0) {
        setMessage("You don't have enough coins to buy that mining power")
        return
      }

      addCoins(-amount)
      addPower(value)
      clear()
    }} stats={[{
      name: 'Hourly earning: 🪙',
      getValue(value) {
        return value * 3600 / 100000000
      }
    },
    {
      name: 'Payment Cost: 🪙',
      getValue(value) {
        return PRICES.POWER * value
      }
    }]}/>
  )
}