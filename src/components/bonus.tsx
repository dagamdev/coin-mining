import { useMainStore } from "../store/main"
import { convertToCoins, getCoinFormat } from "../lib/utils"

export default function Bonus () {
  const [bonus, power] = useMainStore(store => [store.bonus, store.power])

  return (
    <section>
      <div>
        <h2>🚀 Bonus</h2>
      </div>

      <div>
        <ul className="measures">
          <li>
            <p>Bonus:</p>
            <strong>✨{bonus}%</strong>
          </li>
          <li>
            <p>Power:</p>
            <strong>⛏️{bonus * power / 100}</strong>
          </li>
          <li>
            <p>Hourly earning:</p>
            <strong>🪙{getCoinFormat(convertToCoins(bonus * power / 100 * 3600))}</strong>
          </li>
        </ul>
      </div>
    </section>
  )
}