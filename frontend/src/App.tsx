import './styles/main.css';
import { useEffect, useState } from 'react';
import { api } from './services/api';
import { CreateAdModal } from './components/CreateAdModal';
import { GamesCarousel } from './components/GamesCarousel';
import { CreateAdBanner } from './components/CreateAdBanner';

import logoImg from './assets/logo-nlw-esports.svg';

import * as Dialog from '@radix-ui/react-dialog';
import { Toaster } from 'react-hot-toast';

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
    <div className='max-w-5xl mx-auto flex flex-col items-center my-12 px-8'>
      <div>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </div>
      <img src={logoImg} alt="Logo NLW eSports" className='h-28 sm:h-auto' />

      <h1 className='text-4xl sm:text-5xl text-center text-white font-black mt-10'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <GamesCarousel games={games} />

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <CreateAdBanner />

        <CreateAdModal setOpen={setOpen} />
      </Dialog.Root>
    </div>
  )
}

export default App
