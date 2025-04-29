
import './App.css' // Importo il file css
import { useState, useEffect, useCallback } from "react" // Importo gli hook useState e useEffect di React

// Funzione di supporto per la fetch
async function fetchData(url) {
  try {
    const fetchResponse = await fetch(url)
    const parseIntObj = await fetchResponse.json()
    return parseIntObj
  } catch {
    throw new Error("Errore nella richiesta al server")
  }
}

// // MILESTONE 1

// function App() {
// 
//   const [query, setQuery] = useState("")
//   const [suggestions, setSuggestions] = useState([])
//   console.log(suggestions)
// 
//   async function loadSuggestions() {
// 
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }
// 
//     try {
//       const products = await fetchData(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`);
//       setSuggestions(products);
//     } catch (error) {
//       setSuggestions([]);
//     }
// 
//   }
// 
//   useEffect(() => {
//     loadSuggestions()
//   }, [query])
// 
// 
//   return (
// 
//     <>
//       <header>
//         <nav className="navbar">
//           <div className="container-fluid d-flex justify-content-end">
//             <form className="d-flex" role="search">
//               <input
//                 className="form-control me-2"
//                 type="text"
//                 placeholder="Cerca il tuo prodotto"
//                 aria-label="Search"
//                 value={query}
//                 onChange={(event) => { setQuery(event.target.value) }}
//               />
//             </form>
//           </div>
//         </nav>
//         <div className='tendina d-flex justify-content-end'>
//           <ul className="list-group w-25 mx-1">
//             {suggestions.length > 0 && suggestions.map((suggestions) => <li key={suggestions.id} className="list-group-item">{suggestions.name}</li>)}
//           </ul>
//         </div>
//       </header>
//       <main>
// 
//       </main>
//       <footer>
// 
//       </footer>
//     </>
//   )
// 
// }
// 
// export default App

// // MILESTONE 2
// 
// const debounce = (callback, delay) => {
//   let timeout;
//   return (value) => {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => {
//       callback(value)
//     }, delay)
//   }
// }
// 
// function App() {
// 
//   const [query, setQuery] = useState("")
//   const [suggestions, setSuggestions] = useState([])
// 
//   async function loadSuggestions(query) {
//     if (!query.trim()) {
//       setSuggestions([]);
//       return;
//     }
// 
//     try {
//       console.log("API")
//       const products = await fetchData(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`);
//       setSuggestions(products);
//     } catch (error) {
//       setSuggestions([]);
//     }
//   }
// 
//   const debouncedFetch = useCallback(debounce(loadSuggestions, 500), [])
// 
//   useEffect(() => {
//     debouncedFetch(query)
//   }, [query])
// 
// 
//   return (
// 
//     <>
//       <header>
//         <nav className="navbar">
//           <div className="container-fluid d-flex justify-content-end">
//             <form className="d-flex" role="search">
//               <input
//                 className="form-control me-2"
//                 type="text"
//                 placeholder="Cerca il tuo prodotto"
//                 aria-label="Search"
//                 value={query}
//                 onChange={(event) => { setQuery(event.target.value) }}
//               />
//             </form>
//           </div>
//         </nav>
//         <div className='tendina d-flex justify-content-end'>
//           <ul className="list-group w-25 mx-1">
//             {suggestions.length > 0 && suggestions.map((suggestions) => <li key={suggestions.id} className="list-group-item">{suggestions.name}</li>)}
//           </ul>
//         </div>
//       </header>
//       <main>
// 
//       </main>
//       <footer>
// 
//       </footer>
//     </>
//   )
// 
// }
// 
// export default App

// MILESTONE 3

const debounce = (callback, delay) => {
  let timeout;
  return (value) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(value)
    }, delay)
  }
}

function App() {

  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [details, setDetails] = useState({})

  async function loadSuggestions(query) {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      console.log("API")
      const products = await fetchData(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`);
      setSuggestions(products);
    } catch (error) {
      setSuggestions([]);
    }
  }

  const debouncedFetch = useCallback(debounce(loadSuggestions, 500), [])

  useEffect(() => {
    debouncedFetch(query)
  }, [query])

  const getDetails = async (id) => {
    const productsDetails = await fetchData(`https://boolean-spec-frontend.vercel.app/freetestapi/products/${id}`)
    setDetails(productsDetails)
    setQuery("")
    setSuggestions([])
  }

  return (

    <>
      <header className='position-fixed w-100'>
        <nav className="navbar">
          <div className="container-fluid d-flex justify-content-end">
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Cerca il tuo prodotto"
                aria-label="Search"
                value={query}
                onChange={(event) => { setQuery(event.target.value) }}
              />
            </form>
          </div>
        </nav>

        {(suggestions.length > 0) && <div className='tendina d-flex justify-content-end z-1'>
          <ul className="list-group w-25 mx-1">
            {suggestions.map((suggestions) => <button onClick={() => { getDetails(suggestions.id) }} key={suggestions.id} className="list-group-item">{suggestions.name}</button>)}
          </ul>
        </div>}
      </header >

      <main style={{ paddingTop: "100px" }}>
        {details.name &&
          <div className="card col-6" style={{ width: "400px", marginLeft: "30px" }} >
            <img src={details.image} class="card-img-top" alt={details.name} />
            <div className="card-body">
              <h5 className="card-title">{details.name}</h5>
              <p className="card-text">{details.description}</p>
              <a className="btn btn-primary">{details.price + "$"}</a>
            </div>
          </div>}
      </main>
      <footer>

      </footer>
    </>
  )

}

export default App