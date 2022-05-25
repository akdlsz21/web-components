class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipContainer;
		this._tooltipText = 'dummy text';
	}

	connectedCallback() {
		// checks for attribute in html
		if (this.hasAttribute('text'))
			this._tooltipText = this.getAttribute('text');

		const tooltipIcon = document.createElement('span');
		tooltipIcon.textContent = ' (?) ';

		tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
		tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

		this.appendChild(tooltipIcon);
	}

	_showTooltip() {
		// convention for calling inside the class.
		// private method

		this._tooltipContainer = document.createElement('div');
		this._tooltipContainer.textContent = this._tooltipText;
		this.appendChild(this._tooltipContainer);
	}

	_hideTooltip() {
		this.removeChild(this._tooltipContainer);
	}
}

customElements.define('ak-tooltip', Tooltip);
