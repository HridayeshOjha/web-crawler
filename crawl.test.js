const {normalizeURL,getURLsFromHTML}= require('./crawl')
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

test('getURLsFromHTML absolute', ()=>{
    const inputHTMLBody=`
    <html
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;

    const inputBaseURL='https://blog.boot.dev';
    const actual=getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expedted=['https://blog.boot.dev/'];
    expect(actual).toEqual(expedted);
})   

test('getURLsFromHTML relative', ()=>{
    const inputHTMLBody=`
    <html
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;

    const inputBaseURL='https://blog.boot.dev';
    const actual=getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expedted=['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expedted);
})  

test('getURLsFromHTML both', ()=>{
    const inputHTMLBody=`
    <html
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog path one
            </a>
            <a href="/path2/">
                Boot.dev Blog path two
            </a>
        </body>
    </html>
    `;

    const inputBaseURL='https://blog.boot.dev';
    const actual=getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expedted=['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/'];
    expect(actual).toEqual(expedted);
})  

test('getURLsFromHTML invalid', ()=>{
    const inputHTMLBody=`
    <html
        <body>
            <a href="invalid">
                invalid url
            </a>
        </body>
    </html>
    `;

    const inputBaseURL='https://blog.boot.dev';
    const actual=getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expedted=[];
    expect(actual).toEqual(expedted);
})  