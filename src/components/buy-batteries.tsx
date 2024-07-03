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

  const getPrice = (amount: number) => (amount + batteries) * PRICES.BATTERY

  return (
    <NumberInputForm title="Buy batteries" buttonText="Buy" handleSubmit={(value, setMessage, clear) => {  
      if (value < 1) return
      const price = getPrice(value)
  
      if (coins < price) {
        setMessage(`You don't have enough coins to buy ${value} batteries.`)
        return
      }
  
      addBatteries(value)
      addCoins(-price)
      clear()
    }} stats={[
      {
        name: 'Absentee mining time: ⌚',
        getValue(value) {
          return formattedTime(value * TIMES.HOUR)
        },
        notIsCoins: true
      },
      {
        name: 'Payment Cost: 🪙',
        getValue(value) {
          return getPrice(value)
        },
        valueIsNotAffordable(value) {
          return getPrice(value) > coins
        }
      }
    ]}/>
  )
}