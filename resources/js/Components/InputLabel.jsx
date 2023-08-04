export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block font-medium text-[#56340E] text-lg ` + className}>
        {/* <label htmlFor={forInput} className={`block font-medium text-base lg:text-base md:text-sm text-[#002F65]` + className}> */}
            {value ? value : children}
        </label>
    );
}
