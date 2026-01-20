import { Link } from "react-router"

const CoinCard = ({coin}) => {
    return(
      <Link to={`/coins/${coin.id}`}>
        <div className="coin-card">
              <div className="coin-header">
                <img src={coin.image} alt={coin.name} className="coin-image"></img>
                <div>
                  <h2>{coin.name}</h2> {/*Nome da moeda*/}
                  <p className="symbol">{coin.symbol.toUpperCase()}</p> {/*Simbolo da moeda*/}
                </div>
              </div>
              <p>Price: ${ coin.current_price.toLocaleString() }</p>
              <p className={ coin.price_change_percentage_24h >=0  ? 'positive' : 'negative' }>{coin.price_change_percentage_24h}%</p> {/*Duas casas decimais pra mostrar*/}
              <p>Market Cap: { coin.market_cap.toLocaleString() }</p>
        </div>
      </Link>
    )
}

export default CoinCard