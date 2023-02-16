import styles from '@/styles/Flights.module.css'
import { aircrafts } from '../utils/aircrafs'
import codeiata from '../codeiata.json'
import { getCity } from '@/utils/getCity'

export default function Flights({ data }) {
  const { codeDeparture, codeReturn } = getCity(codeiata, data)

  return (
    <article className={styles.flight}>
      {/* Avion a realizar el vuelo */}
      <h2 className={styles.title}>
        Aeronave:{' '}
        <span>{aircrafts[data.itineraries[0].segments[0].aircraft.code]}</span>
      </h2>
      <hr />

      {/* Vuelo de ida */}
      <h1 className={styles.city}>
        Ida desde: <span>{codeDeparture}</span>
      </h1>
      <div className={styles.travel}>
        <p>Horario de salida: </p>
        <span>
          {data.itineraries[0].segments[0].departure.at.slice(11, 19)}
        </span>
      </div>

      <div className={styles.travel}>
        <p>Horario de llegada: </p>

        <span>{data.itineraries[0].segments[0].arrival.at.slice(11, 19)}</span>
      </div>
      <hr />

      {/* Vuelo de regreso */}
      <h1 className={styles.city}>
        Vuelta desde: <span>{codeReturn}</span>
      </h1>
      <div className={styles.travel}>
        <p>Horario de salida: </p>

        <span>
          {data.itineraries[1].segments[0].departure.at.slice(11, 19)}
        </span>
      </div>
      <div className={styles.travel}>
        <p>Horario de llegada: </p>

        <span>{data.itineraries[1].segments[0].arrival.at.slice(11, 19)}</span>
      </div>
      <hr />
      <div className={styles.travel}>
        <p>
          Moneda: <span>{data.price.currency}</span>
        </p>
        <p>
          Valor Total: <span className={styles.total}>{data.price.total}</span>
        </p>
      </div>

      <button className={styles.button}>Ver más</button>
    </article>
  )
}
