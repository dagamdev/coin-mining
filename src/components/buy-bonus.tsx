import { PRICES } from "../lib/constants";
import { convertToCoins } from "../lib/utils";
import { useCoinsStore } from "../store/coins";
import { useMainStore } from "../store/main";
import NumberInputForm from "./number-input-form";

export default function BuyBonus () {
  const [power, bonus, addBonus] = useMainStore(store => [store.power, store.bonus, store.addBonus])
  const [coins, addCoins] = useCoinsStore(store => [store.coins, store.addCoins])
  const getPrice = (amount: number) => (bonus || 1) * PRICES.BATTERY_RECHARGE * amount

  return (
    <NumberInputForm title="Buy bonus" buttonText="Buy"
      handleSubmit={(amount, setMessage, clear) => {
        if (amount < 1) return

        const price = getPrice(amount)

        if (price > coins) {
          setMessage(`You don't have enough coins to buy ${amount} bonuses`)
          return
        }

        addCoins(-price)
        addBonus(amount)
        clear()
      }}
      stats={[
        {
          name: 'Hourly earning: 🪙',
          getValue(amount) {
            const coins = power * 3600
            return convertToCoins(coins + amount * coins / 100)
          }
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
      ]}
    />
  )
}