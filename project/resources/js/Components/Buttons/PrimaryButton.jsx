export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-gradient-to-br from-violet-300 to-pink-100 bg-[length:200%_200%] bg-right-bottom hover:bg-left-top border border-transparent rounded-md font-semibold text-sm text-black dark:text-white uppercase tracking-widest transition-all ease-in-out duration-200 dark:from-violet-800 dark:to-pink-700 ${
                    disabled ? 'opacity-25' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
