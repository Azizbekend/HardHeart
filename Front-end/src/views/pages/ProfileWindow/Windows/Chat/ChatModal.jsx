import { chatFoto, friendIcon } from '../../../../Imports/media'
import { SVGIcon } from '../../../../Imports/components'

export default function ChatModal() {
    return (
        <>

            <div className="chat__modal">
                <h2 className="modal__name _mini">Фильтр</h2>
                <div className="cp__header">
                    <div className="cp__foto">
                        <img src={chatFoto} alt="" />
                    </div>
                    <p className="cp__name">Имя фамилия 19</p>
                </div>
                <div className="chat__modal-infoUser pi">

                    <div className="pi__infoBlock">
                        <div className='pi__edit'>
                            <p className="pi__infoBlock-name">Я ищу</p>
                        </div>
                        <span className="pi__infoBlock-card _p20">серьёзные отношения</span>
                        <p className='pi__infoBlock-card _discreption _block'>
                            не ищу одноразовых встреч с известной целью❗️<br />
                            интересно знакомство с интеллигентным, серьезным, добрым и честным человеком<br />
                            /если здесь есть возможность таких найти/будет хорошо, если вы напишете первым 🔆 <br />
                            парни-обиженки, которые любят удалять сообщения, не тратьте ни мое, ни свое время)<br />
                            tg @hrzchen
                        </p>
                    </div>

                    <div className="pi__infoBlock">
                        <div className='pi__edit'>
                            <p className="pi__infoBlock-name">О себе</p>
                        </div>
                        <div className="pi__cards">
                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                Описание</span>
                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                Описание</span>
                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                серьёзные отношения</span>
                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                Описание</span>
                            <span className="pi__infoBlock-card">
                                <img src={friendIcon} alt="" />
                                серьёзные отношения</span>
                        </div>
                    </div>
                    <div className="pi__infoBlock">
                        <div className='pi__edit'>
                            <p className="pi__infoBlock-name">Образование</p>
                        </div>
                        <div className="pi__cards">
                            <span className="pi__infoBlock-card _p20">НИУ МГСУ (МГСУ-МИСИ)</span>
                            <span className="pi__infoBlock-card _p20">НИУ МГСУ (МГСУ-МИСИ)</span>
                        </div>
                    </div>
                    <div className="pi__infoBlock">
                        <div className='pi__edit'>
                            <p className="pi__infoBlock-name">Интересы</p>
                        </div>
                        <div className="pi__cards">
                            <span className="pi__infoBlock-card">Тортик</span>
                            <span className="pi__infoBlock-card">Тортик</span>
                            <span className="pi__infoBlock-card">Тортик</span>
                            <span className="pi__infoBlock-card">Тортик</span>
                            <span className="pi__infoBlock-card">Тортик</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}