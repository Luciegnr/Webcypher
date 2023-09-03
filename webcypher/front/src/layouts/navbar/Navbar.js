import React from "react";
import { Nav, NavLogo, NavSpace, NavBtnLink, NavBtnLink2, } from "./style";


function Navbar() {
    return (
        <Nav>
            <NavLogo to="#">
                Web Cypher
            </NavLogo>
            <NavSpace>
                <NavBtnLink to="/inscription">
                    Inscription
                </NavBtnLink>
                <NavBtnLink2 to="/connexion">
                    Connexion
                </NavBtnLink2>
            </NavSpace>
        </Nav>
    );
}
export default Navbar;
