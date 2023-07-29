import React from 'react'
import Navbar from '../components/Navbar';
import "../home.css";
import stocknumberschanging from '../assets/stocknumberschanging.mp4'
import stockmagnify from '../assets/stock_magnifying_glass.jpg'
import risk from '../assets/risk.png'
import cryptos from '../assets/cryptos.jpg'
import forex from '../assets/forextwo.jpg'
import candlesticks from '../assets/candlestickstwo.png'
import fadebackground from '../assets/color-fade-background.jpg'
import user_dashboard from '../assets/user_page_1.png'
import user_groups from '../assets/user_page_2.png'
import free from '../assets/free_no_cost.png'
import accurate from '../assets/accurate_arrow.png'
import simple from '../assets/simple_blocks.jpg'
import { Link } from 'react-router-dom';

function Home () {
  return (
    <>
    <Navbar />
    <div className="wrapper-main">
        <div className="wrapper-second">
            <div className="wrapper-third">
                <div className="first-row">
                    <div className="opening-statement-area">
                        <video src={stocknumberschanging} autoPlay muted loop />
                        <div className="opening-words">
                            <span className="opening-statement">Asset Management Has Never Been Any Easier.</span>
                        </div>
                    </div>
                </div>
                <div className="second-row">
                    <img src={fadebackground} className='image-bg-fade'>
                    </img>

                    <div className="pillars">
                        <div className="pillars-2">
                                <span className="message-pillar">Portfolios have many assets. Analyzing them individually is easy.</span>
                        </div>
                        <div className="pillars-3">
                            <div className="stock-pillar-1">
                                <div className="stock-pillar-left">
                                    <img src={candlesticks} className='img-candlestick'></img>
                                </div>
                                <div className="stock-pillar-right">
                                    <span className='msg-pillar'>
                                        What if you wanted to analyze your performance among different sectors
                                        you are invested in?
                                    </span>
                                </div>
                            </div>

                            <div className="stock-pillar-1">
                                <div className="stock-pillar-left-2">
                                    <span className='msg-pillar'>
                                        What if you wanted to group your stocks into risky versus safe?
                                    </span>
                                </div>
                                <div className="stock-pillar-right-2">
                                    <img src={risk} className='img-crypto'></img>
                                </div>
                            </div>

                            <div className="stock-pillar-1">
                                <div className="stock-pillar-left">
                                    <img src={stockmagnify} className='img-forex'></img>
                                </div>
                                <div className="stock-pillar-right">
                                    <span className='msg-pillar'>
                                        And what if you needed to analyze your custom groups of investments thoroughly and accurately?
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="third-row">
                    <div className="third-row-images">
                        <img src={user_dashboard} className='img-user-dashboard-1'></img>
                        <img src={user_groups} className='img-user-dashboard-1'></img>
                    </div>
                    <div className="third-row-text-area">
                        <span className="third-row-message-1">Assess your portfolio with ease.</span>
                        <span className="third-row-message-2">
                            Understand your portfolio's overall performance.
                            But also know the details of it as well.
                        </span>
                        <span className="third-row-message-3">
                            See your investments however you want by creating your custom groups.
                            Tracking their performances is as easy as creating them.
                        </span>
                    </div>
                </div>
                <div className="why-use-message-box">
                    <span className="why-use-message">
                        Why choose us?
                    </span>
                </div>
                <div className="fourth-row">
                    
                    <div className="fourth-row-pillars">
                        <div className="fourth-row-pillar-img-area">
                            <img src={free} className='fourth-row-img'></img>
                        </div>
                        <div className="fourth-row-pillar-text-area">
                            <span className="fourth-row-pillar-title">
                                Completely Free
                            </span>
                            <div className="fourth-row-pillar-msg-area">
                                <span className="fourth-row-pillar-message">
                                    Use all of our features for free. No hidden fees or charges.
                                    Just create an account in about 1 minute and start assessing your portfolio!
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="fourth-row-pillars">
                        <div className="fourth-row-pillar-img-area">
                            <img src={accurate} className='fourth-row-img'></img>
                        </div>
                        <div className="fourth-row-pillar-text-area">
                            <span className="fourth-row-pillar-title">
                                Reliably Accurate And Fast
                            </span>
                            <div className="fourth-row-pillar-msg-area">
                                <span className="fourth-row-pillar-message">
                                    Get real-time, accurate updates about the performance of your portfolio.
                                    We'll handle all the calculations; all you have to do is just watch!
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="fourth-row-pillars">
                        <div className="fourth-row-pillar-img-area">
                            <img src={simple} className='fourth-row-img'></img>
                        </div>
                        <div className="fourth-row-pillar-text-area">
                            <span className="fourth-row-pillar-title">
                                Unparalleled Simplicity
                            </span>
                            <div className="fourth-row-pillar-msg-area">
                                <span className="fourth-row-pillar-message">
                                    Even for our most hardcore, diversified investors, Assestsment allows you to
                                    have unparalleled customization while being incredibly simple to use. Analyzing overall portfolio performances
                                    to observing the most detailed of metrics is made simple.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fifth-row">
                    <span className="fifth-row-message">
                        Manage every asset. Made For Investors. By an Investor.
                    </span>
                    <span className="fifth-row-message-red">
                        All in one.
                    </span>
                    <Link to={'/signup'} className="join-now-btn">Join Now</Link>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home;
