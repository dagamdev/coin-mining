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
  const getPrice = (amount: number) => PRICES.POWER * power * amount

  return (
    <NumberInputForm title="Buy power" buttonText="Buy" handleSubmit={(amount, setMessage, clear) => {
      if (amount <= 0) {
        setMessage('Enter an amount of purchasing power')
        return
      }
      
      const price = getPrice(amount)

      if (coins - price < 0) {
        setMessage("You don't have enough coins to buy that mining power")
        return
      }

      addCoins(-price)
      addPower(amount)
      clear()
    }} stats={[{
      name: 'Hourly earning: 🪙',
      getValue(amount) {
        return convertToCoins(amount * 3600)
      }
    },
    {
      name: 'Payment Cost: 🪙',
      getValue(amount) {
        return getPrice(amount)
      },
      valueIsNotAffordable(amount) {
        return getPrice(amount) > coins
      },
    }]}/>
  )
}