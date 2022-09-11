
interface PrintsProps {
    data: string[]
}

export const Prints: React.FC<PrintsProps> = (props) => {

    return (
        <div className="prints-section">
            {props.data.map((item, index)=>{
                return <li>{item}</li>
            })}
        </div>
    )
}