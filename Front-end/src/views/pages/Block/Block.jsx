import { Footer, Header } from "../../Imports/components";

export default function Block() {
    return (
        <>
            <Header />
            <div className="block">
                <h1>Вы были заблокированы</h1>
            </div>
            <Footer />
        </>
    )
}