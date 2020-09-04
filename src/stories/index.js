import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import './styles.css';

function Stories() {

    const [scrollX, setScrollx] = useState(0);
    const [stories, setStories] = useState([
        {
            img: "https://avatars0.githubusercontent.com/u/56305107?s=460&u=2240a7b9b5e8499f64fb1607b42c00f0af10096a&v=4",
            user: 'cmoreiradev'
        },
        {
            img: "https://yt3.ggpht.com/a/AATXAJydjgDHqK3vz4iHkrPZjHSsjwh1aPsqOwxHCZ_ISA=s100-c-k-c0xffffffff-no-rj-mo",
            user: 'CleverQazi'
        },
        {
            img: "https://instagram.fcgh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/118922654_2732072267075248_4981900657255298793_n.jpg?_nc_ht=instagram.fcgh2-1.fna.fbcdn.net&_nc_ohc=pWikJ00mS94AX9n3ETQ&oh=846ac54b11d232c53e1a0a84a009b1d6&oe=5F7AB96D",
            user: 'ssssangha'
        },
        {
            img: "https://instagram.fcgh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/117251745_668967427028740_287195862228349516_n.jpg?_nc_ht=instagram.fcgh2-1.fna.fbcdn.net&_nc_ohc=DzO6j2oKG-kAX8-byT7&oh=17ed4bebd7f78eae65f112551723f000&oe=5F7A64AB",
            user: 'bonieky'
        },
        {
            img: "https://instagram.fcgh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/57244845_337212433647806_3826073986739994624_n.jpg?_nc_ht=instagram.fcgh2-1.fna.fbcdn.net&_nc_ohc=6uu27g_5reEAX8R6eeW&oh=d7887a3ff6fb2f072a2e38fb01fd4dfb&oe=5F7CC0D7",
            user: 'filipedeschamps'
        },
        {
            img: "https://instagram.fcgh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/90674194_1313568052365917_8716320417070972928_n.jpg?_nc_ht=instagram.fcgh2-1.fna.fbcdn.net&_nc_ohc=mXMrzwFgtKMAX_SssvR&oh=6d4bf3cc81bf43dab7937cb8df0a7800&oe=5F7B9DAA",
            user: 'lucasmontano'
        },
        {
            img: "https://instagram.fcgh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/106368815_207978320452838_2192237291374600005_n.jpg?_nc_ht=instagram.fcgh2-1.fna.fbcdn.net&_nc_ohc=tD6-Fe_NVtcAX_IFnqn&oh=84bb64ef083e629080fac2ee80508118&oe=5F7CD1CA",
            user: 'leozin'
        },
        {
            img: "https://instagram.fcgh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/26871320_365656413901095_4702091742818598912_n.jpg?_nc_ht=instagram.fcgh2-1.fna.fbcdn.net&_nc_ohc=0dsNoT2T9E4AX_A7n4Y&oh=35008e1fb02cee6332ac185c4055741f&oe=5F7DDE88",
            user: 'gustavoguanabara'
        },
        {
            img: "https://avatars3.githubusercontent.com/u/59545?s=460&u=f968d812d303a087cb6b23b7aa7766ef1a59559c&v=4",
            user: 'loiane'
        },
        {
            img: "https://instagram.fcgh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/73712513_2207485072685686_3964965317762875392_n.jpg?_nc_ht=instagram.fcgh2-1.fna.fbcdn.net&_nc_ohc=xaWigZjocKEAX_yhkqg&oh=8d776f57831f6daf0ea8ed2f82e4a85c&oe=5F7DC8FA",
            user: 'aluraonline'
        },
        {
            img: "https://instagram.fcgh2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/117327048_346080093218628_9083298682963332874_n.jpg?_nc_ht=instagram.fcgh2-1.fna.fbcdn.net&_nc_ohc=odUPdr1wxLUAX9f3znL&oh=f4f488af05c95bf53af9bc1ccf0d4b50&oe=5F7A602B",
            user: 'rocketseat_oficial'
        },
        {
            img: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
            user: 'diegofernandes'
        },
    ]);

    let arrowLeft = false;

    if (scrollX < 0) {
        arrowLeft = true;
    }

    let arrowRight = true;

    if (scrollX < -500) {
        arrowRight = false;
    }

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollx(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = stories.length * 180;

        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 40;
        }
        setScrollx(x);
    }

    console.log(stories);

    return (
        <div className="container__stories">

            <div className="myStories--list" style={{
                marginLeft: scrollX,
                width: stories.length * 500
            }}>
                <div className={arrowLeft ? 'originals--left' : 'no-arrow-left'} onClick={handleLeftArrow}>
                    <FiChevronLeft size={50} />
                </div>

                <div className={arrowRight ? 'originals--right' : 'no-arrow-right'} onClick={handleRightArrow}>
                    <FiChevronRight size={50} />
                </div>

                <ul className="originals--item">
                    {stories.length > 0 && stories.map(item => (
                        <li>
                            <img className='user__stories' src={item.img} alt="User" />
                            <p>{item.user}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Stories;