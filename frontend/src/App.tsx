import { useEffect, useState } from 'react';
import { api } from './services/api';
import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';

import { GamerBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';
import { WeekButton } from './components/Form/WeekButton';

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
      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[496px] shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique seu anúncio</Dialog.Title>

            <form action="" className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <Input
                  id='game'
                  placeholder='Selecione o game que deseja jogar'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id='name' placeholder='Como te chamam dentro do game?' />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearPlaying">Joga há quantos anos?</label>
                  <Input id='yearPlaying' type='number' placeholder='Tudo bem ser ZERO' />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input id='discord' placeholder='Usuario#0000' />
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className='grid grid-cols-4 gap-2'>
                    <WeekButton title='domingo' acronymWeek='D' />
                    <WeekButton title='Segunda-feira' acronymWeek='S' />
                    <WeekButton title='Terça-feira' acronymWeek='T' />
                    <WeekButton title='Quarta-feira' acronymWeek='Q' />
                    <WeekButton title='Quinta-feira' acronymWeek='Q' />
                    <WeekButton title='Sexta-feira' acronymWeek='S' />
                    <WeekButton title='Sábado' acronymWeek='S' />
                  </div>
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input id='hourStart' type='time' placeholder='De' />
                    <Input id='hourEnd' type='time' placeholder='Até' />
                  </div>
                </div>
              </div>

              <div className='mt-2 flex gap-2 text-sm '>
                <Input type="checkbox" />
                Costumo me conectar ao chat de voz
              </div>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold transition-all hover:bg-zinc-600'>Cancelar</Dialog.Close>
                <button
                  type='submit'
                  className='flex items-center gap-2 bg-violet-500 px-5 h-12 rounded-md font-semibold transition-all hover:bg-violet-600'
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>

            </form>

            {/* <Dialog.Close /> */}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
