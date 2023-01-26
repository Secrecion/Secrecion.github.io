const RandomQuote = ({ quote, handleNewQuote }) => (
    <div className="wrapper" id="quote-box">
        <header> Quote of the Day</header>
        <div className="content">
            <div className="quote-area">
                <i className="fas fa-quote-left"></i>
                <p className="quot" id="text">{quote.text}</p>
                <i className="fas fa-quote-right"></i>
            </div>
            <div className="author-space" >
                <span>__</span>
                <span id="author">{quote.author}</span>
            </div></div><div className="buttons">
            <div className="features">
                <ul>
                    <li className="tumblr"><i className="fab fa-tumblr"></i></li>
                    <li className="twitter"><a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank"><i className="fab fa-twitter"></i></a></li>
                </ul>
                <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
            </div>
        </div>
    </div>
);

const App = () => {

    const [quote, setQuote] = React.useState({});
    React.useEffect(() => {
        getQuote();
    }, []);

    const getQuote = () => {
        fetch('http://api.quotable.io/random')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setQuote({
                    text: data.content,
                    author: data.author,
                });
            });
    };


    const handleNewQuote = () => {
        getQuote()
    };


    return (
        <div className="main">
            <RandomQuote quote={quote} handleNewQuote={handleNewQuote} />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'))