class Calc extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            result: 0,
            calculations: '0',
            expand: false,
            isPlaying: false
        }
        this.setResults = this.setResults.bind(this),
        this.handleClick = this.handleClick.bind(this)
    }
    setResults() {
        const res = String(new Function('return ' + this.state.calculations.replace('X','*'))()).slice(0,15)
        this.setState({
            result: res,
            calculations: res
        })
    }

    handleClick(key) {
        key = String(key);
        const lastTwoChars = '  '.concat(this.state.calculations).slice(-2);
        let newCalculations = this.state.calculations;
        let newResult = this.state.result;
        console.log(lastTwoChars)
        if (/\d/.test(key)) {
            if (!/\d/.test(lastTwoChars[0]) && lastTwoChars[1] == '0') {
              newCalculations = newCalculations.slice(0, -1) + key;
              newResult = key
            } else {
              newCalculations += key;
              newResult += key
            }
        } else if (/\-/.test(key)) {
            if (/\-/.test(lastTwoChars[1])) {
                newCalculations = newCalculations.slice(0, -1) + key;
            } else {
                newCalculations += key;
            }
            newResult = key
        } else if (/[X\/+]/.test(key)) {
            if (/\d/.test(lastTwoChars[1])) {
                newCalculations += key;
            } else if (/[X\/+]/.test(lastTwoChars[0]) && lastTwoChars[1] == '-'){
                newCalculations = newCalculations.slice(0, -2) + key;
            } else {
                newCalculations = newCalculations.slice(0, -1) + key;
            }
            newResult = key
        } else if (key === '.') {
            const lastNumber = this.state.calculations.match(/\d+(\.\d*)?$/);
            if (!lastNumber || !/\./.test(lastNumber[0])) {
              newCalculations += key;
              newResult += key
            }
        }
        if (String(newResult).length>15) {
            newResult = newResult.substring(1)
        }
        this.setState({
            calculations: newCalculations,
            result: newResult
        })
    }

    render() {
        return (
            <div>
                <div id="white-flash"></div>
                <button
                    id="expand"
                    className="btn btn-warning bigger"
                    onClick={() => {
                        const whiteFlash = document.getElementById("white-flash");
                        whiteFlash.style.animation = "none"; // Reset the animation
                        setTimeout(() => {
                            whiteFlash.style.animation = "whiteFlash .3s linear";
                        }, 0);
                        this.setState({ expand: !this.state.expand });
                        const calculator = document.getElementById('calculator');
                        const optimus = document.getElementById('optimus');
                        
                        if (!this.state.expand) {
                            if (!this.state.isPlaying) {
                                const jingle = new Audio('./more_than_meets_the_eye.mp3');
                                jingle.play();
                                this.setState({ isPlaying: true });
                                jingle.addEventListener('ended', () => {
                                    this.setState({ isPlaying: false });
                                    });
                                };
                            calculator.classList.add('spin-calc');
                            calculator.classList.remove('spin-calc-reverse');
                            optimus.classList.add('spin-bot');
                            optimus.classList.remove('spin-bot-reverse');
                        } else {
                            calculator.classList.add('spin-calc-reverse');
                            calculator.classList.remove('spin-calc');
                            optimus.classList.add('spin-bot-reverse');
                            optimus.classList.remove('spin-bot');
                        }
                        }
                    }
                    >
                    <i className={this.state.expand ? 'fa fa-compress-alt' : 'fa fa-expand-alt'}></i>
                    </button>
                <div id="calculator">
                    <div id="screen">
                        <div className="formula-screen">{this.state.calculations}</div>
                        <div className="output-screen" id="display">{this.state.result}</div>
                    </div>
                    <div id="buttons-grid">
                        <button id="clear" className="btn btn-danger bigger" onClick={() => this.setState({calculations: '0', result: '0'})}>AC</button>
                        <button className="btn btn-warning bigger"></button>
                        <button id="subtract" className="btn btn-secondary bigger" onClick={() => this.handleClick('-')}>-</button>

                        <button id="seven" className="btn btn-light bigger" onClick={() => this.handleClick('7')}>7</button>
                        <button id="eight" className="btn btn-light bigger" onClick={() => this.handleClick('8')}>8</button>
                        <button id="nine" className="btn btn-light bigger" onClick={() => this.handleClick('9')}>9</button>
                        <button id="add" className="btn btn-secondary bigger" onClick={() => this.handleClick('+')}>+</button>
                        
                        <button id="four" className="btn btn-light bigger" onClick={() => this.handleClick('4')}>4</button>
                        <button id="five" className="btn btn-light bigger" onClick={() => this.handleClick('5')}>5</button>
                        <button id="six" className="btn btn-light bigger" onClick={() => this.handleClick('6')}>6</button>
                        <button id="multiply" className="btn btn-secondary" onClick={() => this.handleClick('X')}>X</button>

                        <button id="one" className="btn btn-light bigger" onClick={() => this.handleClick('1')}>1</button>
                        <button id="two" className="btn btn-light bigger" onClick={() => this.handleClick('2')}>2</button>
                        <button id="three" className="btn btn-light bigger" onClick={() => this.handleClick('3')}>3</button>
                        <button id="divide" className="btn btn-secondary" onClick={() => this.handleClick('/')}>/</button>

                        <button id="zero" className="btn btn-light bigger" onClick={() => this.handleClick('0')}>0</button>
                        <button id="decimal" className="btn btn-light bigger" onClick={() => this.handleClick('.')}>.</button>
                        <button id="equals" className="btn btn-primary bigger" onClick={() => this.setResults()}>=</button>
                    </div>
                </div>
                <div id="optimus">
                    <img src="./optimus.png" />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Calc/>, document.getElementById("root"))
