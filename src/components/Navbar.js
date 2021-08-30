import React, { useState } from "react";
import {
    Link
} from "react-router-dom";
import '../styles/styles.scss';

import Button from "./Button";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);

    const hanldeOpenMenu = () => setOpenMenu(state => !state);

    return (
        <>
            <div className="navbar">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <span style={{ color: "white", fontWeight: "bold" }}>Pokedex</span>
                    <Button
                        icon="fa fa-bars"
                        onClick={hanldeOpenMenu} />
                </div>
            </div>
            {
                openMenu &&
                <div className="menu">
                    <Link className="link" to="/" onClick={hanldeOpenMenu}>Home</Link>
                    <Link className="link" to="/" onClick={hanldeOpenMenu}>Home</Link>
                    <Link className="link" to="/" onClick={hanldeOpenMenu}>Home</Link>
                </div>
            }
        </>
    )
}

export default Navbar;