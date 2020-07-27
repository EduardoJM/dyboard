import { SpaceDrawner } from './index';

export default interface DrawnerBase {
    initialize: (sd: SpaceDrawner) => void;

    end: () => void;

    render: () => void;
}
