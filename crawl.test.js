const {normalizeURL}= require('./crawl')
const {test, expect}=require('@jest/globals')

test('normalizeURL strip protocol', ()=>{
    const input='https://blog.boot.dev/path';
    const actual=normalizeURL(input);
    const expedted='blog.boot.dev/path';
    expect(actual).toEqual(expedted);
})                  

test('normalizeURL strip trailing slash', ()=>{
    const input='https://blog.boot.dev/path/';
    const actual=normalizeURL(input);
    const expedted='blog.boot.dev/path';
    expect(actual).toEqual(expedted);
})     

test('normalizeURL capitals', ()=>{
    const input='https://BLOG.boot.dev/path/';
    const actual=normalizeURL(input);
    const expedted='blog.boot.dev/path';
    expect(actual).toEqual(expedted);
})    

test('normalizeURL http', ()=>{
    const input='http://blog.boot.dev/path/';
    const actual=normalizeURL(input);
    const expedted='blog.boot.dev/path';
    expect(actual).toEqual(expedted);
})      