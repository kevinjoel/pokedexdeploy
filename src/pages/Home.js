import React, { useEffect, useState } from "react";
import '../styles/styles.scss';
import PokemonColors from '../styles/pokemon-colors';

//COMPONENTS
import Card from '../components/Card';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import Modal from '../components/Modal';

//SERVICES HOOKS
import usePokeapi from "../hooks/usePokeapi";
import Loading from "../components/Loding";

const Home = () => {
    const {
        findPokemonsService,
        findPokemonService
    } = usePokeapi()

    const limit = 20;
    const [offset, setOffset] = useState(20);
    const rowPerPage = 12;
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [pokemons, setPokemons] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoadinMore, setIsLoadingMore] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    
    const [selectedItem, setSelectedItem] = useState({});
    const [selectedSprite, setSelectedSprite] = useState(2);
    const [currentSprites, setCurrentSprites] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        findPokemons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /**
     * FUNCTION PARA OBTENER LA LISTA DE POKEMONES
     * MANEJO DE LA INFORMACION CON UN LIMITE DE 20 REGISTROS PARA EVITAR CARGA
     */
    const findPokemons = async () => {
        setIsLoading(true)
        const sendData = {
            limit: limit,
            offset: 0
        }

        const result = await findPokemonsService(sendData);
        if (result) {
            const len = result.length;

            const new_array = [];
            for (const item of result) {
                const pokemon = await findPokemonService(item.url);
                new_array.push(pokemon)
            }

            setTotalPages(parseInt(len / rowPerPage) + 1);
            setPokemons(new_array);
        }

        setIsLoading(false)
    }

    const loadMorePokemons = async () => {
        setIsLoadingMore(true)
        const sendData = {
            limit: limit,
            offset: offset
        }

        const result = await findPokemonsService(sendData);
        if (result) {
            const len = (result.length + pokemons.length);

            const new_array = pokemons;
            for (const item of result) {
                const pokemon = await findPokemonService(item.url);
                new_array.push(pokemon)
            }

            setTotalPages(parseInt(len / rowPerPage) + 1);
            setPokemons(new_array);
            setOffset(offset + offset);
        }

        setIsLoadingMore(false)
    }

    const renderItem = (item, key) => {
        const type = item.types[0].type;
        const name = type.name;

        return (
            <Card
                className="col-4"
                key={key}
                item={item}
                onClick={() => handleOpenModal(item)}
                styleCard={{
                    backgroundColor: PokemonColors.colors?.[name],
                }}
            />
        )
    }

    const renderStatItem = (item, key) => {
        return (
            <div className="stat-item">
                <span key={key} className="text-title-bold" style={{ color: "black" }}>{item.stat.name}: </span>
                <span className="text-normal" style={{ color: "black" }}>{item.base_stat}</span>
            </div>
        )
    }

    const hanldeNexPage = () => {
        let nextPage = page + 1;
        if (nextPage < totalPages)
            setPage(nextPage);
    }

    const hanldePrevPage = () => {
        let prevPage = page - 1;
        if (prevPage !== -1)
            setPage(prevPage);
    }

    const handleOpenModal = (item) => {
        if (item) {
            const findKeys = Object.keys(item.sprites).map(_ => {
                if (typeof item.sprites[_] !== "object")
                    return { url: item.sprites[_], type: _.includes("_shiny") ? "Shiny" : "Normal" }
                else return null
            }).filter(e => e !== null && e !== undefined)

            setCurrentSprites(findKeys)
        }

        setSelectedItem(item)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setCurrentSprites([])
        setSelectedItem(null)
        setSelectedSprite(2)
    }

    const hanldePrevType = () => {
        const currentindex = selectedSprite - 1;
        const len = (currentSprites.length);

        if (currentindex <= 0) setSelectedSprite(len - 1)
        else setSelectedSprite(currentindex)
    }

    const hanldeNexType = () => {
        const currentindex = selectedSprite + 1;
        const len = (currentSprites.length) - 1;

        if (selectedSprite === len) setSelectedSprite(0)
        else setSelectedSprite(currentindex)
    }

    const handleKeyPress = (e) => {
        if ((e.key).toUpperCase() === 'ENTER') {
            handleSearchPokemon()
        }
    }

    const hanldeRenderType = (item) => {
        const type = item.type;
        const name = type.name;

        return (
            <span className="chip" style={{ backgroundColor: PokemonColors.colors?.[name] }}>{name}</span>
        )
    }

    const handleSearchPokemon = async () => {
        if (!search.length) {
            return alert("Por favor escribe un nombre valido!")
        }
        setIsLoadingSearch(true)

        const url = `https://pokeapi.co/api/v2/pokemon/${(search).toLowerCase()}`
        const result = await findPokemonService(url);
        if (result) {
            handleOpenModal(result)
        } else {
            alert("No se econtro nigún pokemon con este nombre " + search);
        }

        setIsLoadingSearch(false)
    }

    return (
        <div className="row">
            <div className="col-1">
                <div className="row pagination-container" style={{ marginTop: 10 }}>
                    <div className="col-2 col-sm-1 search-container" >
                        <input
                            placeholder="Busca tu pokemon favorito!"
                            style={{ width: "250px" }}
                            onChange={(e) => { setSearch(e.target.value) }}
                            onKeyPress={handleKeyPress}
                        />

                        <IconButton
                            title="Buscar"
                            icon="fa fa-search"
                            onClick={handleSearchPokemon}
                            stylesBtn={{ backgroundColor: "#053742" }}
                            stylesIcon={{ color: "white", marginRight: 10 }}
                            isLoading={isLoadingSearch}
                        />

                    </div>
                    <div className="col-2 col-sm-1">
                        <div className="pagination">
                            {
                                page >= 1 &&
                                <Button
                                    icon="fa fa-chevron-left"
                                    onClick={hanldePrevPage}
                                    stylesIcon={{ color: "black" }}
                                />
                            }
                            <div>
                                <span>Pagina: {page + 1} de {totalPages}</span>
                            </div>

                            {
                                (page + 1) === totalPages ?
                                    <IconButton
                                        title="Cargar mas"
                                        onClick={loadMorePokemons}
                                        stylesBtn={{ backgroundColor: "#053742" }}
                                        stylesIcon={{ color: "black" }}
                                        isLoading={isLoadinMore}
                                    />
                                    : <Button
                                        icon="fa fa-chevron-right"
                                        onClick={hanldeNexPage}
                                        stylesIcon={{ color: "black" }}
                                    />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-1">
                {
                    isLoading ?
                        <div style={{ marginTop: 50 }}>
                            <div className="center">
                                <Loading />
                            </div>
                            <div className="center">
                                <span>Estamos obteniendo una lista de pokemones, por favor espere...</span>
                            </div>
                        </div>
                        : pokemons.length ?
                            pokemons.slice(page * rowPerPage, page * rowPerPage + rowPerPage).map(renderItem)
                            :
                            <div className="center" style={{ marginTop: 50 }}>
                                <span>Ups parece que ocurrio un error al intentar obtener la lista de pokemones, por favor vuelva a intentar de nuevo mas tarde.</span>
                            </div>
                }
            </div>

            {
                selectedItem &&
                openModal &&
                <Modal>
                    <div className="modal-header">
                        <span></span>
                        <Button
                            icon="fa fa-times"
                            onClick={handleCloseModal}
                        />
                    </div>
                    <div className="modal-body">
                        <div className="modal-image" >
                            <Button
                                icon="fa fa-chevron-left"
                                onClick={hanldePrevType}
                                stylesIcon={{ color: "black" }}
                            />
                            <img className="modal-image" src={currentSprites.length ? currentSprites[selectedSprite]?.url : ""} alt="modal-pokemon" />
                            <Button
                                icon="fa fa-chevron-right"
                                onClick={hanldeNexType}
                                stylesIcon={{ color: "black" }}
                            />
                        </div>
                        <div className="item-cenered">
                            <span>{selectedItem.name}</span>
                        </div>

                        <div className="item-cenered item-about">
                            <div>
                                <span className="text-title">Peso: </span>
                                <span>{selectedItem.weight} Kg</span>
                            </div>
                            <div>
                                <span className="text-title">Altura: </span>
                                <span>{selectedItem.weight} cm</span>
                            </div>
                            <div>
                                <span className="text-title">Tipo: </span>
                                <span>{currentSprites.length && currentSprites[selectedSprite]?.type}</span>
                            </div>
                        </div>
                        <div className="info-pokemon-dialog">
                            {selectedItem.stats?.map(renderStatItem)}
                        </div>
                        <div className="item-cenered">
                            <span className="text-title">Tipo(s)</span>
                        </div>
                        <div className="item-cenered" style={{ backgroundColor: "#e3e3e3", borderRadius: 8 }}>
                            {selectedItem.types?.map(hanldeRenderType)}
                        </div>
                    </div>

                </Modal>

            }
        </div>
    )
}

export default Home;