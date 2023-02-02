import { useState } from 'react';
import './CatProfile.css'

export default function CatProfile() {
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const allHeads = Object.values(importAll(require.context('../Images/Heads', false, /\.(png|jpe?g|svg)$/)))
    const allEyes = Object.values(importAll(require.context('../Images/Eyes', false, /\.(png|jpe?g|svg)$/)))
    const allMouths = Object.values(importAll(require.context('../Images/Mouths', false, /\.(png|jpe?g|svg)$/)))
    const allClothes = Object.values(importAll(require.context('../Images/Clothes', false, /\.(png|jpe?g|svg)$/)))

    const [curHead, setCurHead] = useState(allHeads[0])
    const [curEye, setCurEye] = useState(allEyes[0])
    const [curMouth, setCurMouth] = useState(allMouths[0])
    const [curClothes, setCurClothes] = useState(allClothes[0])

    const [invalidSeedMessage, setInvalidSeedMessage] = useState("")

    const setImageIndex = (index, imgArr, setCurState) => {
        if(index < 0) index = imgArr.length-1
        if(index > imgArr.length-1) index = 0
        setCurState(imgArr[index])
    }

    const setRandomImage = (imgArr, curImg, setCurState) => {
        let newImg = curImg
        while(newImg === curImg ){
            newImg = imgArr[Math.floor(Math.random() * imgArr.length)]
        }
        setCurState(newImg)
    }

    const enterSeed = () => {
        let indexArr = document.getElementById("seedInfo").value.split("-")
        let imgArrs = [allHeads, allEyes, allMouths, allClothes]
        let stateArr = [setCurHead, setCurEye, setCurMouth, setCurClothes]
        
        for(let i=0; i<indexArr.length; i++){
            if(i >= 4 || indexArr[i] === "" || isNaN(indexArr[i]) || indexArr[i] < 0 || indexArr[i] >= imgArrs[i].length) {
                setInvalidSeedMessage("Please enter a valid seed")
                return
            }
        }

        setInvalidSeedMessage("")
        setImageIndex(indexArr[0], imgArrs[0], stateArr[0]); 
        setImageIndex(indexArr[1], imgArrs[1], stateArr[1]); 
        setImageIndex(indexArr[2], imgArrs[2], stateArr[2]); 
        setImageIndex(indexArr[3], imgArrs[3], stateArr[3]); 
    }

    return (
        <section className="basic-grid">

            <div className="seed">
                <p className='error'>{invalidSeedMessage}</p>
                <input id="seedInfo" type="text" onKeyDown={e => {if (e.keyCode === 13) enterSeed()}}></input>
                <button onClick={() => enterSeed()}>Enter Seed</button>
                {allHeads.indexOf(curHead)}-{allEyes.indexOf(curEye)}-{allMouths.indexOf(curMouth)}-{allClothes.indexOf(curClothes)}
            </div>

            <div className="leftArrows">
                <button className="arrowButtons" 
                    onClick={() => setImageIndex(allHeads.indexOf(curHead)-1, allHeads, setCurHead)}>
                    {"<"}
                </button>
                <button className="arrowButtons" 
                    onClick={() => setImageIndex(allEyes.indexOf(curEye)-1, allEyes, setCurEye)}>
                    {"<"}
                </button>
                <button className="arrowButtons" 
                    onClick={() => setImageIndex(allMouths.indexOf(curMouth)-1, allMouths, setCurMouth)}>
                    {"<"}
                </button>
                <button className="arrowButtons" 
                    onClick={() => setImageIndex(allClothes.indexOf(curClothes)-1, allClothes, setCurClothes)}>
                        {"<"}
                </button>
            </div>

            <div className="catHead">
                <img src={curEye} className="eyes" alt="" width="200" height="200"/>
                <img src={curMouth} className="mouth" alt="" width="200" height="200"/>
                <img src={curHead} className="head"  alt="" width="200" height="200"/>
                <img src={curClothes} alt="" width="200" height="200"/>
            </div>

            <div className="rightArrows">
            <button className="arrowButtons" 
                    onClick={() => setImageIndex(allHeads.indexOf(curHead)+1, allHeads, setCurHead)}>
                    {">"}
                </button>
                <button className="arrowButtons" 
                    onClick={() => setImageIndex(allEyes.indexOf(curEye)+1, allEyes, setCurEye)}>
                    {">"}
                </button>
                <button className="arrowButtons" 
                    onClick={() => setImageIndex(allMouths.indexOf(curMouth)+1, allMouths, setCurMouth)}>
                    {">"}
                </button>
                <button className="arrowButtons" 
                    onClick={() => setImageIndex(allClothes.indexOf(curClothes)+1, allClothes, setCurClothes)}>
                    {">"}
                </button>
            </div>

            <div className="randomButtons">
                <button onClick={() => setRandomImage(allHeads, curHead, setCurHead)}>
                    Random Head
                </button>
                <button onClick={() => setRandomImage(allEyes, curEye, setCurEye)}>
                    Random Eyes
                </button>
                <button onClick={() => setRandomImage(allMouths, curMouth, setCurMouth)}>
                    Random Mouth
                </button>
                <button onClick={() => setRandomImage(allClothes, curClothes, setCurClothes)}>
                    Random Clothes
                </button>
                <button onClick={() => {
                    setRandomImage(allHeads, curHead, setCurHead);
                    setRandomImage(allEyes, curEye, setCurEye);
                    setRandomImage(allMouths, curMouth, setCurMouth);
                    setRandomImage(allClothes, curClothes, setCurClothes);
                }}>
                    Random Cat
                </button>
            </div>
            
        </section>
    )
}