import { useCoinsStore } from "../store/coins"
import { getCoinFormat } from "../lib/utils"

export default function DisplayCoins () {
  const coins = useCoinsStore(store => store.coins)

  return (
    <strong>🪙 {getCoinFormat(coins)}</strong>
  )
}