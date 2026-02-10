import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ArticlesList from './components/ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import AddArticleForm from './components/AddArticleForm';

// ReactDOM.render(
//     <Router>
//         <div>
//             <Route exact path="/" component={ArticlesList} />
//             <Route path="/articles/:id" component={ArticleDetail} />
//             <Route path="/add" component={AddArticleForm} />
//         </div>
//     </Router>,
//     document.getElementById('app')
// );

const App = () => {
    // useEffect(() => {
    //     alert('Добро пожаловать на сайт!');
    // }, []);

    return (
        <BrowserRouter>
            <div className="lalala">

            </div>
            <Routes>
                {/*<Route path="/" exact component={ArticlesList} />*/}
                <Route path="/" exact element={<ArticlesList/>} />
                <Route path="/articles/:id" element={<ArticleDetail/>} />
                <Route path="/add" element={<AddArticleForm/>} />
            </Routes>
        </BrowserRouter>
    );
};

// ReactDOM.render(
//     <App />,
//     document.getElementById('app')
// );

const root = ReactDOMClient.createRoot(document.getElementById('app'));
root.render(<App />);