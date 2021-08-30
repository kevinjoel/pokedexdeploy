import React, { useEffect, useState } from 'react';
import '../styles/styles.scss';

//COMPONENT
import Loading from './Loding';

const Card = (props) => {
    const { item, onClick, styleCard } = props;
    const [loadingImage, setLoadingImage] = useState(true);
    const [imagePokemon, setImagePokemon] = useState(null);

    useEffect(() => {
        getImage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item])

    const getImage = () => {
        setLoadingImage(true)
        fetch(item?.sprites?.front_default)
            .then(resp => resp.blob())
            .then(img => {
                setImagePokemon(URL.createObjectURL(img))
                setLoadingImage(false)
            })
    }

    const renderStatItem = (item, key) => {
        return (
            <div className="stat-item" key={key}>
                <span className="text-title-bold">{item.stat.name}: </span>
                <span className="text-normal">{item.base_stat}</span>
            </div>
        )
    }

    return (
        <div key={item.id} className="col-3 col-md-1 col-sm-1 card" onClick={onClick} style={styleCard}>
            <div className="card-container">
                <div className="content-image">
                    {
                        loadingImage
                            ? <div style={{ width: "100%", height: "96px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Loading />
                            </div>
                            : <img className="image-pokemon" src={imagePokemon} alt="pokemon" />
                    }
                </div>
                <div className="info-pokemon">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <span className="text-title-bold">{item.name}</span>
                        <span className="text-title-bold">#{item.id}</span>
                    </div>
                    {item?.stats?.map(renderStatItem)}
                </div>
            </div>
        </div>
    )
}

export default Card;