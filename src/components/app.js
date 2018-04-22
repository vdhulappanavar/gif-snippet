import React, {Component, Fragment} from 'react';
import AceEditor from 'react-ace';
import html2canvas from 'html2canvas';
import gifshot from 'gifshot';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            code: ''
        };
    }

    getGif = () =>{
        const { images } = this.state;
        html2canvas(document.querySelector("#capture")).then(canvas => {
            const img = canvas.toDataURL("image/png");
            images.push(img);
            gifshot.createGIF({
                gifWidth: 800,
                gifHeight: 800,
                images: images,
                interval: 0.3,
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
        console.log(newCode);
        const { images } = this.state;
        if(obj.lines[0] === ' ') {
            html2canvas(document.querySelector("#capture")).then(canvas => {
                const img = canvas.toDataURL("image/png");
                images.push(img);
                console.log(images);
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
            console.log(newarr.join(' '));
            if(i % 10 === 0) {
                const img = await this.getNewArrayInString(newarr);
                await images.push(img);
                console.log(images);
                this.setState({
                    images
                });
            }
        };
    }

	render () {
        const { imageSrc } = this.state;
		return (
            <Fragment>
                <button onClick={this.getGif}>Get gifs</button>
                <div id="capture">
                    <AceEditor
                        mode="java"
                        theme="monokai"
                        value={this.state.code}
                        onChange={this.updateCode}
                        name="UNIQUE_ID_OF_DIV"
                        fontSize={30}
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
                        <img src={imageSrc} />
                        <a href={imageSrc} download="snippet.gif">Download</a>
                    </Fragment>
                )}
            </Fragment>
		);
	}
}
