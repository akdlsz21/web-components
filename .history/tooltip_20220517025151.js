class Tooltip extends HTMLElement {
	constructor() {
		super();
		const tooltipIcon = document.createElement('span');
		tooltipIcon.textContent = ' (?) ';
	}
}

customElements.define('ak-tooltip', Tooltip);
