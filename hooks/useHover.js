import { useState, useRef, useEffect } from 'react';

const useHover = () => {
	const ref = useRef();
	const [hovered, setHovered] = useState(false);

	const enter = () => setHovered(true);
	const leave = () => setHovered(false); 

	useEffect(() => {
		if (ref.current) {
			ref.current.addEventListener('mouseenter', enter);
			ref.current.addEventListener('mouseleave', leave);
			
			return () => {
				if (ref.current) {
					ref.current.removeEventListener('mouseenter', enter);
					ref.current.removeEventListener('mouseleave', leave);
				}
			}
		}
	}, []);

	return [ref, hovered];
}

export default useHover;