import './App.css'
import { useState, useEffect } from 'react'
import { useMainStore } from './store/store'
import Mining from './components/mining'

export default function App() {
  const [energi, maxEnergi] = useMainStore(store => [store.energi, store.maxEnergi])


  return (
    <main>
      <Mining />
      
      <section>
        <h2>Energi</h2>
        <strong>🔋 {energi}/{maxEnergi}</strong>
      </section>
    </main>
  )
}
