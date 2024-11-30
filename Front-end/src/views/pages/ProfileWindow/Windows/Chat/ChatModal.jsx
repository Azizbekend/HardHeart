import { alkogol, chatFoto, karta, ruler, smoke, strelka, zadiak } from '../../../../Imports/media'
import { AgeCalculate, getTextById, SVGIcon } from '../../../../Imports/components'
import { useEffect, useState } from 'react';

export default function ChatModal({ friendInfo }) {


    const friend = friendInfo.friend;
    // console.log(friend)

    const [switchAbout, setSwitchAbout] = useState(false);
    useEffect(() => {
        if (friend?.alcohol != null || friend?.smoking != null || friend?.height != null || friend?.weight != null || friend?.financialSituation != null || friend?.zadiak != null) {
            setSwitchAbout(true)
        } else {
            setSwitchAbout(false)
        }
    }, [friend])

    return (
        <>

            <div className="chat__modal">
                <h2 className="modal__name _mini">Профиль</h2>
                <div className="cp__header">
                    <div className="cp__foto">
                        <img src={`http://127.0.0.1:8000/api/images/${friend?.img || "bannerCenter.png"}`} alt="" />
                    </div>
                    <p className="cp__name">{friend?.name} {AgeCalculate(friend?.age)}</p>
                </div>
                <div className="chat__modal-infoUser pi">

                    <div className="pi__infoBlock">
                        <div className='pi__edit'>
                            <p className="pi__infoBlock-name">Я ищу</p>
                        </div>
                        <span className="pi__infoBlock-card _p20">{getTextById("goal", friend?.goal)}</span>
                        {friend?.description &&
                            <p className='pi__infoBlock-card _discreption _block'>{friend?.description}</p>
                        }
                    </div>

                    {switchAbout &&
                        <div className="pi__infoBlock">
                            <div className='pi__edit'>
                                <p className="pi__infoBlock-name">О себе</p>
                            </div>
                            <div className="pi__cards">
                                {(friend?.alcohol || friend.alcohol == 0) &&
                                    <span className="pi__infoBlock-card">
                                        <img src={alkogol} alt="" />
                                        {getTextById("alcohol", friend?.alcohol)}
                                    </span>
                                }

                                {(friend?.smoking || friend.smoking == 0) &&
                                    <span className="pi__infoBlock-card">
                                        <img src={smoke} alt="" />
                                        {getTextById("smoking", friend?.smoking)}
                                    </span>
                                }
                                {friend?.height &&
                                    <span className="pi__infoBlock-card">
                                        <img src={ruler} alt="" />
                                        {friend?.height} см
                                    </span>
                                }
                                {friend?.weight &&
                                    <span className="pi__infoBlock-card">
                                        <img src={strelka} alt="" />
                                        {friend?.weight} кг
                                    </span>
                                }
                                {(friend?.financialSituation || friend.financialSituation == 0) &&
                                    <span className="pi__infoBlock-card">
                                        <img src={karta} alt="" />
                                        {getTextById("financialSituation", friend?.financialSituation)}
                                    </span>
                                }
                                {(friend?.zadiak || friend.zadiak == 0) &&
                                    <span className="pi__infoBlock-card">
                                        <img src={zadiak} alt="" />
                                        {getTextById("zadiak", friend?.zadiak)}
                                    </span>
                                }
                            </div>
                        </div>
                    }
                    {(friend?.educations && friend.educations.length > 0) &&
                        <div className="pi__infoBlock">
                            <p className="pi__infoBlock-name">Образование</p>
                            <div className="pi__cards">
                                {friend.educations.map((education, index) =>
                                    <span className="pi__infoBlock-card _p20" key={index}>{education.name}</span>
                                )}
                            </div>
                        </div>
                    }

                    {friend?.interests?.length > 0 &&
                        <div className="pi__infoBlock">
                            <p className="pi__infoBlock-name">Интересы</p>
                            <div className="pi__cards">
                                {friend.interests.map((interest, index) =>
                                    <span className="pi__infoBlock-card" key={index}>{interest.name}</span>
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}