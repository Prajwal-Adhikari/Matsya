import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProvider, loadNetwork, loadAccounts, loadTokens, loadExchange } from '../store/interactions';
import config from '../config.json';
import '../App.css';


function App() {

  const dispatch = useDispatch();
  const loadBlockchainData = async () => {



    // Connect Ethers to blockchain
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);

    await loadAccounts(provider, dispatch);

    // Token Smart Contract
    const Chillar = config[chainId].Chillar;
    const Sukka = config[chainId].Sukka;

    await loadTokens(provider, [Sukka.address, Chillar.address], dispatch);

    //Load exchange
    const exchangeConfig = config[chainId].Exchange;
    await loadExchange(provider, exchangeConfig.address, dispatch);
  }

  useEffect(() => {
    loadBlockchainData()
  })

  return (
    <div>

      {/* Navbar */}

      <main className='exchange grid'>
        <section className='exchange__section--left grid'>

          {/* Markets */}

          {/* Balance */}

          {/* Order */}

        </section>
        <section className='exchange__section--right grid'>

          {/* PriceChart */}

          {/* Transactions */}

          {/* Trades */}

          {/* OrderBook */}

        </section>
      </main>

      {/* Alert */}

    </div>
  );
}

export default App;