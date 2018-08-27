import React, {Component, Fragment} from 'react';
import AceEditor from 'react-ace';
import ReactDOMServer from 'react-dom/server';

import domtoimage from '../utils/domToCanvas';

import "brace/ext/language_tools";
import "brace/ext/searchbox";
import "brace/keybinding/vim";

import "brace/mode/css";
import "brace/mode/javascript";
import "brace/mode/less";
import "brace/mode/html";
import "brace/snippets/css";
import "brace/snippets/less";
import "brace/snippets/html";

import "brace/theme/github";
import "brace/theme/monokai";
import "brace/theme/tomorrow";
import "brace/theme/kuroir";
import "brace/theme/twilight";
import "brace/theme/xcode";
import "brace/theme/textmate";
import "brace/theme/solarized_dark";
import "brace/theme/terminal";
import "brace/theme/solarized_light";

const uuid = require('uuidv4');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            mode: 'javascript',
            theme: 'monokai',
            subDOM : []
        };
        this.typedCode = ''
        this.gif = new GIF({
            workers: 2,
            quality: 10,
            repeat: props.repeat || 0,
            quality: props.quality || 10
        });
        this.editorHeight = window.screen.height * 0.6,
        this.editorWidth = window.screen.width * 0.8
        this.onPasteChange = false
    }

    getGif = () => {
        domtoimage.toCanvas(document.querySelector("#capture"))
        .then(async(canvas) => {
            this.gif.addFrame(canvas);
            this.gif.on('finished', (blob) => {
                const image = URL.createObjectURL(blob);
                this.setState({
                    imageSrc: image,
                    code: this.typedCode
                });
            });
            this.gif.render();
            while(!document.querySelector(".subContainer__outputContainer")) {
                await new Promise(r => setTimeout(r, 500));
            }
            const scrollIntoViewElement = document.querySelector(".subContainer__outputContainer");
            scrollIntoViewElement.scrollIntoView({ block: 'end',  behavior: 'smooth' });
        })
        .catch((error) => {
            console.error('oops, something went wrong!', error);
        });
    }

    onModeChange = (e) => {
        const { value } = e.target;
        this.setState({ mode: value });
      }

    onThemeChange = (e) => {
        const { value } = e.target;
        this.setState({ theme: value });
    }

    updateCode = async (newCode, obj) => {
        if(this.onPasteChange)
            return
        const node = document.querySelector("#capture");
        const { lines, start, end, action } = obj;
        if(((String(lines[0]).trim().length === 0) || (lines[0] === '.') || (lines[0] === ',') || (obj.lines[0] === ';'))) {
            domtoimage.toCanvas(node)
            .then((canvas) => {
                this.gif.addFrame(canvas);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        }
        this.typedCode = newCode
        // this.setState({
        //     typedCode: this.state.code+newCode
        // });
    }

    processPastedCode = (text) => {
        const startime = new Date()
        // this.setState({code: "hola"})
        this.onPasteChange = true
        text = text.text
        setTimeout(() => { this.onPasteChange = false})
        setTimeout(() => this.genrateSubFrames(text))
        console.log("hey")
        return
    }
    
    genrateSubFrames = async (text) => {
        const PreviousCodeSnippetcode = this.typedCode
        this.typedCode = this.typedCode + text
        const { theme, mode } = this.state;
        const splits = text.split('');
        for(let index=0; index<splits.length; index++){
            const token = splits[index]
            if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
                const textToAdd = PreviousCodeSnippetcode + text.slice(0, index)
                // const id = index.toString()
                const id = uuid()
                const subnode = (<div id={id} >
                <AceEditor
                    mode={mode}
                    theme={theme}
                    value={textToAdd}
                    name={'UNIQUE_ID'}
                    fontSize={30}
                    className="aceEditor"
                    width={`${this.editorWidth}px`}
                    height={`${this.editorHeight}px`}
                    editorProps={{$blockScrolling: true}}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                        wrapBehavioursEnabled: true,
                        wrap: true,
                        useSoftTabs: true
                    }}
                    editorProps={{$blockScrolling: true}}
                /></div>)
                // subContainers.appendChild(subnode)
                // console.log('subNode')
                // console.log(subnode)
                // console.log(typeof subnode)
                // console.log("renderToStaticMarkup")
                // console.log(ReactDOMServer.renderToString())
                // console.log("------------")
                // console.log(ReactDOMServer.renderToStaticMarkup(subnode))
                // console.log("**********")
                // this.setState({ code:  this.typedCode, subDOM : [...this.state.subDOM, subnode]})
                // const subConatinerDOM = document.getElementById(id)
                // console.log("subContainerDOM")
                // console.log(subConatinerDOM)
                // console.log(typeof subConatinerDOM)
                // subConatinerDOM.style.display = "block"
                const ReactDOMtoDOMObect  = ReactDOMServer.renderToStaticMarkup(subnode)
                console.log(ReactDOMtoDOMObect)
                domtoimage.toCanvas(ReactDOMtoDOMObect)
                .then((canvas) => {
                    console.log("canvas")
                    console.log(canvas)
                    // subConatinerDOM.style.display = "none"
                    this.gif.addFrame(canvas);
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
            }
        }
    }

    onSelectChange = (e) => {
        this.setState({
            selectValue:e.target.value
        })
    }

	render () {
        const { imageSrc, selectValue, code, theme, mode } = this.state;

		return (
                <div className="container">
                    <h1 className="container__header">Gif Snippet</h1>
                    <div className="subContainer">
                        <div className = "subContainer__inputContainer">
                            <div className="subContainer__customizeOptions">
                                <select className="subContainer__customizeOptions__dropdown" onChange={this.onSelectChange} value={selectValue}>
                                    <option value={0.1}>0.1s</option>
                                    <option value={0.2}>0.2s</option>
                                    <option value={0.3}>0.3s</option>
                                    <option value={0.4}>0.4s</option>
                                    <option value={0.5}>0.5s</option>
                                </select>
                                <select
                                    style={{ paddingLeft: "15px", paddingRight: "11px" }}
                                    name={`${name}.codeEditorTheme`}
                                    placeholder="Theme"
                                    value={theme}
                                    onChange={this.onThemeChange}
                                    className="subContainer__customizeOptions__dropdown"
                                >
                                    <option value='github'>github</option>
                                    <option value='monokai'>monokai</option>
                                    <option value='tomorrow'>tomorrow</option>
                                </select>
                                <select
                                    style={{ paddingLeft: "15px", paddingRight: "11px" }}
                                    name={`${name}.codeEditorTheme`}
                                    placeholder="Theme"
                                    value={mode}
                                    onChange={this.onModeChange}
                                    className="subContainer__customizeOptions__dropdown"
                                >
                                    <option value='javascript'>javascript</option>
                                    <option value='css'>css</option>
                                    <option value='less'>less</option>
                                    <option value='html'>html</option>
                                </select>
                                <button className="subContainer__button" onClick={this.getGif} >Get gifs</button>
                            </div>
                            <div id="capture" className="subContainer__inputTextArea">
                                <AceEditor
                                    mode={mode}
                                    theme={theme}
                                    // value={`var ctx = canvas.getContext("2d");
                                    // ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
                                    // ctx.fillRect(100, 100, 200, 200);
                                    // ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
                                    // ctx.fillRect(150, 150, 200, 200);
                                    // ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
                                    // ctx.fillRect(200, 50, 200, 200);`}
                                    value={code}
                                    onPaste={this.processPastedCode}
                                    onChange={this.updateCode}
                                    name="UNIQUE_ID_OF_DIV"
                                    fontSize={30}
                                    focus={true}
                                    className="aceEditor"
                                    width={`${this.editorWidth}px`}
                                    height={`${this.editorHeight}px`}
                                    editorProps={{$blockScrolling: true}}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: false,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                        wrapBehavioursEnabled: true,
                                        wrap: true,
                                        useSoftTabs: true
                                    }}
                                    editorProps={{$blockScrolling: true}}
                                />
                            </div>
                        </div>
                        {imageSrc && (
                            <div className="subContainer__outputContainer">
                                <a className="subContainer__button" href={imageSrc} download="snippet.gif">Download</a>
                                <img className="subContainer__outputContainer__img" src={imageSrc}  ref={(element) => { this.outputContainer = element; }}/>
                            </div>
                        )}
                    </div>
                    <div id="subContainers" ref="subContainers"> 
                        {this.state.subDOM.map((obj, index) => <div id={index} key={index}>{obj}</div>)}
                    </div>
                </div>
		);
	}
}