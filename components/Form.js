import codeiata from '../codeiata.json'
import styles from '@/styles/Home.module.css'
import { IoLocationSharp, IoPerson } from 'react-icons/io5'
import { useState } from 'react'
import { searchFlight } from '../utils/search'
import Spinner from '@/components/Spinner'

const initialState = {
  location: '',
  destination: '',
  date: '',
  returnDate: '',
  adults: ''
}

export default function Form({ setFlights }) {
  const [errors, setErrors] = useState('')
  const [spinner, setSpinner] = useState(false)
  const [search, setSearch] = useState(initialState)
  const codeKeys = Object.keys(codeiata)

  const handleChange = (e) => {
    const { name, value, checked } = e.target

    setSearch({
      ...search,
      [name]: name === 'check' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (search.date > search.returnDate) {
      setErrors('Fechas inválidas')
      return
    }

    try {
      setSpinner(true)
      const response = await searchFlight(search)

      response.data.length <= 0
        ? setErrors('Vuelos no disponibles')
        : setErrors('')

      setFlights(response.result)
      setSpinner(false)
    } catch (error) {
      error.description[0].title === 'INVALID FORMAT' &&
        setErrors('Introducir Campo/s Válidos')

      setSpinner(false)
      setFlights([])
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.location}>
        <p className={styles.location_text}>Desde:</p>
        <select
          name="location"
          onChange={handleChange}
          className={styles.location_select}
          required
        >
          <option>Elige tu ubicación</option>
          {codeKeys.map((code) => (
            <option key={code} value={codeiata[code]}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className={styles.destination}>
          <IoLocationSharp className={styles.destination_icon} />
          <select
            name="destination"
            onChange={handleChange}
            className={styles.destination_select}
            required
          >
            <option>Elige tu destino</option>
            {codeKeys.map((code) => (
              <option key={code} value={codeiata[code]}>
                {code}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.destination_data}>
          <p className={styles.departure}>Salida:</p>
          <input
            type="date"
            className={styles.destination_date}
            onChange={handleChange}
            name="date"
            value={search.date}
            required
          />
          <p className={styles.return}>Regreso:</p>
          <input
            type="date"
            className={styles.destination_date}
            onChange={handleChange}
            name="returnDate"
            value={search.returnDate}
            required
          />
          <input
            type="number"
            placeholder="Adulto/s"
            className={styles.destination_passengers}
            onChange={handleChange}
            name="adults"
            value={search.adults}
            required
            min={1}
          />
          <IoPerson className={styles.destination_icon_user} />
        </div>
      </div>

      <button className={styles.search}>Buscar</button>
      <span className={styles.errors}>{errors.length > 1 && errors}</span>
      {spinner && <Spinner />}
    </form>
  )
}
