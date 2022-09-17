import { useEffect, useState } from 'react';
import { api } from './services/api';
import './styles/main.css';
import 'react-toastify/dist/ReactToastify.min.css';

import logoImg from './assets/logo-nlw-esports.svg';

import { GamerBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/CreateAdModal';
import { ToastContainer } from 'react-toastify';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get('/games').then(resp => setGames(resp.data));
  }, []);
  

  return (
    <div className='max-w-6xl mx-auto flex flex-col items-center my-12'>
      <img src={logoImg} alt="Logo NLW eSports" />

      <h1 className='text-6xl text-white font-black mt-10'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-14'>
        {games.map(game => (
          <GamerBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <CreateAdBanner />

        <CreateAdModal setOpen={setOpen} />
      </Dialog.Root>
      <ToastContainer
        autoClose={3000}
        bodyClassName="font-Regular text-xs md:text-sm m-0 p-0"
        toastClassName="rounded-full bg-slate-800 my-5 mx-4 md:mx-0"
        theme="dark"
        pauseOnFocusLoss={false}
      />
    </div>
  )
}

export default App
