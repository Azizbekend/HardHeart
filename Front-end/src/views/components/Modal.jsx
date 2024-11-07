import { Transition } from 'react-transition-group';
import { SVGIcon } from '../Imports/components';
import { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, children }) {
    const nodeRef = useRef(null);

    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        window.addEventListener('keyup', handleKeyPress);

        return () => {
            window.removeEventListener('keyup', handleKeyPress);
        };
    }, []);

    return (
        <>
            <Transition in={isOpen} timeout={300} nodeRef={nodeRef}>
                {(state) => (
                    <div ref={nodeRef} className={`modal modal__${state}`}>
                        <div className="modal__wripper" onKeyDown={handleKeyPress}>
                            <div className="modal__content">
                                <div className="modal__close" onClick={onClose}>
                                    <SVGIcon name='close' />
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        </>
    );
}
