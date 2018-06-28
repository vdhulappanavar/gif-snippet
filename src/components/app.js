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

    // createGifForPastedCode = (text) => {
    //     console.log(text)
    //     text = text.text
    //     console.log("in createGifForPastedCode")
    //     // const canvas1 = this.refs.canvas
    //     // const ctx1 = canvas1.getContext("2d")
    //     // ctx1.font = "40px Courier"
    //     // ctx1.fillText(text, 210, 75)
    //     var splits = text.split('');
    //     for(let index=0; index<splits.length; index++){
    //         const token = splits[index]
    //         if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
    //             const textToAdd = text.slice(0, index) + index
    //             // const textToAdd = index  + "  "            
    //             const canvas = this.refs.canvas
    //             const ctx = canvas.getContext("2d")
    //             ctx.font = "40px Courier"
    //             // ctx.height = this.editorHeight
    //             // ctx.width = this.editorWidth
    //             ctx.fillText(textToAdd, 210, 75)
    //             // this.gif.addFrame(canvas, {copy: true});
    //             const canavasWithData = this.refs.canvas
    //             const cnavasDocument = document.getElementById("canavs")
    //             const canavasWithDataContext = canavasWithData.getContext("2d")
                
    //             console.log("-------")
    //             console.log(canavasWithData)
    //             console.log(cnavasDocument)
    //             console.log(canavasWithDataContext)
    //             console.log("-------")   
    //             this.gif.addFrame(canavasWithDataContext, {copy: true});             
    //             // this.gif.addFrame(canavasWithData)
    //             // this.gif.addFrame(cnavasDocument) 
    //             // this.gif.addFrame(ctx, {copy: true});
    //             // this.gif.addFrame(ctx.getImageData(0, 0, this.editorWidth, this.editorHeight), {copy: true});
    //             // break;
    //         }
            
    //     }

    //     // const img = this.refs.image
    //     // img.onload = () => {
    //     //     console.log("canavas img loaded")
    //     // ctx.drawImage(img, 0, 0)
    //     // ctx.font = "40px Courier"
    //     // ctx.fillText(this.props.text, 210, 75)
    //     // }

    // }

    // createGifForPastedCode = (text) => {
    //     console.log(text)
    //     text = text.text
    //     console.log("in createGifForPastedCode")
    //     var splits = text.split('');
    //     for(let index=0; index<splits.length; index++){
    //         const token = splits[index]
    //         if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
    //             const textToAdd = text.slice(0, index) + index
    //             // const textToAdd = index  + "  "            
    //             var canavas = document.createElement('canavas')  
    //             canavas.setAttribute("id", "canavas"+index)
    //             const canavasList = (this.state.canavasList)? this.state.canavasList : []
    //             canavasList.push(canavas)
    //             this.setState({
    //                 canavasList : canavasList,
    //                 code: text
    //             })
    //             let toInsertDataCanavs;
    //             // while(!document.getElementById("canvas"+index)){
    //             //     toInsertDataCanavs = document.getElementById("canvas"+index)
    //             // }
    //             // console.log("@@@@")
    //             // console.log(toInsertDataCanavs)
    //             // // const textToAdd = text.slice(0, index) + index
    //             // const ctxOfCanavasFrame = toInsertDataCanavs.getContext("2d")
    //             // ctxOfCanavasFrame.font = "40px Courier"
    //             // ctxOfCanavasFrame.fillText(textToAdd, 210, 75)

    //         }
            
    //     }

    // }

    // createGifForPastedCode = (text) => {
    //     const { theme, mode } = this.state;        
    //     let codeSnippetNumber = 0
    //     console.log(text)
    //     text = text.text
    //     console.log("in createGifForPastedCode")
    //     var splits = text.split('');
    //     for(let index=0; index<splits.length; index++){
    //         const token = splits[index]
    //         if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
    //             const textToAdd = text.slice(0, index)
    //             // const textToAdd = index  + "  "            
    //             // var canavas = document.createElement('canavas')  
    //             // canavas.setAttribute("id", "canavas"+index)
    //             const canavasList = (this.state.canavasList)? this.state.canavasList : []
    //             canavasList.push(<div id={`codeSnippet${codeSnippetNumber++}`}><AceEditor
    //                 mode={mode}
    //                 theme={theme}
    //                 value={textToAdd}
    //                 name={`UNIQUE_ID_OF_DIV${index}`}
    //                 fontSize={30}
    //                 className="aceEditor"
    //                 width={`${this.editorWidth}px`}
    //                 height={`${this.editorHeight}px`}
    //                 editorProps={{$blockScrolling: true}}
    //                 setOptions={{
    //                     enableBasicAutocompletion: true,
    //                     enableLiveAutocompletion: true,
    //                     enableSnippets: false,
    //                     showLineNumbers: true,
    //                     tabSize: 2,
    //                     wrapBehavioursEnabled: true,
    //                     wrap: true,
    //                     useSoftTabs: true
    //                 }}
    //                 editorProps={{$blockScrolling: true}}
    //             /></div>)
    //             this.setState({
    //                 canavasList : canavasList
    //             })

    //         }
            
    //     }
    //     for(let codeSnippetIndex=0; codeSnippetIndex<codeSnippetNumber; codeSnippetIndex                              ++){
    //         const node = document.getElementById(`codeSnippet${codeSnippetIndex}`)
    //         domtoimage.toCanvas(node)
    //         .then((canvas) => {
    //             // const dataURL = canvas.toDataURL()
    //             // const toAddFrame = (this.state.canvasFrameImgUrl)? [...this.state.canvasFrameImgUrl] : []
    //             // toAddFrame.push(dataURL)
    //             // console.log(dataURL)
    //             // console.log(toAddFrame)
    //             // this.setState({canvasFrameImgUrl : toAddFrame})
    //             this.gif.addFrame(canvas);
    //         })
    //         .catch(function (error) {
                
    //         });
    //     }

    // }

    // createGifForPastedCode = (text) => {
    //     const { theme, mode } = this.state;        
    //     let codeSnippetNumber = 0
    //     console.log(text)
    //     text = text.text
    //     console.log("in createGifForPastedCode")
    //     var splits = text.split('');
    //     for(let index=0; index<splits.length; index++){
    //         const token = splits[index]
    //         if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
    //             const textToAdd = text.slice(0, index)
    //             console.log(textToAdd)
    //             // let partialCodeFrame = Object.assign({}, editorObj )
    //             const partialCodeFrame = (<div id={`codeSnippet${codeSnippetNumber++}`}>
    //                 <AceEditor
    //                     mode={mode}
    //                     theme={theme}
    //                     value={textToAdd}
    //                     name={`UNIQUE_ID_OF_DIV`}
    //                     fontSize={30}
    //                     className="aceEditor"
    //                     width={`${this.editorWidth}px`}
    //                     height={`${this.editorHeight}px`}
    //                     editorProps={{$blockScrolling: true}}
    //                     setOptions={{
    //                         enableBasicAutocompletion: true,
    //                         enableLiveAutocompletion: true,
    //                         enableSnippets: false,
    //                         showLineNumbers: true,
    //                         tabSize: 2,
    //                         wrapBehavioursEnabled: true,
    //                         wrap: true,
    //                         useSoftTabs: true
    //                     }}
    //                     editorProps={{$blockScrolling: true}}
    //                 />
    //             </div>)
    //             console.log(partialCodeFrame)
    //             console.log(partialCodeFrame instanceof HTMLElement)
    //             domtoimage.toCanvas(partialCodeFrame)
    //                 .then((canvas) => {
    //                     this.gif.addFrame(canvas);
    //                 })
    //                 .catch(function (error) {
                        
    //                 });       
    //         }
    //     }

    // }

    createGifForPastedCode = (text) => {
        const { theme, mode } = this.state;        
        let codeSnippetNumber = 0
        console.log(text)
        text = text.text
        console.log("in createGifForPastedCode")
        var splits = text.split('');

        const basicDom = document.getElementById("codeSnippet")
        console.log(basicDom)

        domtoimage.toCanvas(basicDom)
            .then((canvas) => {
                console.log(canvas) 
                const ctxOriginalCanavas = canvas.getContext('2d')
                ctxOriginalCanavas.font = "40px Courier"
                ctxOriginalCanavas.fillText("hey", 210, 75)                
                const checkOutput = this.refs.checkOutput
                checkOutput.appendChild(canvas)
                
                // this.gif.addFrame(canvas);
            })
            .catch(function (error) {
                console.log("something went wrong ", error)
            });  
        // function newCanvas(domNode) {
        //     console.log("in newCanavs")
        //     console.log(domNode.width)
        //     let canvas = document.createElement('canvas');
        //     console.log(canvas)
        //     // console.log(document.createElement('canvas'))
        //     // canvas.width = options.width || util.width(domNode);
        //     // canvas.height = options.height || util.height(domNode);
        //     canvas.width = domNode.width
        //     canvas.height = domNode.height
        //     console.log(canvas)
        //     console.log(canvas)

        //     return canvas;
        // }
        

    }


    render() {
        const { imageSrc, code, theme, mode } = this.state;        
        return(
        <div>
            <div ref="checkOutput" id="checkOutput"> 
            </div>
            <canvas ref="checkNewCanavas" width={640} height={425} />
            {/* <canvas ref="myCanvas" width={640} height={425} />             */}
            {/* <canvas ref="canvas" id="canavs" width={640} height={425} /> */}
            <div id="capture">
                <AceEditor
                    mode={mode}
                    theme={theme}
                    value={code}
                    onPaste={(newCode, obj) => { this.onPasteChange = true; this.createGifForPastedCode(newCode, obj)}}
                    onChange={ (newCode, obj) => {this.updateCode (newCode, obj, this.onPasteChange)}}                                    
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
            <button onClick={this.getGif}>GET GIF</button>
            {imageSrc && (
                            <div className="subContainer__outputContainer">
                                <a className="subContainer__button" href={imageSrc} download="snippet.gif">Download</a>
                                <img className="subContainer__outputContainer__img" src={imageSrc}  ref={(element) => { this.outputContainer = element; }}/>
                            </div>
                        )}
            <div id={`codeSnippet`}>
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
            {/* <img style={{display: "none"}} ref="image" src={`https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg`} className="hidden" /> */}
            {/* <hr/>
            {
                this.state.canavasList && 
                this.state.canavasList.map(obj => {
                    console.log(obj)
                    return(
                    <div>
                        {obj}
                    </div>
                ) })
            } */}
        </div>
        )
    }
}
