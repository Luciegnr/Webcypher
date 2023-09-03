import React from 'react';
import { AiFillInstagram, AiFillFacebook, AiFillTwitterCircle, AiFillYoutube, AiFillLinkedin } from 'react-icons/ai'
import './style.css'

const Footer = () => {
    return (
        <footer >
            <div className="footer-content">
                <p>Copyright &copy; Webcypher Etna 2022. All rights reserved.</p>
                <ul className="socials left">
                    <li><AiFillInstagram /></li>
                    <li><AiFillFacebook /></li>
                    <li><AiFillTwitterCircle /></li>
                    <li><AiFillYoutube /></li>
                    <li><AiFillLinkedin /></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;