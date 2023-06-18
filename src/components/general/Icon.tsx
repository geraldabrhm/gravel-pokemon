import { IconContext } from "react-icons";

const Icon = ({ color, size, iconComponent }: { color: string, size: string, iconComponent: React.ReactNode}) => {
    return (
        <IconContext.Provider value={{ color: color, size: size }}>
            <div>
                { iconComponent }
            </div>
        </IconContext.Provider>
    )
}

export default Icon;