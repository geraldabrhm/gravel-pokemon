import Icon from "@/components/general/Icon";
import { AiOutlineSearch } from "react-icons/ai";

const PokemonListController = ({searchPrompt, setSearchPrompt}: {searchPrompt: string, setSearchPrompt: React.Dispatch<React.SetStateAction<string>>}) => {


    return(
        <section id="pokemon-list-controller">
            <div className="bg-[#F2F2F2] flex flex-row justify-start items-center p-1 rounded-md shadow-md">
                <Icon color="#828282" size="1.5rem" iconComponent=  {<AiOutlineSearch/>}/>
                <input name="pokemon-search" type="text" placeholder="Search" className="bg-inherit text-[#828282] px-2 py-1" value={searchPrompt} onChange={(e) => setSearchPrompt(e.target.value)}/>
            </div>
        </section>
    )
}

export default PokemonListController;