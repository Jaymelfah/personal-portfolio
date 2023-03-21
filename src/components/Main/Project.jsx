import React from 'react';
import '../../pages/Project/ProjectPage.css'


/* Multi idioma */
import { FormattedMessage } from 'react-intl';

/* Swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper";

/* Img */
const proyectImg = require.context('../../img', true);

const Project = () => {
    return (
        <section className="proyectos" id="proyectos">
            <h2 className="heading">
                <FormattedMessage
                    id='projects'
                    defaultMessage='Projects'
                />
            </h2>
            <div className="proyect-site" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                <Swiper
                    spaceBetween={30}
                    loop={true}
                    grabCursor={true}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className='proyectos-slider mySwiper'
                >
                    <SwiperSlide className='caja'>
                        <img
                            src={proyectImg(`./Wheel-Wizard.png`)}
                            alt='proyectos'

                        />
                        <div className="content">
                            <h3>Wheel Wizard</h3>
                            <p>
                                Book A Test Ride
                            </p>
                            <p className="tecnologias">
                                React
                                <span> -</span> CSS
                                <span> -</span> Bootstrap
                                <span> -</span> React
                                <span> -</span> Redux
                                <span> -</span> Ruby on Rails
                                <span> -</span> Ruby
                            </p>
                            <a href="https://wheel-wizard.netlify.app/" className="custom-btn btn" target="_blank" rel="noopener noreferrer"><span>Demo</span></a>
                            <a href="https://github.com/Jaymelfah/wheel-wizard-frontend" className="custom-btn btn-codigo" target="_blank" rel="noopener noreferrer">Repository</a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='caja'>
                        <img
                            src={proyectImg(`./Trackerbudget.png`)}
                            alt='proyectos'

                        />
                        <div className="content">
                            <h3>Budget App</h3>
                            <p>
                              Mobile web application to help manage your budget
                            </p>
                            <p className="tecnologias">
                                Ruby on Rails
                                <span> -</span> CSS
                                <span> -</span> Ruby
                                <span> -</span> Rails
                            </p>
                            <a href="https://budget-application-39ba.onrender.com/" className="custom-btn btn" target="_blank" rel="noopener noreferrer"><span>Demo</span></a>
                            <a href="https://github.com/Jaymelfah/tracker-budget" className="custom-btn btn-codigo" target="_blank" rel="noopener noreferrer">Repository</a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='caja'>
                        <img
                            src={proyectImg(`./Crypto.png`)}
                            alt='proyectos'

                        />
                        <div className="content">
                            <h3>Crypto Market</h3>
                            <p>
                                Your Favorite Crypto Coins
                            </p>
                            <p className="tecnologias">
                                React
                                <span> -</span> CSS
                                <span> -</span> Redux
                            </p>
                            <a href="https://effervescent-stroopwafel-cbea62.netlify.app/" className="custom-btn btn" target="_blank" rel="noopener noreferrer"><span>Demo</span></a>
                            <a href="https://github.com/Jaymelfah/crypto-market" className="custom-btn btn-codigo" target="_blank" rel="noopener noreferrer">Repository</a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='caja'>
                        <img
                            src={proyectImg(`./SpaceTravelers.png`)}
                            alt='proyectos'
                        />
                        <div className="content">
                            <h3>Rocket Ships</h3>
                            <p>
                                Book Your SpaceShip
                            </p>
                            <p className="tecnologias">
                                React
                                <span> -</span> Redux
                                <span> -</span> CSS
                            </p>
                            <a href="https://sthub.netlify.app/" className="custom-btn btn" target="_blank" rel="noopener noreferrer"><span>Demo</span></a>
                            <a href="https://github.com/Jaymelfah/space-travelers-hub" className="custom-btn btn-codigo" target="_blank" rel="noopener noreferrer">Repository</a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='caja'>
                        <img
                            src={proyectImg(`./Pokedex.png`)}
                            alt='proyectos'
                        />
                        <div className="content">
                            <h3>Pokedex</h3>
                            <p>
                                Your Favorite Pokemons
                            </p>
                            <p className="tecnologias">
                                HTML5
                                <span> -</span> CSS
                                <span> -</span> JavaScript
                                <span> -</span> Bootstrap
                            </p>
                            <a href="https://kaizipaul.github.io/module-2-capstone/" className="custom-btn btn" target="_blank" rel="noopener noreferrer"><span>Demo</span></a>
                            <a href="https://github.com/Jaymelfah/Pokedex" className="custom-btn btn-codigo" target="_blank" rel="noopener noreferrer">Repository</a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='caja'>
                        <img
                            src={proyectImg(`./Quizzical.png`)}
                            alt='proyectos'
                        />
                        <div className="content">
                            <h3>Quizzical</h3>
                            <p>
                                How Well Do You Know Geography?
                            </p>
                            <p className="tecnologias">
                                React
                                <span> -</span> CSS
                                <span> -</span> JavaScript
                                <span> -</span> Bootstrap
                            </p>
                            <a href="https://elaborate-empanada-0e9a43.netlify.app/" className="custom-btn btn" target="_blank" rel="noopener noreferrer"><span>Demo</span></a>
                            <a href="https://github.com/Jaymelfah/Quizzical.git" className="custom-btn btn-codigo" target="_blank" rel="noopener noreferrer">Repository</a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='caja'>
                        <img
                            src={proyectImg(`./Math-magic.png`)}
                            alt='proyectos'
                        />
                        <div className="content">
                            <h3>Math Magicians</h3>
                            <p>
                                Calculator
                            </p>
                            <p className="tecnologias">
                                React
                                <span> -</span> CSS
                                <span> -</span> React
                            </p>
                            <a href="https://chic-blini-714a0e.netlify.app/" className="custom-btn btn" target="_blank" rel="noopener noreferrer"><span>Demo</span></a>
                            <a href="https://github.com/Jaymelfah/Math-Magician" className="custom-btn btn-codigo" target="_blank" rel="noopener noreferrer">Repository</a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='caja'>
                        <img
                            src={proyectImg(`./Bookstore.png`)}
                            alt='proyectos'
                        />
                        <div className="content">
                            <h3>BookStore</h3>
                            <p>
                                Save Your favorite Books
                            </p>
                            <p className="tecnologias">
                                React
                                <span> -</span> CSS
                                <span> -</span> Redux
                            </p>
                            <a href="https://unique-jalebi-b421a9.netlify.app/" className="custom-btn btn" target="_blank" rel="noopener noreferrer"><span>Demo</span></a>
                            <a href="https://github.com/Jaymelfah/Bookstore" className="custom-btn btn-codigo" target="_blank" rel="noopener noreferrer">Repository</a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='caja'>
                        <img
                            src={proyectImg(`./Leaderboard.png`)}
                            alt='proyectos'
                        />
                        <div className="content">
                            <h3>Leaderboard</h3>
                            <p>
                                High Scores Of Players
                            </p>
                            <p className="tecnologias">
                                HTML5
                                <span> -</span> Webpack
                                <span> -</span> JavaScript
                            </p>
                            <a href="https://jaymelfah.github.io/Leaderboard/dist/ " className="custom-btn btn" target="_blank" rel="noopener noreferrer"><span>Demo</span></a>
                            <a href="https://github.com/Jaymelfah/Leaderboard" className="custom-btn btn-codigo" target="_blank" rel="noopener noreferrer">Repository</a>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="swiper-pagination"></div>
            </div>
        </section>

    )
};
export default React.memo(Project);