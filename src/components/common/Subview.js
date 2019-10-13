import React from 'react';
import useGlobal from '../../store';
import enums from '../../utils/enumerables';

const Subview = () => {
	const [globalState, globalActions] = useGlobal();
	const { subview } = globalState.common;
	const { setSubview } = globalActions.common;
	// todo subview selected class add
	return (
		<div className="Subview">
			{enums.subviews.map((subviewName, index) => (
				<p
					key={index}
					onClick={e => setSubview(index)}
					className={`${subview === index ? 'zvyraznena' : ''}`}
				>
					{subviewName}
				</p>
			))}
		</div>
	);
};

export default Subview;
