import { ButtonHTMLAttributes } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface WeekButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    acronymWeek: string;
    value: string;
    week: string[];
}

export function WeekButton({ acronymWeek, value, week,...rest }: WeekButtonProps) {
    return (
        <ToggleGroup.Item
            {...rest}
            data-state
            className={`w-8 h-8 rounded ${week.includes(value) ? 'bg-violet-500' : 'bg-zinc-900'}`}
            value={value}
        >
            {acronymWeek}
        </ToggleGroup.Item>
    )
}