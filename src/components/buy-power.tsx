import { PRICES } from "../lib/constants"
import { convertToCoins } from "../lib/utils"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/main"
import NumberInputForm from "./number-input-form"

export default function BuyPower () {
  const [power, addPower] = useMainStore(store =>
    [store.power, store.addPower]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const powerPrice = PRICES.POWER * power

  return (
    <NumberInputForm title="Buy power" buttonText="Buy" handleSubmit={(value, setMessage, clear) => {
      if (value <= 0) {
        setMessage('Enter an amount of purchasing power')
        return
      }
      
      const price = value * powerPrice

      if (coins - price < 0) {
        setMessage("You don't have enough coins to buy that mining power")
        return
      }

      addCoins(-price)
      addPower(value)
      clear()
    }} stats={[{
      name: 'Hourly earning: 🪙',
      getValue(value) {
        return convertToCoins(value * 3600)
      }
    },
    {
      name: 'Payment Cost: 🪙',
      getValue(value) {
        return powerPrice * value
      },
      valueIsNotAffordable(value) {
        return powerPrice * value > coins
      },
    }]}/>
  )
}