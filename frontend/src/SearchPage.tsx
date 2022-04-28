/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState, useEffect } from 'react';
import { QuestionList } from './QuestionLIst';
import { Page } from './Page';
import { SearchQuestions, QuestionData } from './QuestionsData';
import { useSearchParams } from 'react-router-dom';

export const SearchPage = () => {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('criteria') || '';
    console.log(search);
    useEffect(() => {
        const doSearch = async (criteria: string) => {
            const foundResults = await SearchQuestions(criteria);
            setQuestions(foundResults);
        };
        doSearch(search);
    }, [search]);

    return (
        <Page title="Search Results">
            {search && (
                <p
                    css={css`
                        font-size: 16px;
                        font-style: italic;
                        margin-top: 0px;
                    `}
                >
                    for "{search}"
                </p>
            )}
            <QuestionList data={questions} />
        </Page>
    );
};
