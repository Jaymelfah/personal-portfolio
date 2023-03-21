import React from 'react';
import './Footer.css';

/* Multi idioma */
import {FormattedMessage} from 'react-intl';


const Footer = () =>{
    // Fecha
    let fecha = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="site-footer">
                <div className="copyright">
                    <p>
                        <FormattedMessage
                            id='footer-info'
                            defaultMessage='Page created by Jaymelfah'
                        />
                    </p>
                    <p>&copy; {fecha}. All Rights Reserved.</p>
                </div>
                <div className="redes-sociales">
                    <a href="https://www.linkedin.com/in/jeremiah-melfah/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                    <a href="https://github.com/Jaymelfah" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                    <a href="https://twitter.com/JMelfah1" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                </div>
            </div>
        </footer>
    )
};

export default React.memo(Footer);