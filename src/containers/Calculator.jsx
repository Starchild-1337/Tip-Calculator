import React, { useEffect, useState } from 'react';
import TipButton from '../components/TipButton';

const tipValues = [5, 10, 15, 25, 50]

const Calculator = () => {
	const [bill, setBill] = useState('')
	const [people, setPeople] = useState('')
	const [custom, setCustom] = useState('')
	const [tipValue, setTipValue] = useState(0)
	const [tipEach, setTipEach] = useState(0)
	const [totalEach, setTotalEach] = useState(0)

	useEffect(() => {
		function calculate(tip) {
			let tipAmount = bill * (tip / 100)
			let total = bill + tipAmount
			
			setTotalEach(total / people)
			setTipEach(tipAmount / people)
		}

		const handleCalculatedResult = () => {
			if(bill && people && tipValue) {
				calculate(tipValue)
			}

			if(bill && people && custom) {
				calculate(custom)
			}
		}

		handleCalculatedResult()
	}, [bill, people, tipValue, custom])


	const handleInputs = (e) => {
		let {name, value} = e.target
		if(name === 'bill') setBill(+value)

		if(name === 'people') setPeople(+value)

		if(name === 'custom') {
			setTipValue(0)
			setCustom(+value)
		}
	}

	const handleReset = () => {
		setBill('')
		setPeople('')
		setCustom('')
		setTipValue(0)
		setTipEach(0)
		setTotalEach(0)
	}


	return (
			<main>

				<div className='calculator'>
					<label htmlFor="bill" >Bill</label>
					<input className={bill === 0 ? 'error' : ''} type="number" name="bill" id="bill" value={bill} onChange={handleInputs} placeholder='0' max={10000}/>
					<div className='tips'>
						<span>Select Tip %</span>
						<div className="tip-btns">
							{tipValues.map(tipVal => (
								<TipButton key={tipVal} value={tipVal} tipValue={tipValue} setTipValue={setTipValue} setCustom={setCustom} />
							))}
							<input type='number' name="custom" placeholder='Custom' value={custom} onChange={handleInputs} min={0} max={1000}></input>
						</div>
					</div>
					<label>Number of people</label>
					<input type="number" name="people" id="people" value={people} onChange={handleInputs} placeholder='0' min={0} max={1000}/>
				</div>

				<div className='result'>
					<div>
					<div className="amount">
						<div>
							<p>Tip Amount</p>
							<span>/ person</span>
						</div>
						<span className='amount-span'>${tipEach.toFixed(2)}</span>
					</div>
					<div className="amount">
						<div>
							<p>Total</p>
							<span>/ person</span>
						</div>
						<span className='amount-span'>${totalEach.toFixed(2)}</span>	
					</div>
					</div>
					<button className='reset' onClick={handleReset}>reset</button>
				</div>

			</main>
	);
};

export default Calculator;