import React, {Component, Fragment} from 'react';
import AceEditor from 'react-ace';
import html2canvas from 'html2canvas';
import gifshot from 'gifshot';
import scrollToComponent from 'react-scroll-to-component';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            code: '',
            selectValue: 1
        };

        this.convertToGif = false;
    }

    getGif = () =>{
        const { images, selectValue } = this.state;
        this.convertToGif = true;
        html2canvas(document.querySelector("#capture")).then(canvas => {
            const img = canvas.toDataURL("image/png");
            images.push(img);
            gifshot.createGIF({
                gifWidth: 2048,
                gifHeight: 1536,
                images: images,
                interval: selectValue,
                numFrames: 10,
                frameDuration: 1,
                fontWeight: 'normal',
                fontSize: '20px',
                fontFamily: 'sans-serif',
                fontColor: '#ffffff',
                textAlign: 'center',
                textBaseline: 'bottom',
                sampleInterval: 10,
                numWorkers: 2
            }, (obj) => {
                const { error, image } = obj;
                if (!error) {
                    this.setState({
                        images,
                        imageSrc: image,
                    });
                }
            });
        });
    }

    updateCode = (newCode, obj) => {
        const { images } = this.state;        
        if(String(obj.lines[0]).trim().length === 0 || obj.lines[0] === '.' || obj.lines[0] === ',' || obj.lines[0] === ';') {        
            html2canvas(document.querySelector("#capture")).then(canvas => {
                const img = canvas.toDataURL("image/png");
                images.push(img);
                this.setState({
                    images,
                    code: newCode
                });
            });
        }
    }

    getNewArrayInString = async (newarr) => {
        this.setState({
            code: newarr.join(' ')
        });
        const canvas = await html2canvas(document.querySelector("#capture"));
        const img = await canvas.toDataURL("image/png");
        return img;
    }

    onPaste = async (newCode) => {
        const newarr=[];
        const { images } = this.state;
        const codeSplitedArray = newCode.text.split(" ").map(String);
        for (let i = 0; i <= codeSplitedArray.length; i++ ) {
            newarr.push(codeSplitedArray[i]);
            if(i % (codeSplitedArray.length / 10) === 0) {
                const img = await this.getNewArrayInString(newarr);
                await images.push(img);
                this.setState({
                    images
                });
            }
        };
    }

    onSelectChange = (e) => {
        this.setState({
            selectValue:e.target.value
        })
    }

    componentDidUpdate(){
        if(this.state.imageSrc && this.convertToGif === true){
            scrollToComponent(this.outputContainer);
            this.convertToGif =  false;
        }
        
    }

	render () {
        const { imageSrc, selectValue, code } = this.state;
        
        
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
                                <button className="subContainer__button" onClick={this.getGif} >Get gifs</button>
                            </div>
                            <div id="capture" className="subContainer__inputTextArea">
                                <AceEditor
                                    mode="java"
                                    theme="monokai"
                                    value={code}
                                    onChange={this.updateCode}
                                    name="UNIQUE_ID_OF_DIV"
                                    fontSize={30}
                                    focus={true}
                                    className="aceEditor"
                                    width="80%"
                                    height="350px"
                                    editorProps={{$blockScrolling: true}}
                                    setOptions={{
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: false,
                                        showLineNumbers: true,
                                        tabSize: 2,
                                    }}
                                    onPaste={this.onPaste}
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
