import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ ...rest }, ref) => {
    return (
        <input
            {...rest}
            ref={ref}
            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
        />
    )
}

export const Input = forwardRef(InputBase);