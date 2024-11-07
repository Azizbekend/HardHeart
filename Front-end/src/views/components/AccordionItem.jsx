import { useState } from "react";
import SVGIcon from "./SVGIcon";

export default function AccordionItem({ title, content, isOpen, onToggle }) {

    return (
        <>
            <div className="faq__item" onClick={onToggle}>
                <div className="faq__header">
                    <p>{title}</p>
                    <div className={isOpen ? "faq__item-arrow _active" : "faq__item-arrow"}>
                        <SVGIcon name='ArrowDownNotLong' />
                    </div>
                </div>
                <div className={isOpen ? "faq__content _active" : "faq__content"}>
                    {content}
                </div>
            </div>
        </>
    );
}
