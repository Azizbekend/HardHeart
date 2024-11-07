import { useState } from "react"
import { map, target, gender, karta, smoke, alkogol, strelka, ruler, zadiak, seriousDate, freeDate, conversation, newExperience, bodyType } from '../../../../Imports/media'
import SVGIcon from "../../../../components/SVGIcon";
import { nameTexts, smokingTexts, bodyTypeTexts, zodiacTexts, genderTexts, finansTexts } from '../../../../Imports/data'

export default function ProfileWindowModal({ modal }) {

    const [nameModal, setNameModal] = useState(modal);
    const [city, setCity] = useState();

    // ПОЛЗУНКИ
    function useRangeSlider(initialValue, minValue, maxValue) {
        const [rangeValue, setRangeValue] = useState(initialValue);
        const progress = ((rangeValue - minValue) / (maxValue - minValue)) * 100;

        const handleChange = (event) => {
            setRangeValue(event.target.value);
        };

        return { rangeValue, progress, handleChange };
    }

    const minBodySlider = useRangeSlider(40, 40, 160);
    const maxBodySlider = useRangeSlider(40, 40, 160);
    const minWidthSlider = useRangeSlider(150, 150, 220);
    const maxWidthSlider = useRangeSlider(150, 150, 220);


    const profileModal = (modal) => {
        switch (modal) {
            case 'filterMain':
                return (
                    <>
                        <h2 className="modal__name _mini">Фильтр</h2>
                        <div className="modal__items _profile">
                            {filterItem(map, "Город", null, "city")}
                            {filterItem(target, "Цель", "серьёзные отноше", "target")}
                            {filterItem(gender, "Пол", null, "gender")}
                            {filterItem(bodyType, "Телосложение", null, "bodyType")}
                            {filterItem(karta, "Материальное положене...", null, "karta")}
                            {filterItem(smoke, "Курение", null, "smoke")}
                            {filterItem(alkogol, "Алкоголь", null, "alkogol")}
                            {filterItem(strelka, "Вес", null, "strelka")}
                            {filterItem(ruler, "Рост", null, "ruler")}
                            {filterItem(zadiak, "Знак зодиака", null, "zadiak")}
                            <button type="submit" className="_btn _green _borderBtn">Сохранить</button>
                        </div>
                    </>
                )
            case 'city':
                return (<>
                    <h3 className="modal__name _black">Город</h3>
                    <div className="modal__items _profile">

                        <select value={city} onChange={(e) => setCity(e.target.value)} className="modal__inp _borderBtn">
                            <option value="Казань">Казань</option>
                            <option value="Москва">Москва</option>
                            <option value="СПб">Санкт-Петербург</option>
                        </select>
                        <button type="submit" className="_btn _green _borderBtn">Сохранить</button>
                        <button type="submit" className="_btn _nFon _borderBtn" onClick={() => setNameModal('filterMain')}>Назад</button>
                    </div>
                </>)
            case 'target':
                return (<>
                    <h3 className="modal__name _black">Цель</h3>
                    <div className="modal__items _profile">
                        {itemInputRadioPurpose("purpose", 1, "серьёзные отношения", seriousDate)}
                        {itemInputRadioPurpose("purpose", 2, "свободные отношения", freeDate)}
                        {itemInputRadioPurpose("purpose", 3, "Дружеское общение", conversation)}
                        {itemInputRadioPurpose("purpose", 4, "Новый опыт", newExperience)}
                        <button type="submit" className="_btn _green _borderBtn">Сохранить</button>
                        <button type="submit" className="_btn _nFon _borderBtn" onClick={() => setNameModal('filterMain')}>Назад</button>
                    </div>
                </>)
            case 'bodyType':
                return (<>
                    {modalLayout("Телосложение", bodyTypeTexts, "bodyType")}
                </>)
            case 'gender':
                return (<>
                    {modalLayout("Пол", genderTexts, "gender")}
                </>)
            case 'karta':
                return (<>
                    {modalLayout("Финансовое положение", finansTexts, "finans")}
                </>)
            case 'smoke':
                return (<>
                    {modalLayout("Курение", smokingTexts, "smoking")}
                </>)
            case 'alkogol':
                return (<>
                    {modalLayout("Питьё", nameTexts, "drinks")}
                </>)
            case 'strelka':
                return (<>
                    <h3 className="modal__name _black">Какой у вас вес?</h3>
                    <div className="modal__items _profile">
                        <div className="modal__range">
                            <p className="modal__range-count">Минимум: {minBodySlider.rangeValue} кг</p>
                            <input type="range" id="range" min="40" max="160"
                                value={minBodySlider.rangeValue}
                                style={{ background: `linear-gradient(to right, rgba(146, 130, 240, 1) ${minBodySlider.progress}%, #ccc ${minBodySlider.progress}%)`, }}
                                className="modal__range-inp"
                                onInput={(event) => minBodySlider.handleChange(event)} />
                        </div>
                        <div className="modal__range">
                            <p className="modal__range-count">Максимум: {maxBodySlider.rangeValue} кг</p>
                            <input type="range" id="range" min="40" max="160"
                                value={maxBodySlider.rangeValue}
                                style={{ background: `linear-gradient(to right, rgba(146, 130, 240, 1) ${maxBodySlider.progress}%, #ccc ${maxBodySlider.progress}%)`, }}
                                className="modal__range-inp"
                                onInput={(event) => maxBodySlider.handleChange(event)} />
                        </div>
                        <button type="submit" className="_btn _green _borderBtn">Сохранить</button>
                        <button type="submit" className="_btn _nFon _borderBtn" onClick={() => setNameModal('filterMain')}>Назад</button>
                    </div>
                </>)
            case 'ruler':
                return (<>
                    <h3 className="modal__name _black">Какой у вас вес?</h3>
                    <div className="modal__items _profile">
                        <div className="modal__range">
                            <p className="modal__range-count">Минимум: {minWidthSlider.rangeValue} кг</p>
                            <input type="range" id="range" min="40" max="160"
                                value={minWidthSlider.rangeValue}
                                style={{ background: `linear-gradient(to right, rgba(146, 130, 240, 1) ${minWidthSlider.progress}%, #ccc ${minWidthSlider.progress}%)`, }}
                                className="modal__range-inp"
                                onInput={(event) => minWidthSlider.handleChange(event)} />
                        </div>
                        <div className="modal__range">
                            <p className="modal__range-count">Максимум: {maxWidthSlider.rangeValue} кг</p>
                            <input type="range" id="range" min="40" max="160"
                                value={maxWidthSlider.rangeValue}
                                style={{ background: `linear-gradient(to right, rgba(146, 130, 240, 1) ${maxWidthSlider.progress}%, #ccc ${maxWidthSlider.progress}%)`, }}
                                className="modal__range-inp"
                                onInput={(event) => maxWidthSlider.handleChange(event)} />
                        </div>
                        <button type="submit" className="_btn _green _borderBtn">Сохранить</button>
                        <button type="submit" className="_btn _nFon _borderBtn" onClick={() => setNameModal('filterMain')}>Назад</button>
                    </div>
                </>)
            case 'zadiak':
                return (<>
                    {modalLayout("Знак зодиака", zodiacTexts, "finans")}
                </>)

        }
    }

    function filterItem(img, text, options, linkModal) {
        return (<>
            <div className="modal__filter">
                <div className="modal__filter-left">
                    <div className="modal__filter-img">
                        <img src={img} alt={img} />
                    </div>
                    <span>{text}</span>{options && (<>: {options}</>)}
                </div>
                <button className="modal__filter-btn" onClick={() => setNameModal(linkModal)}><SVGIcon name="edit" /></button>
            </div>
        </>)
    }


    function itemInputRadioPurpose(name, id, text, img) {
        return (<>
            <label htmlFor={`${name}-${id}`} className="modal__radioInp">
                <input type="checkbox" id={`${name}-${id}`} name={name} />
                <div className="modal__inp _radio _left _borderBtn">
                    <img src={img} alt="seriousDate" />
                    <span>{text}</span>
                </div>
            </label>
        </>)
    }

    // Фунция создания контента модальных окон about
    function modalLayout(title, textsData, name) {
        return (
            <>
                <h3 className="modal__name _black">{title}</h3>
                <div className="modal__items _profile">
                    {textsData.map((text, index) => itemInputRadio(name, index, text))}
                    <button type="submit" className="_btn _green _borderBtn">Сохранить</button>
                    <button type="submit" className="_btn _nFon _borderBtn" onClick={() => setNameModal('filterMain')}>Назад</button>
                </div>
            </>
        )
    }
    // Функция создания radio элементов
    function itemInputRadio(name = null, id = null, text = null) {
        return (
            <label htmlFor={`${name}-${id}`} className="modal__radioInp">
                <input type="checkbox" id={`${name}-${id}`} name={name} />
                <div className="modal__inp _radio _borderBtn">
                    <span>{text}</span>
                </div>
            </label>
        )
    }

    return (
        <>
            {profileModal(nameModal)}
        </>
    )
}