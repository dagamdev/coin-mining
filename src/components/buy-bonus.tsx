import { PRICES } from "../lib/constants";
import { convertToCoins } from "../lib/utils";
import { useCoinsStore } from "../store/coins";
import { useMainStore } from "../store/main";
import NumberInputForm from "./number-input-form";

export default function BuyBonus () {
  const [power, addBonus] = useMainStore(store => [store.power, store.addBonus])
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])

  return (
    <NumberInputForm title="Buy bonus" buttonText="Buy"
      handleSubmit={(value, setMessage, clear) => {
        if (value < 1) return

        const price = value * PRICES.BONUS

        if (price > coins) {
          setMessage(`You don't have enough coins to buy ${value} bonuses`)
          return
        }

        console.log({price, value})

        addCoins(-price)
        addBonus(value)
        clear()
      }}
      stats={[
        {
          name: 'Hourly earning: 🪙',
          getValue(value) {
            const coins = power * 3600
            return convertToCoins(coins + value * coins / 100)
          }
        },
        {
          name: 'Payment Cost: 🪙',
          getValue(value) {
            return value * PRICES.BONUS
          }
        }
      ]}
    />
  )
}