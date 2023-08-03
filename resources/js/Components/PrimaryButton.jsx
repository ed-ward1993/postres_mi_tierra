export default function PrimaryButton({ type = 'submit', className = '', processing, children, onClick }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `drop-shadow-[0_35px_35px_rgba(183,183,183,0.5)] inline-flex items-center px-4 py-2 bg-[#008BBF] border border-transparent rounded-md font-semibold text-lg max-md:text-sm text-white tracking-widest hover:bg-[#00719B] focus:bg-[#00719B] active:bg-[#006287]/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    processing && 'opacity-25'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
