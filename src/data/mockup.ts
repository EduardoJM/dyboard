import { ElementsCollection } from './board';

const testElements: ElementsCollection = [
    {
        id: 'el1',
        type: 'text',
        width: 300,
        height: 120,
        left: 20,
        top: 50,
        text: 'This is my own text!! And this is an math support $x^2+2xy+cx=0$.',
        supportLatex: true,
        markdown: false
    },
    {
        id: 'el2',
        type: 'text',
        width: 300,
        height: 120,
        left: 150,
        top: 120,
        text: 'This is my second text.',
        supportLatex: true,
        markdown: false
    }
];

export default testElements;
