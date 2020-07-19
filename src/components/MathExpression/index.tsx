import React from 'react';
import Draggable from 'react-draggable';

import Latex from '../Latex';

const MathExpression: React.FC = () => {
    const str = 'F(x)=\\int f(x)dx';
    return (
        <Draggable>
            <div>
                <Latex displayMode={true}>{str}</Latex>
            </div>
        </Draggable>
    );
};

export default MathExpression;
