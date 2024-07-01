import { useMainStore } from "../store/main"
import { getCoinFormat } from "../lib/utils"

export default function Bonus () {
  const [bonus, power] = useMainStore(store => [store.bonus, store.power])
  console.log(power + bonus * power / 100)

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
            <p>Hourly earning:</p>
            <strong>🪙{getCoinFormat(bonus * power / 100 * 3600)}</strong>
          </li>
        </ul>
      </div>
    </section>
  )
}