import React, { CSSProperties } from 'react';

import { Container } from './styles';

const Scrollbars: React.FC = ({ children }) => {
    function handleRenderView(props: { style: CSSProperties | undefined; }) {
        const { style } = props;
        return (
            <div
                className="box"
                style={{
                    ...style,
                    padding: 10,
                    marginRight: -14,
                    marginBottom: -14
                }}
            />
        );
    }

    function handleRenderThumb(props: { style: CSSProperties | undefined; }) {
        const { style } = props;
        return (
            <div
                style={{
                    ...style,
                    background: 'rgba(255, 255, 255, 0.4)'
                }}
            />
        );
    }

    return (
        <Container
            renderView={handleRenderView}
            renderThumbVertical={handleRenderThumb}
            renderThumbHorizontal={handleRenderThumb}
            autoHide={true}
        >
            { children }
        </Container>
    );
};

export default Scrollbars;
