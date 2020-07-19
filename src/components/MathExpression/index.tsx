import React from 'react';
import Draggable from 'react-draggable';

import Latex from '../Latex';

const MathExpression: React.FC = () => {
    const str = 'F(x)=\\int f(x)dx';
    return (
        <Draggable>
            <div className="no-select draggable-element">
                <Latex displayMode={true}>{str}</Latex>
            </div>
        </Draggable>
    );
};

export default MathExpression;
