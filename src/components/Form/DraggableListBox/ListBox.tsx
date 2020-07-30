import React from 'react';

import Scrollbars from '../../Scrollbars';

const ListBox: React.FC = ({ children }) => {
    return (
        <Scrollbars>
            { children }
        </Scrollbars>
    );
};

export default ListBox;
