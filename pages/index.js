import { useState } from 'react'
import stylesFlights from '@/styles/Flights.module.css'
import stylesData from '@/styles/FlightData.module.css'
import Flights from '@/components/Flights'
import FlightData from '@/components/FlightData'
import Form from '@/components/Form'

export default function Home() {
  const [flights, setFlights] = useState([])

  return (
    <>
      <main>
        {/* Formulario de búsqueda */}
        <Form setFlights={setFlights} />

        {/* Aerolíneas */}
        <section className={stylesData.container}>
          <FlightData data={flights && flights} />
        </section>

        {/* Información de Vuelos */}
        <section className={stylesFlights.flights}>
          {flights.data &&
            flights.data
              .slice(10, 30)
              .map((flight) => <Flights key={flight.id} data={flight} />)}
        </section>
      </main>
    </>
  )
}
