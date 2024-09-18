export default function BuyButton({ className = '', disabled = false, children, onClick}) {
    return (
        <button
            onClick={onClick}
            className={`before:ease relative h-12 w-3/5 overflow-hidden border border-green-500 bg-green-500 text-white rounded transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-green-500 hover:before:-translate-x-60 rounded-br-[100px] 
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled}
        >
            <span className="relative z-10">{children}</span>
        </button>
    );
}
