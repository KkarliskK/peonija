export default function BuyButton({ className = '', disabled = false, children, onClick}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center before:ease relative h-12 w-auto overflow-hidden border border-pink-500 bg-pink-500 text-white rounded transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-pink-500 hover:before:-translate-x-60 
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
}
