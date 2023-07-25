import React, { useEffect, useState } from 'react';
import { JSDOM } from 'jsdom';
export default function Index () {
  const website =
        'https://docs.google.com/document/d/e/2PACX-1vT1YqDoJ6oQo5fuZs-maN6MJ2i82zk_DeX6dW1_S7d5DLgVNHt66Y6QRr3o4qRQK-RsgbdcDqsASJAi/pub';
    var data = [];
    var my_list = [
        'nhảy',
        'cờ',
        'toeic',
        'ielts',
        'organ',
        'nhật',
        'trung',
        'piano',
        'đức',
        'hàn',
        'guitar',
        'đài',
        'pháp',
        'dance',
        'đàn',
        'vẽ',
        'sáo',
        'thanh nhạc',
        'thuế',
        'kế toán',
        'tây ban nha',
    ];
    const [cv, setCV] = useState([]);
    // dung de them tu khoa va mylist
    const [key, setKey] = useState('');
    // khoi tao array mylist
    const [keys, setKeys] = useState(my_list);

    const [jobApi, setJobApi] = useState({
        html: null,
    });

    const handleSubmit = (e) => {
        setKeys((prev) => [...prev, key]);
        e.preventDefault();
    };
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(website);
            const html = await response.text();
            if (html) {
                setJobApi({ html });
            } else {
                console.log('can not get data');
            }
        };
        getData();
    }, []);

    useEffect(() => {
        const fetchData = () => {
            const { html } = jobApi;
            const dom = new JSDOM(html);
            const document = dom.window.document;
            const dn = document.querySelectorAll('.c1');
            for (var i = 0; i < dn.length; i++) {
                if (dn[i].textContent.toLowerCase().includes('online')) {
                    console.log('yes');
                    if (keys.some((e) => dn[i - 1].textContent.toLowerCase().includes(e)) != true) {
                        console.log('ok');
                        data.push(
                            dn[i - 2].textContent,
                            dn[i - 1].textContent,
                            dn[i].textContent,
                            dn[i + 1].textContent,
                            dn[i + 2].textContent,
                            dn[i + 3].textContent,
                            dn[i + 4].textContent,
                        );
                    }
                }
            }
            setCV(data);
        };
        fetchData();
    }, [jobApi.html, keys]);

    const handleButton = (deleteKey) => {
        const newkeys = keys.filter((key) => key !== deleteKey);
        setKeys(newkeys);
    };

    const arrayData = Object.values(cv).map((keyName, i) => (
        <li className="travelcompany-input" key={i} style={{ listStyle: 'none' }}>
            <span className="input-label"> {keyName}</span>
        </li>
    ));

    const [indexButton, setIndexButton] = useState(-1);
    const mouseButton = 'green';
    const unmouseButton = 'red';
    const handleMouseLeave = (e) => {
        setIndexButton(-1);
    };

    const handleMouseEnter = (key, index) => {
        setIndexButton(keys.indexOf(key));
    };
    return (
        <div>
            <h1>I can do it</h1>
            <div className="tu-khoa">
                <h3>Danh sach tu khoa: </h3>
                {keys.map((key, index) => (
                    <span
                        key={index}
                        style={{
                            color: 'black',
                            background: indexButton === index ? 'rgb(0, 153, 255)' : 'red',
                            display: 'inline-block',
                            padding: '5px',
                            borderRadius: '40px',
                            fontSize: '18px',
                            margin: '5px',
                        }}
                    >
                        {key}
                        <button
                            onClick={() => handleButton(key)}
                            key={index}
                            style={{
                                background: 'orange',
                                border: 'none',
                                borderRadius: '20px 20px',
                                fontSize: '15px',
                                marginLeft: '5px',
                            }}
                            onMouseEnter={() => handleMouseEnter(key, index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            Delete
                        </button>
                    </span>
                ))}
            </div>
            <div className="addKey">
                <h3>Add Keyword</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            style={{ height: '20px', textAlign: 'center' }}
                        />
                    </label>
                    <input
                        type="submit"
                        value="Submit"
                        style={{ background: 'orange', height: '25px', border: 'none', fontSize: '15px' }}
                    />
                </form>
            </div>
            <div
                className="scrolbar"
                style={{
                    border: 'none',
                    padding: '5px',
                    font: '24px/36px sans-serif',
                    width: '650px',
                    height: '500px',
                    overflow: 'scroll',
                }}
            >
                <ul>{arrayData}</ul>
            </div>
        </div>
    );
}
