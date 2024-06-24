import { PRICES } from "../lib/constants"
import { useMainStore } from "../store/store"

export default function Energi () {
  const [batteries, rechargedBateries] = useMainStore(store => [store.batteries, store.rechargedBateries])

  return (
    <section>
      <h2>Energi</h2>
      
      <div>
        <p>La energia permite minar monedas mientras no estes conectado a la pagina.</p>
        <p>Cada bateria te permiteminar durante una hora en tu ausencia.</p>
      </div>

      <ul>
        <li>
          <p>Batteries: <strong>🔋{batteries}</strong></p>
        </li>
        <li>
          <p>Baterias cargadas: <strong>🔋{rechargedBateries}/{batteries}</strong></p>
        </li>
      </ul>

      <form>
        <h3>🧺 Buy bateries</h3>

        <label>
          <p className="text-sm">🔋1 = 🪙{PRICES.BATERIE}</p>
          <div className="form_section">
            <input type="number" min={1} />
            <button>Buy</button>
          </div>
        </label>
      </form>

      <form>
        <h3>⚡Recargar baterias</h3>

        <label>
          <p className="text-sm">🔋1 = 🪙{PRICES.RECHARGE_BATERIE}</p>
          <div className="form_section">
            <input type="number" min={1} />
            <button>Recharge</button>
          </div>
        </label>
      </form>
    </section>
  )
}