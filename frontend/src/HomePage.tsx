/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PrimaryButton } from './Styles';
import { QuestionList } from './QuestionLIst';
import { GetUnansweredQuestions } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { useEffect } from 'react';

export const HomePage = () => {
    useEffect(() => {
        console.log('first rendered');
    }, []);

    return (
        <Page>
            <div
                css={css`
                    margin: 50px auto 20px auto;
                    padding: 30px 20px;
                    max-width: 600px;
                `}
            >
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    `}
                >
                    <h2
                        css={css`
                            font-size: 15px;
                            font-weight: bold;
                            margin: 10px 0px 5px;
                            text-align: center;
                            text-transform: uppercase;
                        `}
                    >
                        <PageTitle>Unanswered Questions</PageTitle>
                    </h2>
                    <PrimaryButton>Ask a question</PrimaryButton>
                </div>
                {/* <QuestionList data={GetUnansweredQuestions()} /> */}
            </div>
        </Page>
    );
};
