const React = {
	createElement
};

const ReactDOM = {
	render
};

function createElement(tag, attrs, ...children) {
	return {
		tag,
		attrs,
		children
	};
}

function render(element, root) {
	let node;
	if (typeof element === 'string') {
		node = document.createTextNode(element);
	}
	if (typeof element === 'object') {
		node = document.createElement(element.tag);
		setAttrs(node, element.attrs);
		element.children.forEach(el => {
			render(el, node);
		});
	}
	root.appendChild(node);
}

function setAttrs(node, attrs) {
	Object.keys(attrs).forEach(key => {
		if (key === 'style') {
			Object.assign(node.style, attrs[key]);
		} else if (key.startsWith('on')) {
			node[key.toLowerCase()] = attrs[key];
		} else {
			node[key] = attrs[key];
		}
	});
}

const onBtn = () => {
	console.log('click');
};

const element = React.createElement(
	'div',
	{ class: 'container' },
	React.createElement(
		'span',
		{ style: { color: 'red', 'font-size': '34px' }, className: 'span1' },
		'span1'
	),
	React.createElement(
		'span',
		{ className: 'span2', onClick: onBtn },
		'span2'
	)
);

ReactDOM.render(element, document.body);