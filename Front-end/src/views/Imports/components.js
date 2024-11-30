import UseWordEffect from '../../hoc/UseWordEffect';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AccordionItem from '../components/AccordionItem';
import SVGIcon from '../components/SVGIcon';
import getTextById from '../components/getTextById';
import LoginModal from '../pages/Main/components/LoginModal';
import ProfileModals from '../pages/Profile/ProfileModals';
import Modal from '../components/Modal';
import ProfileWindowModal from '../pages/ProfileWindow/Windows/Search/SearchModal';
import ChatModal from '../pages/ProfileWindow/Windows/Chat/ChatModal';
import { useAuth } from '../../hook/useAuth';
import AgeCalculate from '../components/AgeCalculate';
import { likeUser, likeUserPage, disLikeUserPage, dislikeUser } from '../components/DoingNowUser';
import { getFetch, postFetch } from '../components/Fetch';




export {
    UseWordEffect,
    Header,
    Footer,
    AccordionItem,
    SVGIcon,
    LoginModal,
    Modal,
    ProfileModals,
    ProfileWindowModal,
    ChatModal,
    useAuth,
    getTextById,
    AgeCalculate,
    likeUser,
    likeUserPage,
    disLikeUserPage,
    dislikeUser,
    getFetch,
    postFetch,
}