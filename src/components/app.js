import React, {Component, Fragment} from 'react';
import AceEditor from 'react-ace';
import html2canvas from 'html2canvas';
import gifshot from 'gifshot';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            code: '',
            selectValue: 0.3
        };
    }

    getGif = () =>{
        const { images, selectValue } = this.state;
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
                fontSize: '30px',
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
        if(obj.lines[0] === ' ') {
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

	render () {
        const { imageSrc, selectValue, code } = this.state;

        const buttonStyle = {
            backgroundColor: '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            marginBottom: '20px',
            marginRight: '20px'
        }
		return (
            <Fragment>
                <div>
                    <button className="button" onClick={this.getGif} style={buttonStyle}>Get gifs</button>
                    <select onChange={this.onSelectChange} value={selectValue}>
                        <option value={0.1}>0.1s</option>
                        <option value={0.2}>0.2s</option>
                        <option value={0.3}>0.3s</option>
                        <option value={0.4}>0.4s</option>
                        <option value={0.5}>0.5s</option>
                    </select>
                </div>
                <div id="capture">
                    <AceEditor
                        mode="java"
                        theme="monokai"
                        value={code}
                        onChange={this.updateCode}
                        name="UNIQUE_ID_OF_DIV"
                        fontSize={30}
                        width="100%"
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
                {imageSrc && (
                    <Fragment>
                        <img src={imageSrc} style={{width: '100%'}}/>
                        <a href={imageSrc} download="snippet.gif">Download</a>
                    </Fragment>
                )}
            </Fragment>
		);
	}
}
