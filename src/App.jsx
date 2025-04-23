import './App.css'
import { useState, useEffect } from "react"

// Funzione di supporto per la fetch
async function fetchData(url) {
  const fetchResponse = await fetch(url)
  const parseIntObj = await fetchResponse.json()
  return parseIntObj
}

function App() {

  const [searchValue, setSerchValue] = useState("")
  const [products, setProduct] = useState([])

  useEffect(() => {
    fetchData(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${searchValue}`)
      .then(res => setProduct(res))
      .catch(err => console.log(err))
  }, [searchValue])

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="container-fluid d-flex justify-content-end">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Cerca il tuo prodotto"
                aria-label="Search"
                value={searchValue}
                onChange={(event) => { setSerchValue(event.target.value) }}
              />
            </form>
          </div>
        </nav>
        <div className='tendina d-flex justify-content-end'>
          <ul className="list-group w-25 mx-1">
            {Array.isArray(products) ? products.map((product) => <li key={product.id} className="list-group-item">{product.name}</li>) : <li className="list-group-item">Il prodotto non è disponibile</li>}
          </ul>
        </div>
      </header>
      <main>

      </main>
      <footer>

      </footer>
    </>
  )

}

export default App
