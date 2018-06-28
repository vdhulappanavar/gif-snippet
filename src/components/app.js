import React, {Component, Fragment} from 'react';
import AceEditor from 'react-ace';;

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

export default class App extends Component {

    constructor(props){
        super(props)
        this.editorHeight = window.screen.height * 0.6,
        this.editorWidth = window.screen.width * 0.8
        this.state = {
            code: '',
            mode: 'javascript',
            theme: 'monokai',
            fontSize: 30,
            canavasList: null
        };
        this.gif = new GIF({
            workers: 2,
            quality: 10,
            repeat: props.repeat || 0,
            quality: props.quality || 10
        });
    }

    getGif = () => {
        domtoimage.toCanvas(document.querySelector("#capture"))
        .then(async(canvas) => {
            this.gif.addFrame(canvas);
            this.gif.on('finished', (blob) => {
                const image = URL.createObjectURL(blob);
                this.setState({
                    imageSrc: image
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
            
        });
        
    }

    updateCode = () => {
        console.log("in updateCode")
    }

    createGifForPastedCode = (text) => {
        const { theme, mode, fontSize } = this.state;        
        let codeSnippetNumber = 0
        console.log(text)
        text = text.text
        console.log("in createGifForPastedCode")
        var splits = text.split('');

        const basicDom = document.getElementById("codeSnippet")
        basicDom.style.display = "block"
        console.log(basicDom)

        domtoimage.toCanvas(basicDom)
            .then((canvas) => {
                basicDom.style.display = "none"
                // console.log(canvas) 
                // const ctxOriginalCanavas = canvas.getContext('2d')
                // ctxOriginalCanavas.font = "40px Courier"
                // ctxOriginalCanavas.fillStyle = "#ffffff";
                // ctxOriginalCanavas.fillText("hey", 210, 30)                
                // const checkOutput = this.refs.checkOutput
                // checkOutput.appendChild(canvas)
                // this.gif.addFrame(canvas);
                // const addNewTextCanavs = cloneCanvas(canvas)
                // const ctxaddNewTextCanavs = addNewTextCanavs.getContext('2d')
                // ctxaddNewTextCanavs.font = "100px Courier"
                // ctxaddNewTextCanavs.fillStyle = "#ff0000";
                // ctxaddNewTextCanavs.fillText("hey111", 210, 100)                
                // // const checkOutput = this.refs.checkOutput
                // checkOutput.appendChild(addNewTextCanavs)
                // this.gif.addFrame(addNewTextCanavs);
                // this.gif.addFrame(canvas);
                

                // const checkOutput = this.refs.checkOutput
                for(let index=0; index<splits.length; index++){
                    const token = splits[index]
                    if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
                        const textToAdd = text.slice(0, index)
                        const addNewTextCanavs = cloneCanvas(canvas)
                        const ctxaddNewTextCanavs = addNewTextCanavs.getContext('2d')
                        ctxaddNewTextCanavs.font = `${fontSize}px Courier`
                        ctxaddNewTextCanavs.fillStyle = "#ffffff";
                        ctxaddNewTextCanavs.fillText(textToAdd, 210, 30)
                        // checkOutput.appendChild(addNewTextCanavs)
                        this.gif.addFrame(addNewTextCanavs);
                    }
                }
            })
            .catch(function (error) {
                console.log("something went wrong ", error)
            });  

            function cloneCanvas(oldCanvas) {
                var newCanvas = document.createElement('canvas');
                var context = newCanvas.getContext('2d');
                newCanvas.width = oldCanvas.width;
                newCanvas.height = oldCanvas.height;
                context.drawImage(oldCanvas, 0, 0);
                return newCanvas;
            }
    }


    render() {
        const { imageSrc, code, theme, mode, fontSize } = this.state;        
        return(
        <div>
            <div ref="checkOutput" id="checkOutput"> 
            </div>
            <div id="capture">
                <AceEditor
                    mode={mode}
                    theme={theme}
                    value={code}
                    onPaste={(newCode, obj) => { this.onPasteChange = true; this.createGifForPastedCode(newCode, obj)}}
                    onChange={ (newCode, obj) => {this.updateCode (newCode, obj, this.onPasteChange)}}                                    
                    name="UNIQUE_ID_OF_DIV"
                    fontSize={fontSize}
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
            <button onClick={this.getGif}>GET GIF</button>
            {imageSrc && (
                            <div className="subContainer__outputContainer">
                                <a className="subContainer__button" href={imageSrc} download="snippet.gif">Download</a>
                                <img className="subContainer__outputContainer__img" src={imageSrc}  ref={(element) => { this.outputContainer = element; }}/>
                            </div>
                        )}
            <div>
                <div id={`codeSnippet`} style={{display: "none"}}>
                    <AceEditor
                        mode={mode}
                        theme={theme}
                        value={''}
                        name={`UNIQUE_ID_OF_DIV`}
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
                    />
                </div>
            </div>
        </div>
        )
    }
}
