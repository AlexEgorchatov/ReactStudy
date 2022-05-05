/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { FC, useState, createContext } from 'react';
import { gray5, gray6, PrimaryButton } from './Styles';

export interface Values {
    [key: string]: any;
}

interface FormContextProps {
    values: Values;
    setContextValue?: (fieldName: string, value: any) => void;
    errors: Errors;
    validate?: (fieldName: string) => void;
    touched: Touched;
    setTouched?: (fieldName: string) => void;
}

interface Validation {
    validator: Validator;
    arg?: any;
}

interface ValidationProp {
    [key: string]: Validation | Validation[];
}

export interface Errors {
    [key: string]: string[];
}

export interface Touched {
    [Key: string]: boolean;
}

export const FormContext = createContext<FormContextProps>({ values: {}, errors: {}, touched: {} });
type Validator = (value: any, args?: any) => string;

interface Props {
    submitCaption?: string;
    validationRules?: ValidationProp;
}

export const required: Validator = (value: any): string =>
    value === undefined || value === null || value === '' ? 'This must be populated' : '';
export const minLength: Validator = (value: any, length: number): string =>
    value && value.length < length ? `This must be at least ${length} characters` : '';

export const Form: FC<Props> = ({ submitCaption, children, validationRules }) => {
    const [values, setValues] = useState<Values>({});
    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Touched>({});
    const validate = (fieldName: string): string[] => {
        if (!validationRules) {
            return [];
        }
        if (!validationRules[fieldName]) {
            return [];
        }

        const rules = Array.isArray(validationRules[fieldName])
            ? (validationRules[fieldName] as Validation[])
            : ([validationRules[fieldName]] as Validation[]);
        const fieldErrors: string[] = [];
        rules.forEach((i) => {
            const error = i.validator(values[fieldName], i.arg);
            if (error) {
                fieldErrors.push(error);
            }
        });
        const newErrors = { ...errors, [fieldName]: fieldErrors };
        setErrors(newErrors);
        return fieldErrors;
    };

    return (
        <FormContext.Provider
            value={{
                values,
                setContextValue: (fieldName: string, value: any) => {
                    setValues({ ...values, [fieldName]: value });
                },
                errors,
                validate,
                touched,
                setTouched: (fieldName: string) => {
                    setTouched({ ...touched, [fieldName]: true });
                },
            }}
        >
            <form noValidate={true}>
                <fieldset
                    css={css`
                        margin: 10px auto 0 auto;
                        padding: 30px;
                        width: 350px;
                        background-color: ${gray6};
                        border-radius: 4px;
                        border: 1px solid ${gray5};
                        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
                    `}
                >
                    {children}
                    <div
                        css={css`
                            margin: 30px 0px 0px 0px;
                            padding: 20px 0px 0px 0px;
                            border-top: 1px solid ${gray5};
                        `}
                    >
                        <PrimaryButton type="submit">{submitCaption}</PrimaryButton>
                    </div>
                </fieldset>
            </form>
        </FormContext.Provider>
    );
};
