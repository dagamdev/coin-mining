import { PRICES, TIMES } from "../lib/constants"
import { formattedTime } from "../lib/utils"
import { useCoinsStore } from "../store/coins"
import { useMainStore } from "../store/main"
import NumberInputForm from "./number-input-form"

export default function BuyBatteries () {
  const [batteries, addBatteries] = useMainStore(store =>
    [store.batteries, store.addBatteries]
  )
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const getPrice = (amount: number) => (batteries || 1) * PRICES.BATTERY * amount

  return (
    <NumberInputForm title="Buy batteries" buttonText="Buy" handleSubmit={(amount, setMessage, clear) => {  
      if (amount < 1) return
      const price = getPrice(amount)
  
      if (coins < price) {
        setMessage(`You don't have enough coins to buy ${amount} batteries.`)
        return
      }
  
      addBatteries(amount)
      addCoins(-price)
      clear()
    }} stats={[
      {
        name: 'Absentee mining time: ⌚',
        getValue(amount) {
          return formattedTime(amount * TIMES.HOUR)
        },
        notIsCoins: true
      },
      {
        name: 'Payment Cost: 🪙',
        getValue(amount) {
          return getPrice(amount)
        },
        valueIsNotAffordable(amount) {
          return getPrice(amount) > coins
        }
      }
    ]}/>
  )
}