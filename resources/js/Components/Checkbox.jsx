export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-pink-300 text-pink-500 shadow-sm focus:ring-pink-400 focus:ring-offset-0 ' +
                className
            }
        />
    );
}