export default function TheyWorkForYou({ data }) {
	return (
		<fieldset>
			<legend>TheyWorkForYou match</legend>
			{!data.member_id
				? <p>&nbsp;</p>
				: <ul>
					<li key="full-name">
						<strong>Full Name</strong>
						<pre className="inline">&#09;</pre>
						{" — "}
						{data.full_name}
					</li>
					<li key="constituency">
						<strong>Constituency</strong>
						<pre className="inline">&#09;</pre>
						{" — "}
						{data.constituency}
					</li>
					<li key="party">
						<strong>Party</strong>
						<pre className="inline">&#09;&#09;</pre>
						{" — "}
						{data.party}
					</li>
					<li key="entered">
						<strong>Entered House</strong>
						<pre className="inline">&#09;</pre>
						{" — "}
						{data.entered_house}
						{" by "}
						{data.entered_reason.replace("_"," ")}
					</li>
				</ul>
			}
		</fieldset>
	);
}