import React, { FC, useEffect, useState } from "react";

export const CurrentTime: FC = () => {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timerId = setInterval(() => {
			setDate(new Date());
		}, 1000);

		return () => clearInterval(timerId);
	}, []);

	return <div className="header__clock">{date.toLocaleTimeString()}</div>;
};
