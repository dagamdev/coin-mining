import BuyPower from "./buy-power"
import BuyBatteries from "./buy-batteries"
import BuyBonus from "./buy-bonus"
import ChargeBatteries from "./charge-batteries"

export default function Store () {
  return (
    <section>
      <div>
        <h2>🧺 Store</h2>
      </div>

      <div>
        <BuyPower />
        <BuyBonus />
        <BuyBatteries />
        <ChargeBatteries />
      </div>
    </section>
  )
}