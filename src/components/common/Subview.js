import React from 'react';
import useGlobal from '../../store';
import enums from '../../utils/enumerables';

const Subview = () => {
	const [globalState, globalActions] = useGlobal();
	const { subview } = globalState;
	const { setSubview } = globalActions.common;

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
