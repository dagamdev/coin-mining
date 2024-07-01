import './styles/App.css'
import { useMainStore } from './store/main'
import Mining from './components/mining'
import Energi from './components/energi'
import { useCoinsStore } from './store/coins'
import Store from './components/store'
import Bonus from './components/bonus'
import Settings from './components/settings'

export default function App () {
  const [reset] = useMainStore(store => [store.reset])
  const setCoins = useCoinsStore(store => store.setCoins)

  return (
    <main>
      <button onClick={() => {
        reset()
        setCoins(0)
      }}>Reset</button>
      <Mining />
      <Bonus />
      <Energi />
      <Store />
      <Settings />
    </main>
  )
}
