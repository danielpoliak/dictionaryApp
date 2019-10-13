import React from 'react';
import useGlobal from '../../store';
import enums from '../../utils/enumerables';

const Subview = () => {
	const [globalState, globalActions] = useGlobal();

	return (
		<div className="Subview">
			{enums.subviews.map((subview, index) => (
				<p key={index} onClick={e => globalActions.common.setSubview(index)}>
					{subview}
				</p>
			))}
		</div>
	);
};

export default Subview;
