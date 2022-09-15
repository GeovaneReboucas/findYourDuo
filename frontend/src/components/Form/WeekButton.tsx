import { ButtonHTMLAttributes } from "react";

interface WeekButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    acronymWeek: string;
}

export function WeekButton({ acronymWeek, ...rest }: WeekButtonProps) {
    return (
        <button
            {...rest}
            className='w-8 h-8 rounded bg-zinc-900'
        >
            {acronymWeek}
        </button>
    )
}