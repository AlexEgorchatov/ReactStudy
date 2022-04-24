/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Header } from './Header';
import { HomePage } from './HomePage';
import { fontFamily, fontSize, gray2 } from './Styles';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AskPage } from './AskPage';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';

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
                    <Route path="ask" element={<AskPage />} />
                    <Route path="signin" element={<SignInPage />} />
                    <Route path="home" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
