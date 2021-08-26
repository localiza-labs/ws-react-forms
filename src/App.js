import Header from "./components/Header";
import QuotationForm from "./components/QuotationForm";

function App() {
    return (
        <div>
            <Header/>

            <div className="container pt-5 pb-5">
                <QuotationForm/>
            </div>
        </div>
    );
}

export default App;
