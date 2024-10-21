import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GlobalLayout from './layout/globalLayout';
import HomePage from './pages/homePage';
import TopStoriesPage from './pages/topStoriesPage';
import AskPage from './pages/askPage';
import ShowcasePage from './pages/showcasePage';
import CommentsPage from './pages/commentsPage';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<GlobalLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/top" element={<TopStoriesPage />} />
                    <Route path="/ask" element={<AskPage />} />
                    <Route path="/showcase" element={<ShowcasePage />} />
                    <Route path="/comments/:itemId" element={<CommentsPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
