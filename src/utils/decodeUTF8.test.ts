import { decoder } from './decoder';

test('decoder', () => {

    let testStrings: string[] = [
        "Easy Shepherd&#8217;s Pie", //right single quotation mark
        "That's the thing&#8212;I don't have a cat.", //em dash
        "I thought you got the kids &#8230;" //horizontal ellipsis
    ];

    console.log(testStrings.map(sentence => decoder(sentence)));

});

