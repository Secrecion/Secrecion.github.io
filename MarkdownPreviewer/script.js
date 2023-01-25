marked.setOptions({
    breaks: true
})

const renderer = new marked.Renderer();

const initialState=`# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:
[links](https://www.freecodecamp.org)
Heres some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\` && lastLine == \`\`\`') {
    return multiLineCode;
    }
}
\`\`\`
> Block Quotes!
1. And there are **numbered** lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:
![Atheism Logo](https://img.freepik.com/free-vector/gradient-atheism-logo-template_23-2149245197.jpg?w=360)
`


function App() {
    /*a header (H1 size), a sub header (H2 size), a link, inline code, a code block, a list item, a blockquote, an image, and bolded text*/
    

    const [text, setText] = React.useState(initialState);
    console.log(text);

    return (
        <div className="text-center px-4 body">
            <h1 className="p-4">My Markdown Previewer</h1>
            <textarea name="text" id="editor" rows="10" value={text} onChange={(e) => setText(e.target.value)} className="textarea"></textarea>
            <h3 className="mt-3">Output</h3>
            <Preview markdown={text} />
        </div>
    )
}
function Preview({ markdown }) {
    return (
        <div
            dangerouslySetInnerHTML={{
                __html: marked(markdown, { renderer: renderer }),
            }}
            id="preview"></div>
    )
}




ReactDOM.render(<App />, document.getElementById('root'))