import React from 'react';
import Select, { ValueType } from 'react-select';

import Container from './styles';

import { useTheme } from '../../../contexts/theme';

interface OptionPickerProps {
    text: string;
    options: {
        label: string;
        value: string;
    }[];
    value: string;
    onChange: (value: string) => void;
}

const OptionPicker: React.FC<OptionPickerProps> = ({
    text,
    options,
    value,
    onChange
}) => {
    const theme = useTheme();

    function handleSelectChange(v: ValueType<{
        label: string;
        value: string;
    }>) {
        onChange((v as { value: string; }).value);
    }

    return (
        <Container>
            <label>{text}</label>
            <Select
                options={options}
                value={options.filter(opt => opt.value === value)[0]}
                onChange={handleSelectChange}
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
            />
        </Container>
    );
};

export default OptionPicker;
