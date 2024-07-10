import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limitSentences'
})
export class LimitSentencesPipe implements PipeTransform {
    transform(value: string, maxSentences: number = 100): string {
        if (!value) return '';

        const sentences = value.match(/[^\.!\?]+[\.!\?]+/g);
        if (sentences && sentences.length > maxSentences) {
            const truncatedSentences = sentences.slice(0, maxSentences);
            const lastSentence = truncatedSentences[truncatedSentences.length - 1].replace(/[\.!\?]+$/, '...');
            truncatedSentences[truncatedSentences.length - 1] = lastSentence;
            return truncatedSentences.join(' ');
        }
        return value;
    }
}
