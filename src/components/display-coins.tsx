import { useCoinsStore } from "../store/coins"
import { getCoinFormat } from "../lib/utils"

export default function DisplayCoins () {
  const coins = useCoinsStore(store => store.coins)

  return (
    <strong className="text-lg">🪙 {getCoinFormat(coins)}</strong>
  )
}