import { useEffect, useState } from 'react';
import { Input } from './Form/Input';
import { WeekButton } from './Form/WeekButton';
import { SelectCustom } from './Form/SelectCustom';
import { api } from '../services/api';

import { Check, GameController } from 'phosphor-react';
import toast from 'react-hot-toast';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MessageInputRequired } from './Form/MessageInputRequired';

interface Game {
    id: string;
    title: string;
}

interface CreateAdModalProps {
    setOpen: (openModal: boolean) => void;
}

const CreateAdSchema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    yearsPlaying: yup.string().required('Campo obrigatório'),
    discord: yup.string().required('Campo obrigatório'),
    hourStart: yup.string().required(),
    hourEnd: yup.string().required(),
})

export function CreateAdModal({ setOpen }: CreateAdModalProps) {
    const [games, setGames] = useState<Game[]>([]);
    const [game, setGame] = useState('');
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoidChannel, setUseVoidChannel] = useState(false);

    useEffect(() => {
        api.get('/games').then(resp => setGames(resp.data));
    }, []);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(CreateAdSchema)
    });

    function clearForm() {
        setOpen(false);
        setWeekDays([]);
        setUseVoidChannel(false);
        reset();
    }

    async function handleCreateAd(data: any) {
        data = {
            ...data,
            game,
        }

        try {
            await api.post(`/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoidChannel: useVoidChannel
            });

            toast.success('Anúncio criado com sucesso!', {
                style: {
                    border: '1px solid green',
                    padding: '12px',
                    color: '#fff',
                    background: '#333',
                },
            })
        } catch (err) {
            toast.error('Erro ao criar o anúncio!!', {
                style: {
                    border: '1px solid red',
                    padding: '12px',
                    color: '#fff',
                    background: '#333',
                },
            })
        }

        clearForm();
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed z-[2]' />

            <Dialog.Content className='fixed flex flex-col justify-center bg-[#2A2634] px-10 text-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[98vh] shadow-black/25 z-[2]'>
                <Dialog.Title className='text-[1.6rem] font-black text-center'>Publique seu anúncio</Dialog.Title>

                <form onSubmit={handleSubmit(handleCreateAd)} className='mt-3 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game">Qual o game?</label>
                        <SelectCustom value={game} setValue={setGame} games={games} />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input {...register("name")} id='name' placeholder='Como te chamam dentro do game?' />
                        <MessageInputRequired message={errors.name?.message as string} />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input {...register('yearsPlaying')} id='yearsPlaying' type='number' placeholder='Tudo bem ser ZERO' />
                            <MessageInputRequired message={errors.yearsPlaying?.message as string} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input {...register('discord')} id='discord' placeholder='Usuario#0000' />
                            <MessageInputRequired message={errors.discord?.message as string} />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <ToggleGroup.Root
                                type='multiple'
                                className='grid grid-cols-4 gap-2'
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <WeekButton week={weekDays} title='domingo' acronymWeek='D' value='0' />
                                <WeekButton week={weekDays} title='Segunda-feira' acronymWeek='S' value='1' />
                                <WeekButton week={weekDays} title='Terça-feira' acronymWeek='T' value='2' />
                                <WeekButton week={weekDays} title='Quarta-feira' acronymWeek='Q' value='3' />
                                <WeekButton week={weekDays} title='Quinta-feira' acronymWeek='Q' value='4' />
                                <WeekButton week={weekDays} title='Sexta-feira' acronymWeek='S' value='5' />
                                <WeekButton week={weekDays} title='Sábado' acronymWeek='S' value='6' />
                            </ToggleGroup.Root>
                        </div>

                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input {...register('hourStart')} id='hourStart' name='hourStart' type='time' placeholder='De' />
                                <Input {...register('hourEnd')} id='hourEnd' name='hourEnd' type='time' placeholder='Até' />
                            </div>
                            {(errors.hourStart?.message || errors.hourEnd?.message) && <MessageInputRequired message={'Campo obrigatório'} />}
                        </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm '>
                        <Checkbox.Root
                            checked={useVoidChannel}
                            onCheckedChange={(checked: boolean | 'indeterminate') => {
                                if (checked === true) {
                                    setUseVoidChannel(true);
                                } else {
                                    setUseVoidChannel(false);
                                }
                            }}
                            className='w-6 h-6 p-1 rounded bg-zinc-900'
                        >
                            <Checkbox.Indicator>
                                <Check className='2-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className='mt-2 flex justify-end gap-4'>
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
            </Dialog.Content>
        </Dialog.Portal>
    )
}