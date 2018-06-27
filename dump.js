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
    onPasteChange = false
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            mode: 'javascript',
            theme: 'monokai',
            testingInnerHTML : ``,
            canvasFrameImgUrl : null,
            AceEditorObjectList : null
        };
        this.gif = new GIF({
            workers: 2,
            quality: 10,
            repeat: props.repeat || 0,
            quality: props.quality || 10
        });
        this.editorHeight = window.screen.height * 0.6,
        this.editorWidth = window.screen.width * 0.8
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

    onModeChange = (e) => {
        const { value } = e.target;
        this.setState({ mode: value });
      }

    onThemeChange = (e) => {
        const { value } = e.target;
        this.setState({ theme: value });
    }

    updateCode = async (newCode, obj, onPasteChange) => {
        if(this.onPasteChange)
            return
        const node = document.querySelector("#capture");
        const { lines, start, end, action } = obj;
        if(((String(lines[0]).trim().length === 0) || (lines[0] === '.') || (lines[0] === ',') || (obj.lines[0] === ';'))) {
            const toAddAceObject = (this.state.AceEditorObjectList)? [...this.state.AceEditorObjectList] : []
            toAddAceObject.push(node)
            this.setState({AceEditorObjectList : toAddAceObject}) 
            domtoimage.toCanvas(node)
            .then((canvas) => {
                const dataURL = canvas.toDataURL()
                const toAddFrame = (this.state.canvasFrameImgUrl)? [...this.state.canvasFrameImgUrl] : []
                toAddFrame.push(dataURL)
                console.log(dataURL)
                console.log(toAddFrame)
                this.setState({canvasFrameImgUrl : toAddFrame})
                this.gif.addFrame(canvas);
            })
            .catch(function (error) {
                
            });
        }
        this.setState({
            code: newCode
        });
    }

    createGifForPastedCode = (text) => {
        const { imageSrc, selectValue, code, theme, mode } = this.state;
        //this.onPasteChange = false
        // const createCanavas = (<AceEditor
        //                         mode={mode}
        //                         theme={theme}
        //                         value={text.text}                                 
        //                         name="UNIQUE_ID_OF_DIV"
        //                         fontSize={30}
        //                         focus={true}
        //                         className="aceEditor"
        //                         width={`${this.editorWidth}px`}
        //                         height={`${this.editorHeight}px`}
        //                         editorProps={{$blockScrolling: true}}
        //                         setOptions={{
        //                             enableBasicAutocompletion: true,
        //                             enableLiveAutocompletion: true,
        //                             enableSnippets: false,
        //                             showLineNumbers: true,
        //                             tabSize: 2,
        //                             wrapBehavioursEnabled: true,
        //                             wrap: true,
        //                             useSoftTabs: true
        //                         }}
        //                         editorProps={{$blockScrolling: true}}
        //                     />)
        var splits = text.text.split('');            
        console.log(splits)
        for(let token in splits){
        for(let index=0; index<splits.length; index++){
            const token = splits[index]
            if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
                //const documentCanavas = document.getElementById("subContainer__inputTextArea__hiddenCanavas")
                //document.createElement()
                // const documentCanavas = (<AceEditor
                //     mode={mode}
                //     theme={theme}    
                //     value = {text.text.slice(0, index)}                       
                //     name="UNIQUE_ID_OF_DIV"
                //     fontSize={30}
                //     focus={true}
                //     className="aceEditor"
                //     width={`${this.editorWidth}px`}
                //     height={`${this.editorHeight}px`}
                //     editorProps={{$blockScrolling: true}}
                //     setOptions={{
                //         enableBasicAutocompletion: true,
                //         enableLiveAutocompletion: true,
                //         enableSnippets: false,
                //         showLineNumbers: true,
                //         tabSize: 2,
                //         wrapBehavioursEnabled: true,
                //         wrap: true,
                //         useSoftTabs: true
                //     }}
                //     editorProps={{$blockScrolling: true}}
                // />)
                // console.log(text.text.slice(0, index))
                // console.log(documentCanavas instanceof HTMLElement)
                // documentCanavas.value = text.text.slice(0, index)
                // documentCanavas.width = this.editorWidth
                // documentCanavas.height = this.editorHeight
                // documentCanavas.style.display = "block"
                // const toAddAceObject = (this.state.AceEditorObjectList)? [...this.state.AceEditorObjectList] : []
                // toAddAceObject.push(documentCanavas)
                // this.setState({AceEditorObjectList : toAddAceObject})                    
                // var c = document.createElement('canavas');

                // c.setAttribute()
                // console.log(c)
                console.log(text.text.slice(0, index))
                //var c = document.getElementById("myCanvas")
                const c = this.ref.myCanvas
                // c.setAttribute('width', 500)
                // c.setAttribute("height", 500)
                var ctx = c.getContext("2d");
                ctx.font = "30px Arial";
                ctx.fillText(text.text.slice(0, index), 10, 50);
                console.log(ctx)
                console.log(c)

                this.gif.addFrame(c);
                // domtoimage.toCanvas(documentCanavas, text.text.slice(0, index))
                // .then((canvas) => {                    
                //     const dataURL = canvas.toDataURL()
                //     const toAddFrame = (this.state.canvasFrameImgUrl)? [...this.state.canvasFrameImgUrl] : []
                //     toAddFrame.push(dataURL)
                //     // console.log(dataURL)
                //     //  ole.log(toAddFrame)
                //     // console.log(toAddFrame.length)
                //     // this.setState({canvasFrameImgUrl : toAddFrame})                    
                //     this.gif.addFrame(canvas);
                // })
                // .catch(function (error) {
                    
                // });
            }

        //     // this.setState({
        //     //     code: text.text
        //     // });
        }  
        
        // this.multipleCanavas(splits, 0, text)
        setTimeout(() => { this.onPasteChange = false} , 1000)
        
    }
}

    multipleCanavas = (arr, index, text) => {        
        const token = arr[index]
        if(arr.length === index)
            return
        if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
            const documentCanavas = document.getElementById("subContainer__inputTextArea__hiddenCanavas")
            documentCanavas.value = text.text.slice(0, index)
            documentCanavas.width = this.editorWidth
            documentCanavas.height = this.editorHeight
            documentCanavas.style.display = "block"            
            domtoimage.toCanvas(documentCanavas, text.text.slice(0, index))
            .then((canvas) => {
                this.gif.addFrame(canvas);
                this.multipleCanavas(arr, ++index, text)
            })
            .catch(function (error) {
                
            });        
            } else{
                this.multipleCanavas(arr, ++index, text)
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
                            <div id="subContainer__inputTextArea__hiddenCanavas" style={{display: "none"}}>
                                <AceEditor
                                    mode={mode}
                                    theme={theme}                                
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
                    <div style={{display: "none"}}>
                        <canvas ref="myCanvas" id="myCanvas" width={500} height={500}></canvas>
                    </div>
                    <hr/>
                    <div id="subContainer_testing" style={{color:"white"}}>
                        {this.state.testingInnerHTML}
                    </div>
                    <hr/>
                    {/* { this.state.canvasFrameImgUrl && 
                        this.state.canvasFrameImgUrl.map(imgURL => (
                            <img key={imgURL} src={imgURL} />
                        ))
                    } */}
                    {/* {
                        this.state.AceEditorObjectList &&
                        this.state.AceEditorObjectList.map(obj => 
                            <div>{obj}</div>
                        )
                    } */}
                </div>
		);
	}
// componentDidMount() {
//     const canvas = this.refs.canvas
//     const ctx = canvas.getContext("2d")
//     const img = this.refs.image
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0)
//       ctx.font = "40px Courier"
//       ctx.fillText(this.props.text, 210, 75)
//     }
//   }
//   render() {
//     return(
//       <div>
//         <canvas ref="canvas" width={640} height={425} />
//         <img ref="image" src={`https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg`} className="hidden" />
//       </div>
//     )
//   }

}


//___________________
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
    onPasteChange = false
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            mode: 'javascript',
            theme: 'monokai',
            testingInnerHTML : ``,
            canvasFrameImgUrl : null,
            AceEditorObjectList : null
        };
        this.gif = new GIF({
            workers: 2,
            quality: 10,
            repeat: props.repeat || 0,
            quality: props.quality || 10
        });
        this.editorHeight = window.screen.height * 0.6,
        this.editorWidth = window.screen.width * 0.8
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

    onModeChange = (e) => {
        const { value } = e.target;
        this.setState({ mode: value });
      }

    onThemeChange = (e) => {
        const { value } = e.target;
        this.setState({ theme: value });
    }

    updateCode = async (newCode, obj, onPasteChange) => {
        if(this.onPasteChange)
            return
        const node = document.querySelector("#capture");
        const { lines, start, end, action } = obj;
        if(((String(lines[0]).trim().length === 0) || (lines[0] === '.') || (lines[0] === ',') || (obj.lines[0] === ';'))) {
            const toAddAceObject = (this.state.AceEditorObjectList)? [...this.state.AceEditorObjectList] : []
            toAddAceObject.push(node)
            this.setState({AceEditorObjectList : toAddAceObject}) 
            domtoimage.toCanvas(node)
            .then((canvas) => {
                const dataURL = canvas.toDataURL()
                const toAddFrame = (this.state.canvasFrameImgUrl)? [...this.state.canvasFrameImgUrl] : []
                toAddFrame.push(dataURL)
                console.log(dataURL)
                console.log(toAddFrame)
                this.setState({canvasFrameImgUrl : toAddFrame})
                this.gif.addFrame(canvas);
            })
            .catch(function (error) {
                
            });
        }
        this.setState({
            code: newCode
        });
    }

    createGifForPastedCode = (text) => {
        console.log("in paste")
        const canvas = this.refs.myCanvas
        const ctx = canvas.getContext("2d")
        ctx.fillText("Big smile!", 10, 90);
        // const { imageSrc, selectValue, code, theme, mode } = this.state;
        // var splits = text.text.split('');            
        // console.log(splits)
        // for(let token in splits){
        // for(let index=0; index<splits.length; index++){
        //     const token = splits[index]
        //     if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
        //         // console.log(text.text.slice(0, index))
        //         // const c = this.refs.myCanvas
        //         // var ctx = c.getContext("2d");
        //         // ctx.font = "30px Arial";
        //         // ctx.fillText(text.text.slice(0, index), 10, 50);
                

        //             const canvas = this.refs.myCanvas
        //             const ctx = canvas.getContext("2d")
        //             const img = this.refs.image
        //             ctx.fillText("Big smile!", 10, 90);
        //             // img.onload = () => {
                    
        //             // ctx.drawImage(img, 0, 0)
        //             // ctx.font = "40px Courier"
        //             // ctx.fillText(this.props.text, 210, 75)
        //             // }
        //         console.log(ctx)
        //         console.log(canvas)

        //         this.gif.addFrame(canvas);
        //     }
        // }  
    //     setTimeout(() => { this.onPasteChange = false} , 1000)        
    // }
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
                            <div id="subContainer__inputTextArea__hiddenCanavas" style={{display: "none"}}>
                                <AceEditor
                                    mode={mode}
                                    theme={theme}                                
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
                    <div>
                        {/* <canvas ref="myCanvas" id="myCanvas" width={500} height={500}></canvas> */}
                        <canvas ref="myCanvas" width={640} height={425} />
                        <img style={{display: "none"}} ref="image" src={`https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg`} />
                     </div>
                </div>
		);
	}
// componentDidMount() {
//     const canvas = this.refs.canvas
//     const ctx = canvas.getContext("2d")
//     const img = this.refs.image
//     img.onload = () => {
//       ctx.drawImage(img, 0, 0)
//       ctx.font = "40px Courier"
//       ctx.fillText(this.props.text, 210, 75)
//     }
//   }
//   render() {
//     return(
//       <div>
//         <canvas ref="canvas" width={640} height={425} />
//         <img ref="image" src={`https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg`} className="hidden" />
//       </div>
//     )
//   }

}


//0-------------------------------------- Working Code

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

    componentDidMount() {
        const canvas = this.refs.myCanvas
        const ctx = canvas.getContext("2d")
        const img = this.refs.image
        img.onload = () => {
        ctx.drawImage(img, 0, 0)
        ctx.font = "40px Courier"
        ctx.fillText(this.props.text, 210, 75) 
        }
        // const canvas1 = this.refs.canvas
        // const ctx1 = canvas1.getContext("2d")
        // ctx1.font = "40px Courier"
        // ctx1.fillText("testing", 210, 75)
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
        
        // const canvas = this.refs.canvas
        // this.gif.addFrame(canvas);
        // this.gif.on('finished', (blob) => {
        //     const image = URL.createObjectURL(blob);
        //     this.setState({
        //         imageSrc: image
        //     });
        // });
        // this.gif.render();
        // const scrollIntoViewElement = document.querySelector(".subContainer__outputContainer");
        // scrollIntoViewElement.scrollIntoView({ block: 'end',  behavior: 'smooth' });

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

    createGifForPastedCode = (text) => {
        const { theme, mode } = this.state;        
        
        console.log(text)
        text = text.text
        console.log("in createGifForPastedCode")
        var splits = text.split('');
        for(let index=0; index<splits.length; index++){
            const token = splits[index]
            if(((String(token).trim().length === 0) || (token === '.') || (token === ',') || (token === ';'))) {
                const textToAdd = text.slice(0, index)
                // const textToAdd = index  + "  "            
                var canavas = document.createElement('canavas')  
                canavas.setAttribute("id", "canavas"+index)
                const canavasList = (this.state.canavasList)? this.state.canavasList : []
                canavasList.push(<AceEditor
                    mode={mode}
                    theme={theme}
                    value={textToAdd}
                    name={`UNIQUE_ID_OF_DIV${index}`}
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
                />)
                this.setState({
                    canavasList : canavasList
                })
                let toInsertDataCanavs;

            }
            
        }

    }

    render() {
        const { imageSrc, selectValue, code, theme, mode } = this.state;        
        return(
        <div>
            <canvas ref="myCanvas" width={640} height={425} />            
            <canvas ref="canvas" id="canavs" width={640} height={425} />
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
            <img style={{display: "none"}} ref="image" src={`https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg`} className="hidden" />
            <hr/>
            {
                this.state.canavasList && 
                this.state.canavasList.map(obj => {
                    console.log(obj)
                    return(
                    <div>
                        {obj}
                    </div>
                ) })
            }
        </div>
        )
    }
}

//------- ORIGINAL CODE
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
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            mode: 'javascript',
            theme: 'monokai',
        };
        this.gif = new GIF({
            workers: 2,
            quality: 10,
            repeat: props.repeat || 0,
            quality: props.quality || 10
        });
        this.editorHeight = window.screen.height * 0.6,
        this.editorWidth = window.screen.width * 0.8
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
        this.setState({
            code: newCode
        });
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
                                    value={code}
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
                </div>
		);
	}
}
