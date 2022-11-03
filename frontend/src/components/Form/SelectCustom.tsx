import * as Select from '@radix-ui/react-select';
import { Check, CaretDown, CaretUp } from 'phosphor-react';

interface Game {
    id: string;
    title: string;
}

interface SelectCustomProps {
    games: Game[];
    value: string;
    setValue: (value: string) => void;
}

export function SelectCustom({ value, setValue, games }: SelectCustomProps) {
    return (
        <>
            {/* <select
                id='game'
                name='game'
                defaultValue=''
                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
            >
                <option disabled value="">Selecione o game que deseja jogar</option>

                {games.map(game => (
                    <option key={game.id} value={game.id}>{game.title}</option>
                ))}
            </select> */}

            <Select.Root name='game' defaultValue={value} onValueChange={setValue} >
                <Select.Trigger id='game' className='bg-zinc-900 py-3 px-4 rounded text-sm flex items-center gap-3'>
                    <Select.Value />
                    <Select.Icon > <CaretDown /> </Select.Icon>
                </Select.Trigger>

                <Select.Portal className='z-[3]'>
                    <Select.Content className='bg-zinc-900 rounded text-sm placeholder:text-zinc-500 appearance-none overflow-hidden'>
                        <Select.ScrollUpButton className='flex items-center justify-center h-[30px] text-lg text-white'>
                            <CaretUp />
                        </Select.ScrollUpButton>
                        <Select.Viewport>
                            <Select.Item disabled value='' className='text-gray-400 pl-6 pr-3 py-1 flex items-center gap-1 relative hover:cursor-pointer hover:bg-white hover:text-zinc-900 hover:font-semibold'>
                                <Select.ItemIndicator className='absolute left-0 inline-flex items-center justify-center w-[25px]'>
                                    <Check />
                                </Select.ItemIndicator>
                                <Select.ItemText>Selecione o game que deseja jogar</Select.ItemText>
                            </Select.Item>

                            <Select.Group className='text-white appearance-none overflow-hidden'>
                                {games.map(game => (
                                    <Select.Item key={game.id} value={game.id} className='pl-6 pr-3 py-1 flex items-center gap-1 relative hover:cursor-pointer hover:bg-white hover:text-zinc-900 hover:font-semibold'>
                                        <Select.ItemIndicator className='absolute left-0 inline-flex items-center justify-center w-[25px]'>
                                            <Check />
                                        </Select.ItemIndicator>
                                        <Select.ItemText>{game.title}</Select.ItemText>
                                    </Select.Item>
                                ))}
                            </Select.Group>

                            <Select.Separator />
                        </Select.Viewport>
                        <Select.ScrollDownButton className='flex items-center justify-center h-[30px] text-lg text-white'>
                            <CaretDown />
                        </Select.ScrollDownButton>
                    </Select.Content>
                </Select.Portal>
            </Select.Root >
        </>
    )
}