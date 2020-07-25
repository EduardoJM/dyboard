import React from 'react';
import useMeasure from 'react-use-measure';

import { Container, PlotsList, PlotsConfig } from './styles';

const PlotConfigurator: React.FC = () => {
    const [contentRef, bounds] = useMeasure();

    return (
        <Container ref={contentRef}>
            <PlotsList
                height={200}
                width={bounds.width}
                axis="y"
                minConstraints={[200, 100]}
                maxConstraints={[200, 400]}
            />
            <PlotsConfig />
        </Container>
    );
};

export default PlotConfigurator;
