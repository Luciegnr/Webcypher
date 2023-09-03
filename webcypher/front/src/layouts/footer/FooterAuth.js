import React from 'react';
import './footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="container-footer">
                <div className="content-footer">
                <div className="col" style={{paddingRight : "30px"}}>
                        <p>Nous contacter</p>
                        <p>Si vous rencontrez un bug ou si vous avez une question contactez-nous par mail</p>
                        <div className="column">
                            <p>Adresse email</p>
                            <p>webcypher@gmail.com</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="column">
                            <p>Nos fonctionnalités</p>
                            <p><a href="/liste-room">Accueil</a></p>
                            <p><a href="/mediatheque">Médiathèque</a></p>
                            <p><a href="/liste-user">Liste des utilisateurs</a></p>
                            <p><a href="/private">Tchat</a></p>
                            <p><a href="/parametre-compte">Paramètres</a></p>
                        </div>
                    </div>
                    <div className="col">
                        <p>Suivez-nous sur les réseaux sociaux :</p>
                        <div className="social">
                            <a href="https://www.instagram.com/?hl=fr" target="_blank" rel="noreferrer"><img src="https://i.postimg.cc/TYG9S3Hy/instagram.png" alt="" /></a>
                            <a href="https://fr-fr.facebook.com/" target="_blank" rel="noreferrer"><img src="https://i.postimg.cc/44pPB9wk/facebook.png" alt="" /></a>
                            <a href="https://twitter.com/login?lang=fr" target="_blank" rel="noreferrer"><img src="https://i.postimg.cc/L8Q3nB4f/twitter.png" alt="" /></a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><img src="https://i.postimg.cc/kGCxkTwr/youtube.png" alt="" /></a>
                            <a href="https://fr.linkedin.com/" target="_blank" rel="noreferrer"><img src="https://i.postimg.cc/8zHqf6nL/linkedin.png" alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
}
export default Footer;