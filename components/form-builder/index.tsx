import React from 'react';
import TextInputController from './TextInputController';
import { FormInputType } from '@/enums/form-input.enum';


const RenderFormElement = React.forwardRef((props: any, ref) => {
    const { formInputType, ...otherProps } = props;

    switch (formInputType) {
        case FormInputType.input:
            return <TextInputController {...otherProps} />;

        default:
            return null;
    }
});

export default RenderFormElement;
