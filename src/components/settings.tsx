import BalanceIntervalSelector from "./balance-interval-selector";

export default function Settings () {
  return (
    <section>
      <div>
        <h2>⚙️ Settings</h2>
      </div>

      <div>
        <BalanceIntervalSelector />
      </div>
    </section>
  )
}