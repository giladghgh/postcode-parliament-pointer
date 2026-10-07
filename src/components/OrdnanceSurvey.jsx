export default function OrdnanceSurvey({ data,fetcher }) {
	return (
		<fieldset>
			<legend>Ordnance Survey matches</legend>
			{!data.length
				? <p>&nbsp;</p>
				: <div className="form-input-radio-group">
					{data.map((place) => (
						<label key={place.GAZETTEER_ENTRY.ID}>
							<input
								type="radio"
								name="OS"
								className="form-input-radio"
								onChange={(e) => fetcher(e.target.value)}
								value={place.GAZETTEER_ENTRY.NAME1}
							/>
							<strong>{place.GAZETTEER_ENTRY.NAME1}</strong>
							<pre className="inline">&#09;</pre>
							{" — "}
							{/* DISTRICT_BOROUGH if exists, else COUNTY_UNITARY if exists, else blank. */}
							{place.GAZETTEER_ENTRY.DISTRICT_BOROUGH
								? place.GAZETTEER_ENTRY.DISTRICT_BOROUGH + ", "
								: place.GAZETTEER_ENTRY.COUNTY_UNITARY
									? place.GAZETTEER_ENTRY.COUNTY_UNITARY + ", "
									: ""
							}
							{place.GAZETTEER_ENTRY.COUNTRY}
						</label>
					))}
				</div>
			}
		</fieldset>
	);
}