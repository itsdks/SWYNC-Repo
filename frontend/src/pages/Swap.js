import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

import SwapDetails from "../components/SwapDetails"

const Swap = () => {
  const {user} = useAuthContext()
  const [swaps, setSwaps] = useState(null)

  useEffect(() => {
    const fetchSwaps = async () => {
      const response = await fetch('/api/swap', {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      if (response.ok) {
        setSwaps(json)
      }
    }

    if(user){
      fetchSwaps()
    }
  }, [user])

  return (
    <div className="swap-details">
        <h2>Available swaps</h2>
        {swaps && swaps.map(swap => (
            <SwapDetails swap={swap} key={swap._id} />
        ))}
    </div>
  )
}

export default Swap