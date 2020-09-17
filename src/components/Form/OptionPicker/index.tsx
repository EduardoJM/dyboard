import React, { useRef, useEffect, useState } from 'react';
import Select, { ValueType } from 'react-select';
import { useField } from '@unform/core';

import Container from './styles';

import { useTheme } from '../../../contexts/theme';

interface OptionPickerItem {
    label: string;
    value: string;
}

interface OptionPickerProps {
    name: string;
    text: string;
    options: OptionPickerItem[];
    initialValue: string;
    onChange?: (value: string) => void;
}

const OptionPicker: React.FC<OptionPickerProps> = ({
    name,
    text,
    options,
    initialValue,
    onChange
}) => {
    const selectRef = useRef<Select>(null);
    const { fieldName, registerField } = useField(name);
    const [value, setValue] = useState<OptionPickerItem>(options.filter((item) => {
        return item.value === initialValue;
    })[0]);
    const theme = useTheme();

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref: Select) => {
                if (!ref.state.value) {
                    return '';
                }
                const retVal = (ref.state.value as OptionPickerItem).value;
                return retVal;
            },
            setValue: (ref: Select, value: string) => {
                setValue(options.filter((item) => item.value === value)[0]);
            }
        });
    }, [fieldName, registerField]);

    function handleSelectChange(v: ValueType<{
        label: string;
        value: string;
    }>) {
        setValue(v as OptionPickerItem);
        if (onChange) {
            onChange((v as { value: string; }).value);
        }
    }

    return (
        <Container>
            <label>{text}</label>
            <Select
                options={options}
                theme={(selectTheme) => ({
                    ...selectTheme,
                    borderRadius: 0,
                    colors: {
                        ...selectTheme.colors,
                        neutral0: theme.selectNeutral0,
                        neutral5: theme.selectNeutral5,
                        neutral10: theme.selectNeutral10,
                        neutral20: theme.selectNeutral20,
                        neutral30: theme.selectNeutral30,
                        neutral40: theme.selectNeutral40,
                        neutral50: theme.selectNeutral50,
                        neutral60: theme.selectNeutral60,
                        neutral70: theme.selectNeutral70,
                        neutral80: theme.selectNeutral80,
                        neutral90: theme.selectNeutral90,
                        primary: theme.selectPrimary,
                        primary25: theme.selectPrimary25,
                        primary50: theme.selectPrimary50,
                        primary75: theme.selectPrimary75,
                        danger: theme.selectDanger,
                        dangerLight: theme.selectDangerLight
                    }
                })}
                ref={selectRef}
                onChange={handleSelectChange}
                classNamePrefix="react-select"
                value={value}
            />
        </Container>
    );
};

export default OptionPicker;
