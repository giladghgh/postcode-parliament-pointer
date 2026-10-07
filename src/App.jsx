import { useState , useEffect } from "react";

import OrdnanceSurvey from "./components/OrdnanceSurvey.jsx";
import TheyWorkForYou from "./components/TheyWorkForYou.jsx";



export default function App() {
	const [query,setQuery] = useState("");
	const [maxMatches,setMaxMatches] = useState(5);
	
	const [sliderActive,setSliderActive] = useState(false);
	
	const [replies,setReplies] = useState({
		OS:[],
		TWFY:[],
	});
	
	
	async function execute( event ) {
		event.preventDefault();
		
		await fetchOS();
	}
	
	
	async function fetchOS() {
		const url = new URL("https://api.os.uk/search/names/v1/find");
		
		url.searchParams.set("query",query);
		url.searchParams.set("maxresults",maxMatches);
		url.searchParams.set("fq","LOCAL_TYPE:Postcode")                    // only postcodes for the Postcode Profiler
		url.searchParams.set("key","3cJxB7FmzAAUCyu6GXNw34y7qDuQWduJ")
		
		await fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((dat) => {
				console.log(dat);
				setReplies(r => (
					{...r , OS:(dat.results || [])}
				));
			})
			.catch((err) => {
				throw new Error(err);
			})
	}
	
	
	async function fetchTWFY( postcode ) {
		const url = new URL("https://www.theyworkforyou.com/api/getMP");
		
		url.searchParams.set("postcode",postcode);
		url.searchParams.set("output","js");
		url.searchParams.set("key","E6VGFYArkyDFAkxMr4GikoFY");
		
		await fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((dat) => {
				console.log(dat);
				setReplies(r => (
					{...r , TWFY:(dat || [])}
				));
			})
			.catch((err) => {
				throw new Error(err);
			})
	}
	
	
	function changeMaxMatches(event) {
		setMaxMatches(event.target.value);
	}
	
	
	function changeCursor(event) {
		setSliderActive(!sliderActive);
		document.documentElement.style.setProperty(
			"--cursor",
			sliderActive
				? "grab"
				: "grabbing"
		);
	}
	
	
	function clearAll() {
		setReplies({
			OS:[],
			TWFY:[],
		});
	}
	
	
	return (
		<>
			<form className="form" onSubmit={execute}>
				<div className="form-field">
					<input
						className="form-input-query"
						onChange={(e) => setQuery(e.target.value)}
						placeholder="SW1A 2AA"
						required
					/>
					
					<button type="submit">
						Search
					</button>
					<button type="reset" onClick={clearAll}>
						Clear
					</button>
				</div>
				
				<div className="form-field">
					<label className="form-input-label">Max OS matches: {maxMatches}</label>
					<input
						className="form-input-num"
						type="range"
						min="1"
						max="9"
						step="1"
						value={maxMatches}
						onChange={changeMaxMatches}
						onMouseDown={changeCursor}
						onMouseUp={changeCursor}
						required
					/>
				</div>
			</form>
			
			<OrdnanceSurvey data={replies.OS} fetcher={fetchTWFY} />
			
			<TheyWorkForYou data={replies.TWFY} />
		</>
	);
}