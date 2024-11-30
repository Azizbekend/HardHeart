import { useState, useEffect } from 'react';

const UseWordEffect = (words) => {
    const [displayedText, setDisplayedText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isRemoving, setIsRemoving] = useState(false);
    const [typeCard, setTypeCard] = useState('половинку');

    useEffect(() => {
        switch (words[wordIndex]) {
            case 'половинку': setTypeCard('love');
                break;
            case 'друга': setTypeCard('friend');
                break;
            case 'подругу': setTypeCard('girlFriend');
                break;
            default:
                setTypeCard('');
        }
        if (wordIndex < words.length) {
            if (!isRemoving) {
                if (charIndex < words[wordIndex].length) {
                    const timeout = setTimeout(() => {
                        setDisplayedText((prev) => prev + words[wordIndex][charIndex]);
                        setCharIndex((prev) => prev + 1);
                    }, 150); // задержка между символами

                    return () => clearTimeout(timeout);
                } else {
                    const timeout = setTimeout(() => {
                        setIsRemoving(true);
                    }, 2000); // задержка перед началом исчезновения слова

                    return () => clearTimeout(timeout);
                }
            } else {
                if (charIndex > 0) {
                    const timeout = setTimeout(() => {
                        setDisplayedText((prev) => prev.slice(0, -1));
                        setCharIndex((prev) => prev - 1);
                    }, 50); // задержка между удалением символов

                    return () => clearTimeout(timeout);
                } else {
                    const timeout = setTimeout(() => {
                        setIsRemoving(false);
                        setWordIndex((prev) => (prev + 1) % words.length); // повторяем с начала
                        setCharIndex(0);
                    }, 1000); // задержка перед началом следующего слова

                    return () => clearTimeout(timeout);
                }
            }
        }
    }, [wordIndex, charIndex, isRemoving, words]);
    return { displayedText, typeCard, wordIndex, setWordIndex };
};

export default UseWordEffect;
