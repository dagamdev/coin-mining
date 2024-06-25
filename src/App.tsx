import './styles/App.css'
import { useMainStore } from './store/store'
import Mining from './components/mining'
import Energi from './components/energi'
import { useCoinsStore } from './store/coins'

export default function App () {
  const [reset] = useMainStore(store => [store.reset])
  const setCoins = useCoinsStore(store => store.setCoins)

  return (
    <main>
      <button onClick={() => {
        reset()
        setCoins(0.00004)
      }}>Reset</button>
      <Mining />
      <Energi />
    </main>
  )
}
