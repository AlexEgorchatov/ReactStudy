/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { PrimaryButton } from './Styles';
import { QuestionList } from './QuestionLIst';
import { GetUnansweredQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { useEffect, useState } from 'react';
import { isConstructorDeclaration } from 'typescript';

export const HomePage = () => {
    const [questions, setQuestions] = useState<QuestionData[] | null>(null);
    const [questionsLoading, setQuestionsLoading] = useState(true);
    useEffect(() => {
        const doGetUnansweredQuestions = async () => {
            const unansweredQuestions = await GetUnansweredQuestions();
            setQuestions(unansweredQuestions);
            setQuestionsLoading(false);
        };
        doGetUnansweredQuestions();
    }, []);

    const handleAskQuestionClick = () => {
        console.log('Move ot the ask page');
    };

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
                    <PrimaryButton onClick={handleAskQuestionClick}>Ask a question</PrimaryButton>
                </div>
                {questionsLoading ? (
                    <div
                        css={css`
                            font-size: 16px;
                            font-style: italic;
                        `}
                    >
                        Loading...
                    </div>
                ) : (
                    <QuestionList data={questions || []} />
                )}
            </div>
        </Page>
    );
};
