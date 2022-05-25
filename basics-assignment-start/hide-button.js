class hideButton extends HTMLElement {
	constructor() {
		super();
		this._infoTextContainer;
		this._infoText = 'More Info! dummy';
		this._isHide = true;
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
         <style>

				display: flex;
				flex-directin: column;

			</style>

			<button type="button" class='button'>Show</button>
			<slot> do i need you</slot>
      `;
	}

	connectedCallback() {
		const buttonElem = this.shadowRoot.querySelector('button');
		this._hasHiddenAttribute = this.hasAttribute('hide');

		console.log(`has attribute hidden? ${this._hasHiddenAttribute}`);
		buttonElem.addEventListener('click', this._handleClick.bind(this));

		this.shadowRoot.appendChild(buttonElem);
		if (!this._hasHiddenAttribute) {
			const event = new Event('click');
			buttonElem.dispatchEvent(event);
		}
	}

	_handleClick(event) {
		this._isHide = !this._isHide;

		if (!this._isHide) {
			event.target.textContent = 'Hide';
			this._infoTextContainer = document.createElement('p');
			this._infoTextContainer.textContent =
				this.getAttribute('text') || this._infoText;
			this.shadowRoot.appendChild(this._infoTextContainer);
		} else {
			event.target.textContent = 'Show';
			this.shadowRoot.removeChild(this._infoTextContainer);
		}
	}
}

customElements.define('ak-hide-button', hideButton);
