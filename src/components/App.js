import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProvider, loadNetwork, loadAccounts, loadToken } from '../store/interactions';
import config from '../config.json';
import '../App.css';


function App() {

  const dispatch = useDispatch();
  const loadBlockchainData = async () => {

    await loadAccounts(dispatch);

    // Connect Ethers to blockchain
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(provider, dispatch);

    // Token Smart Contract
    await loadToken(provider, config[chainId].Chillar.address, dispatch);
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