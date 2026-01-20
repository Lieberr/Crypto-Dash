import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { Routes, Route} from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";

const App = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc')


  useEffect(() => { 

    const fetchCoins = async () => {
      try{
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`,
          {
            headers: {
              "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY
            }
          }
        );
        if(!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (err){
        setError(err.message)
        console.log(err)
      } finally{
        setLoading(false)
      }
    }

    fetchCoins();

   }, [limit]);


   {/*descrescente (primeiro B, depois A)
    Crescente (primeiro A, depois B)*/}


    {/* Slice() sem parametros cria uma copia superfecial do array original, ou seja
      ele copia todos os elementos em um novo array */}

      
    {/*Slice() com parametros cria uma copia superfecial do array original, com um inicio e um fim*/}

  return(
    <>

      <Header />
      <Routes>
        <Route path="/" element={ <HomePage 
        coins={coins}
        loading={loading}
        error={error}
        limit={limit}
        setLimit={setLimit}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy} /> } />

        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/coins/:id" element={ <CoinDetailsPage /> } />
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>

    </>
  )
}

export default App;