import { RenderItem } from 'jplot';

export interface PlotConfiguratorPanelProps {
    item: RenderItem;
    getUpdateItemIndex: () => number;
    updateItem: (idx: number) => void;
}
