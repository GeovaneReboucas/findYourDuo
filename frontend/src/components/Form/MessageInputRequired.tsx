interface MessageInputRequiredProps{
    message?: string;
}

export function MessageInputRequired({ message }: MessageInputRequiredProps){
    return (
        <span className="text-red-600 text-[0.75rem]">{message}</span>
    )
}