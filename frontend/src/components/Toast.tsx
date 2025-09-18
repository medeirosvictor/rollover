import { useToastContext } from '@/hooks/useToastContext';

function Toast() {
    const { message } = useToastContext();
    const messageTypeBackground =
        message?.type === 'success'
            ? 'bg-green-500'
            : message?.type === 'error'
              ? 'bg-red-500'
              : 'bg-blue-500';

    if (!message) return null;

    return (
        <div
            className={`fixed top-4 right-4 z-99 ${messageTypeBackground} text-white px-4 py-2 rounded-lg shadow-lg transition`}
        >
            {message.text}
        </div>
    );
}

export default Toast;
