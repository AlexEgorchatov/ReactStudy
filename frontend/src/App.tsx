/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { fontFamily, fontSize, gray2 } from './Styles';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { QuestionPage } from './QuestionPage';
import { NotFoundPage } from './NotFoundPage';
import React, { lazy, Suspense } from 'react';
const AskPage = lazy(() => import('./AskPage'));

function App() {
    return (
        <BrowserRouter>
            <div
                className="App"
                css={css`
                    font-family: ${fontFamily};
                    font-size: ${fontSize};
                    color: ${gray2};
                `}
            >
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route
                        path="ask"
                        element={
                            <Suspense
                                fallback={
                                    <div
                                        css={css`
                                            margin-top: 100px;
                                            text-align: center;
                                        `}
                                    >
                                        Loading...
                                    </div>
                                }
                            >
                                <AskPage />
                            </Suspense>
                        }
                    ></Route>
                    <Route path="signin" element={<SignInPage />} />
                    <Route path="home" element={<Navigate to="/" />} />
                    <Route path="questions/:questionId" element={<QuestionPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
