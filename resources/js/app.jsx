import React from 'react';
import ReactDOMClient from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ArticlesList from './components/ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import AddArticleForm from './components/AddArticleForm';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <BrowserRouter>
            <div className="vh-100">
                <Navbar />
                <div className="container mt-5">
                    <Routes>
                        <Route path="/" element={<ArticlesList />} />
                        <Route path="/articles/:id" element={<ArticleDetail />} />
                        <Route path="/add" element={<AddArticleForm />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

const root = ReactDOMClient.createRoot(document.getElementById('app'));
root.render(<App />);