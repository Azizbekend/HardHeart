import { Header, Footer } from '../../Imports/components';
import Error403 from './ErrorCodes/Error403';
import Error404 from './ErrorCodes/Error404';
import { useParams } from 'react-router-dom';

export default function Errors() {
    const { codeNum } = useParams();

    function errorCode(code) {
        switch (code) {
            case "404":
                return <Error404 />;
            case "403":
                return <Error403 />;
            default:
                return <>Ошибка не существует</>;
        }
    }

    return (
        <>
            <Header modalOpenBtn={() => setModalOpen(true)} />
            <div className="error">
                {errorCode(codeNum)}
            </div>
            <Footer />
        </>
    );
}
