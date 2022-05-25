class Tooltip extends HTMLElement {
	constructor() {
		super();
		this._tooltipContainer;
		this._tooltipText = 'dummy text';
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
			<style>
				div{
					border: 1px solid orange;
					background-color: black;
					position: absolute;
					color: white;
					z-index: 10;
				}
			</style>
			<span> [ ? ] </span>
			<slot> Default slot text </slot>
		`;
	}

	connectedCallback() {
		// checks for attribute in html
		if (this.hasAttribute('text'))
			this._tooltipText = this.getAttribute('text');

		const tooltipIcon = this.shadowRoot.querySelector('span');

		tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
		tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

		this.style.position = 'relative';
		this.shadowRoot.appendChild(tooltipIcon);
	}

	_showTooltip() {
		// convention for calling inside the class.
		// private method

		this._tooltipContainer = document.createElement('div');
		this._tooltipContainer.textContent = this._tooltipText;
		this.shadowRoot.appendChild(this._tooltipContainer);
	}

	_hideTooltip() {
		this.shadowRoot.removeChild(this._tooltipContainer);
	}
}

customElements.define('ak-tooltip', Tooltip);
