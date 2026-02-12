import React from 'react';
import ReactDOMClient from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ArticlesList from './components/ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import AddArticleForm from './components/AddArticleForm';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<ArticlesList/>} />
                <Route path="/articles/:id" element={<ArticleDetail/>} />
                <Route path="/add" element={<AddArticleForm/>} />
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOMClient.createRoot(document.getElementById('app'));
root.render(<App />);