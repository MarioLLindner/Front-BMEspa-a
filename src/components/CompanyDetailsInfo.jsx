export const CompanyDetailsInfoReact = ({ label, value }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-5xl font-bold">{value}</div>
            <div className="mt-2 opacity-80 font-light leading-tight w-32">{label}</div>
        </div>
    )
}