import { Field } from './Field';
import { Form, minLength, required } from './Form';
import { Page } from './Page';

export const AskPage = () => (
    <Page title="Ask a question">
        <Form
            submitCaption="Submit Your Question"
            validationRules={{
                title: [{ validator: required }, { validator: minLength, arg: 10 }],
                content: [{ validator: required }, { validator: minLength, arg: 50 }],
            }}
        >
            <Field name="title" label="Title" />
            <Field name="content" label="Content" type="TextArea" />
        </Form>
    </Page>
);
export default AskPage;
